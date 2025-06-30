import {createContext, useState, useEffect} from "react";
import { jwtDecode } from 'jwt-decode';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged} from "firebase/auth";
import { auth } from '@/utils/api/auth/firebase';
import axios from "axios";
import swal from 'sweetalert2';
import config from "@/config";

const AuthContext = createContext();
const baseUrl = config.apiBaseUrl;

export const AuthProvider = ({ children }) => {
    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem("authTokens")
            ? JSON.parse(localStorage.getItem("authTokens"))
            : null
    );
    
    const [refreshToken, setRefreshToken] = useState(() =>
        localStorage.getItem("refreshToken")
            ? JSON.parse(localStorage.getItem("refreshToken"))
            : null
    );
    const [user, setUser] = useState(() => {
        try {
            const storedUserString = localStorage.getItem("user");
            if (storedUserString) {
                return JSON.parse(storedUserString); // Prioritaskan user lengkap dari localStorage
            }
            
            const storedAuthTokensString = localStorage.getItem("authTokens");
            if (storedAuthTokensString) {
                return jwtDecode(JSON.parse(storedAuthTokensString));
            }
            return null;
        } catch (error) {
            console.error("Failed to parse user from localStorage or decode token:", error);
            return null;
        }
    });

    const [loading, setLoading] = useState(true);
    const [googleAccount, setGoogleAccount] = useState(() => {
        const savedAccount = sessionStorage.getItem("googleAccount");
        return savedAccount ? JSON.parse(savedAccount) : { email: null, name: null };
    });

    const updateProfile = (updatedFields) => {
        setUser(prevUser => {
            if (!prevUser) return null; 
            const newUser = { ...prevUser, ...updatedFields }; 
            return newUser;
        });
    };

    const loginUser = async (email, password, navigate) => {
        try{
            const response = await axios.post(`${baseUrl}/login`, {
                email, password
            });
    
            if(response.status === 200){
                const access_token = response.data.access_token;
                const refresh_token = response.data.refresh_token;
                const decodedUserFromJWT = jwtDecode(access_token); 
                const fullUserData = { 
                    ...decodedUserFromJWT, 
                };
                setAuthTokens(access_token);
                setRefreshToken(refresh_token);
                setUser(decodedUserFromJWT); // <--- Set user dengan objek yang sudah di-decode/digabungkan

                // localStorage.setItem("user", JSON.stringify(fullUserData)); // Ini akan ditangani oleh useEffect di bawah
                swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                    showCloseButton: true,
                });
                navigate("/");
            } else {    
                console.log(response.status);
                console.log("there was a server issue");
                swal.fire({
                    title:"Username or password does not exists",
                    icon: "error",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
            }
        }catch (error) {
            console.error("Login error:", error);
            if (error.response && error.response.status === 401) {
              swal.fire({
                title: "Email or Password wrong",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
                });
            } else {
                swal.fire({
                    title: "An Error Occurred",
                    text: "Please try again later.",
                    icon: "error",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
        } finally {
            setLoading(false); 
        }
    }

    const GoogleLogin =  async (navigate) => {
        try{
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const response = await axios.post(`${baseUrl}/is_registered`, {
                email: result.user.email
            })

            if(response.status === 200){
                const responseGoogle = await axios.post(`${baseUrl}/google_login`, {
                    email: result.user.email,
                });
                const access_token = responseGoogle.data.access_token;
                const refresh_token = responseGoogle.data.refresh_token;
                const decodedUserFromJWT = jwtDecode(access_token);
                const fullUserData = { 
                    ...decodedUserFromJWT, 
                };
                setUser(fullUserData);

                setAuthTokens(access_token);
                setRefreshToken(refresh_token);

                swal.fire({
                    title: "Login Successful",
                    icon: "success",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                    showCloseButton: true,
                })
                navigate("/")
            } else {
                const { email, displayName: name } = result.user;
                const accountInfo = { email, name };
                setGoogleAccount(accountInfo);
                sessionStorage.setItem("googleAccount", JSON.stringify(accountInfo));
                navigate("/auth/registergoogle")
            }
        }catch(error){
            console.error("Google Login error:", error);
            swal.fire({
                title: "An Error Occured Please Check Your Google Account " ,
                text: error.message,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        } finally {
            setLoading(false); // Pastikan loading false setelah Google login
        }
    }

    const logoutUser = async (navigate) => {
        try{
            const refreshToken = localStorage.getItem('refreshToken');
            const parsedRefreshToken = JSON.parse(refreshToken);

            if (parsedRefreshToken){
                const response = await axios.post(`${baseUrl}/logout`, {
                    refresh_token: parsedRefreshToken,
                });

                if(response.status !== 200){
                    console.log(response.status);
                    console.log("there was a server issue");
                }
            }

        }catch(error){
            console.log(error);
        }finally{
            setAuthTokens(null);
            setRefreshToken(null);
            setUser(null); 
            localStorage.removeItem("authTokens");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user"); 
            sessionStorage.removeItem("googleAccount"); 
            if (localStorage.getItem('isAdmin')) {
                localStorage.removeItem('isAdmin');
            }

            swal.fire({
                title: "You have been logged out...",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
                showCloseButton: true,
            });
            navigate("/auth/login");
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user]);

    useEffect(() => {
        if (authTokens) {
            localStorage.setItem("authTokens", JSON.stringify(authTokens));
        } else {
            localStorage.removeItem("authTokens");
        }
    }, [authTokens]);

    useEffect(() => {
        if (refreshToken) {
            localStorage.setItem("refreshToken", JSON.stringify(refreshToken));
        } else {
            localStorage.removeItem("refreshToken");
        }
    }, [refreshToken]);
    useEffect(() => {
        setLoading(false); 
    }, []); // Array kosong berarti hanya berjalan sekali saat mount

    const contextData = {
        user, 
        authTokens,
        googleAccount,
        updateProfile, 
        setUser,
        setAuthTokens,
        loginUser,
        logoutUser,
        GoogleLogin
    }

    return (
        <AuthContext.Provider value={contextData}>
            {loading ? null : children}
        </AuthContext.Provider>
    )

}

export const registerUser = async (name, email, password, verif_password, navigate) => {
    try {
        const response = await axios.post(`${baseUrl}/register`, {
            name, email, password, verif_password
        });

        if (response.status === 201) {
            if (sessionStorage.getItem("googleAccount")) {
                sessionStorage.removeItem("googleAccount");
            }
            navigate("/auth/login");
            swal.fire({
                title: "Registration Successful, Login Now",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    } catch (error) {
        const message = error.response.data.message;

        if (!name || !email || !password || !verif_password) {
            swal.fire({
            title: "Please fill all the fields",
            icon: "warning",
            toast: true,
            timer: 6000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
            });
        }else if (message === 'Email already exists') {
            swal.fire({
                title: "Email Already Taken",
                text: "Please use a different email address.",
                icon: "warning",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        } else {
            swal.fire({
                title: "An Error Occurred",
                text: "There was a server issue. Please try again later.",
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    }
}

export default AuthContext;
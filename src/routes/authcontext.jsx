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

    const [user, setUser] = useState(() => 
        localStorage.getItem("authTokens")
            ? jwtDecode(localStorage.getItem("authTokens"))
            : null
    );

    const [loading, setLoading] = useState(true);
    const [googleAccount, setGoogleAccount] = useState(() => {
        const savedAccount = sessionStorage.getItem("googleAccount");
        return savedAccount ? JSON.parse(savedAccount) : { email: null, name: null };
    });

    const loginUser = async (email, password, navigate) => {
        try{
            const response = await axios.post(`${baseUrl}/login`, {
                email, password
            });
    
            if(response.status === 200){
                setAuthTokens(response.data.access_token)
                setRefreshToken(response.data.refresh_token)
                setUser(jwtDecode(response.data.access_token))
                localStorage.setItem("authTokens", JSON.stringify(response.data.access_token))
                localStorage.setItem("refreshToken", JSON.stringify(response.data.refresh_token))
                navigate("/")
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
    
            } else {    
                console.log(response.status);
                console.log("there was a server issue");
                swal.fire({
                    title:"Username or passowrd does not exists",
                    icon: "error",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
            }
        }catch (error) {
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
            }
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
                setAuthTokens(responseGoogle.data.access_token)
                setRefreshToken(responseGoogle.data.refresh_token)
                setUser(jwtDecode(responseGoogle.data.access_token))
                localStorage.setItem("authTokens", JSON.stringify(responseGoogle.data.access_token))
                localStorage.setItem("refreshToken", JSON.stringify(responseGoogle.data.refresh_token))
                navigate("/")
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
            } else {
                const { email, displayName: name } = result.user;
                const accountInfo = { email, name };
                setGoogleAccount(accountInfo);
                sessionStorage.setItem("googleAccount", JSON.stringify(accountInfo));
                navigate("/auth/registergoogle")
            }
        }catch(error){
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
        }
        
    }

    const logoutUser = async (navigate) => {
        const refreshToken = localStorage.getItem('refreshToken');
        const parsedRefreshToken = JSON.parse(refreshToken);

        console.log(parsedRefreshToken)

        const response = await axios.post(`${baseUrl}/logout`, {
            refresh_token: parsedRefreshToken,
        });
    
        if(response.status === 200){
            setAuthTokens(null)
            setRefreshToken(null)
            setUser(null)
            localStorage.removeItem("authTokens")
            localStorage.removeItem("refreshToken")
            if (localStorage.getItem('isAdmin')) {
                localStorage.removeItem('isAdmin');
            }
            navigate("/auth/login")
            swal.fire({
                title: "You have been logged out...",
                icon: "success",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
                showCloseButton: true,
            })
        } else {
            console.log(response.status);
            console.log("there was a server issue");
            swal.fire({
                title: "An Error Occured " + response.status,
                icon: "error",
                toast: true,
                timer: 6000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const contextData = {
        user, 
        authTokens,
        googleAccount,
        setUser,
        setAuthTokens,
        loginUser,
        logoutUser,
        GoogleLogin
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens))
        }
        setLoading(false)
    }, [authTokens, loading])

    useEffect(() => {
        if (googleAccount) {
            console.log('Updated googleAccount:', googleAccount);
        }
    }, [googleAccount]);

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
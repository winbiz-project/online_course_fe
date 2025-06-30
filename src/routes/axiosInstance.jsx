import axios from 'axios';
import swal from 'sweetalert2';
import config from "@/config";

const baseURL = config.apiBaseUrl;

const axiosInstance = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
    }
});


axiosInstance.interceptors.request.use(async req => {
    const accessToken = localStorage.getItem('authTokens');
    if (accessToken) {
        req.headers.Authorization = `Bearer ${accessToken}`;
    }
    return req;
}, error => {
    return Promise.reject(error);
});


axiosInstance.interceptors.response.use(
    response => response,
    async error => {
        const originalRequest = error.config;

        // Jika error 401 dan ini bukan permintaan refresh itu sendiri
        // Pastikan error.response ada sebelum mengakses status
        if (error.response && error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem('refreshToken'); // Ambil langsung string JWT

            if (refreshToken) {
                try {
                    // Panggil endpoint refresh token Anda.
                    // Berdasarkan diskusi terakhir, URL-nya adalah langsung di root:
                    const refreshResponse = await axios.post(`${baseURL}/token/refresh/`, {
                        refresh: refreshToken,
                    });

                    const newAccessToken = refreshResponse.data.access;
                    const newRefreshToken = refreshResponse.data.refresh;

                    localStorage.setItem('authTokens', newAccessToken);
                    localStorage.setItem('refreshToken', newRefreshToken);

                    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

                    // Ulangi permintaan asli dengan token baru
                    originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
                    return axiosInstance(originalRequest);

                } catch (refreshError) {
                    console.error('Refresh token failed:', refreshError);
                    // Refresh token gagal, lakukan force logout
                    localStorage.removeItem('authTokens');
                    localStorage.removeItem('refreshToken');
                    localStorage.removeItem('isAdmin');

                    swal.fire({ 
                        title: "Session Expired",
                        text: "Please login again.",
                        icon: "warning",
                        toast: true,
                        timer: 6000,
                        position: 'top-right',
                        timerProgressBar: true,
                        showConfirmButton: false,
                    });
                    window.location.href = '/auth/login'; // Redirect ke halaman login
                    return Promise.reject(refreshError);
                }
            } else {
                // Tidak ada refresh token, langsung force logout
                localStorage.removeItem('authTokens');
                localStorage.removeItem('refreshToken');
                localStorage.removeItem('isAdmin');
                swal.fire({
                    title: "Session Expired",
                    text: "Please login again.",
                    icon: "warning",
                    toast: true,
                    timer: 6000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
                window.location.href = '/auth/login';
                return Promise.reject(error);
            }
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
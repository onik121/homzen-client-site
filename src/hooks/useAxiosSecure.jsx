import axios from "axios";
import { useNavigate } from 'react-router-dom';
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: 'https://assignment-12-server-gray-one.vercel.app',
})

const useAxiosSecure = () => {

    const { logOut } = useAuth();
    const navigate = useNavigate();

    axiosSecure.interceptors.request.use(res => {
        const token = localStorage.getItem('access-token')
        res.headers.authorization = `Bearer ${token}`;
        return res;
    },
        (error) => {
            return Promise.reject(error)
        }
    )

    axiosSecure.interceptors.response.use(res => {
        return res;
    }, async (error) => {
        if (error.response.status === 401 || error.response.status === 403) {
            await logOut();
            navigate('/login');
        }
        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;
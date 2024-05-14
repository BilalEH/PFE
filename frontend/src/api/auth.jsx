import { createContext,useContext,useState } from "react";
import { axiosInstance } from "./axios";
import { toast } from "react-toastify";
import { StyleToast } from "../layouts/Layout";

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [User, setUser] = useState(null);
    const saveUser = (User) =>{
        localStorage.setItem('User',JSON.stringify(User));
        setUser(User);
    }
    const importUser = () =>{
        const UserString = localStorage.getItem('User');
        const userUser = JSON.parse(UserString);
        return userUser;
    }



    const getUser = async () => {
        try{
            const {data} = await axiosInstance.get("/api/user");
            saveUser(data);
            return true;
        }catch(error){
            return false;
        }
    };

    const login = async (loginData) => {
        await axiosInstance.get("/sanctum/csrf-cookie");
        try {
            await axiosInstance.post("/login", loginData);
            await getUser();
            toast.success("Login successful", StyleToast);
            return true;
        }catch (error) {
            if(error.response.status === 401){
                toast.error("not authorized", StyleToast);
            }
            if(error.response.status === 404){
                toast.error("you all ready authorized", StyleToast);
            }
            return false;
        }
    };

    const logout = async () => {
        if(importUser()){
            await axiosInstance.get("/sanctum/csrf-cookie");
            await axiosInstance.post("/logout");
            setUser(null);
            localStorage.clear();
            toast.success("Logout successful", StyleToast);
            return true;
        }else{
            toast.error("you are not logged in", StyleToast);
            return false;
        }
    }

    const Register = async (registerData) => {
        await axiosInstance.get("/sanctum/csrf-cookie");
        try {
            await axiosInstance.post("/register", registerData);
            await getUser();
            toast.success("Registration successful", StyleToast);
            return true;
        } catch (error) {
            if (error.response.status === 422) {
                toast.error(error.response.data.message, StyleToast);
            }
            return false;
        }
    };

    return (
        <AuthContext.Provider value={{getUser,login,Register,logout,importUser}}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuthContext() {
    return useContext(AuthContext);
}
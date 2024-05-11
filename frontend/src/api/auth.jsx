import { createContext,useContext,useState } from "react";
import { axiosInstance } from "./axios";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
    const [User, setUser] = useState(null);
    // const navigate = useNavigate();

    const StyleToast = {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
    };
    const getUser = async () => {
        const user = await axiosInstance.get("/api/user");
        console.log(user);
        setUser(user);
    };

    const login = async (loginData) => {
        await axiosInstance.get("/sanctum/csrf-cookie");
        try {
            await axiosInstance.post("/login", loginData);
            // await getUser();
            toast.success("Login successful", StyleToast);
        }catch (error) {
            if (error.response.status === 422) {
                toast.error("Invalid credentials", StyleToast);
            }
            if(error.response.status === 401){
                toast.error("not authorized", StyleToast);
            }
            if(error.response.status === 404){
                toast.error("you all ready authorized", StyleToast);
            }

        }
    };

    const Register = async (registerData) => {
        try {
            await axiosInstance.post("/register", registerData);
            getUser();
            // navigate("/users");
            toast.success("Registration successful", StyleToast);
        } catch (error) {
            if (error.response.status === 422) {
                toast.error("Invalid credentials", StyleToast);
            }
        }
    };

    return (
        <AuthContext.Provider value={{User,getUser,login,Register}}>
            {children}
        </AuthContext.Provider>
    );
};

export default function useAuthContext() {
    return useContext(AuthContext);
}
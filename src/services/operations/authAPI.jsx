import {toast} from 'react-hot-toast'
import { setLoading,setToken } from '../../slices/authSlice'
import { resetCart } from '../../slices/cartSlice'
import { setUser } from '../../slices/profileSlice'
import { apiConnector } from '../apiConnector'
import { endpoints } from '../apis'
import { useDispatch } from 'react-redux'


const{SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = endpoints;

export function sentOtp(email,navigate){

    return async (dispatch) => {
        dispatch(setLoading(true));
        try{
            // console.log(email);
            const response=await apiConnector("POST",SENDOTP_API,{email});

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("OTP sent successfully");
            // setEmailSent(true);
            navigate("/verify-email");
        dispatch(setLoading(false));

        } catch(error){
            console.log("Error",error);
            toast.error("failed to sent otp");
        }
    }
};

export function signUp(accountType,firstName,lastName,email,password,confirmPassword,otp,navigate){
    return async(dispatch) =>{
        try{
            // console.log("cc:::",confirmPassword);
            const response = await apiConnector("POST",SIGNUP_API,{
                accountType,firstName,lastName,email,password,confirmPassword,otp
            });

            if(!response.data.success){
                throw new Error(response.data.message);
            }
            toast.success("Signed Up completed successfully");
            console.log("SIGNUP API RESPONSE:::::",response);
            navigate("/login")
        } catch(err){
            console.log("ERROR---",err);
            toast.error("Failed to signUp try again");
            navigate("/signup");

        }
    }
};

export function logIn(email,password,navigate){

    return async(dispatch)=>{
        try{
            dispatch(setLoading(true));
            const response=await apiConnector("POST",LOGIN_API,{email,password});
            console.log("Login response ",response);
            if(!response.data.success){
                throw new Error(response.data.message);
            };
            dispatch(setToken(response.data.token));
            console.log("token set as ",response.data.token);
            const userImage = response.data?.user?.image
            ? response.data.user.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
            dispatch(setUser({...response.data.user,image:userImage}));
            localStorage.setItem("user", JSON.stringify(response.data.user))
            localStorage.setItem("token", JSON.stringify(response.data.token));
            toast.success("Loged in successfully");
            navigate("/dashboard/my-profile");
            dispatch(setLoading(false));

        } catch(error){
            console.log("ERROR :",error);
            // toast.error(error.response.data.message);
            dispatch(setLoading(false));
            // console.log(error.response.data.message);
        }
        
    }
};

export function logOut(navigate){
    return (dispatch) =>{
        dispatch(setToken(null));
        dispatch(setUser(null));
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        toast.success("Loged out successfully")
        navigate("/")

    }
};

export function resetPassToken(email,navigate){
    return async()=>{
        try{
            console.log(email);
            const response=await apiConnector("POST",RESETPASSTOKEN_API,{email});
            if(!response.data.success){
                throw new Error(response.data.message);
            };
            // console.log(response);
            toast.success("Password reset link sent to email successfully");
            navigate("/reset-password");
        } catch(error){
            console.log("ERROR :",error);
            toast.error(error.response.data.message);
        }
    }
};

export function resetPassword(password,confirmPassword,token,setResetComplet,navigate){
    return async()=>{
        try{
            const response=await apiConnector("POST",RESETPASSWORD_API,{password,confirmPassword,token});
            if(!response.data.success){
                throw new Error(response.data.message);
            };
            setResetComplet(true);
            toast.success("Password Changed successfully");
        } catch(error){
            console.log("ERROR :",error);
            toast.error("failed to change the password");

        }
    }
};

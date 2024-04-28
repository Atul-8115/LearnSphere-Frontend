
import { toast } from 'react-hot-toast'
import { authEndpoints } from "../apis"
import { setLoading, setToken } from '../../slices/authSlice'
import { apiConnector } from '../apiconnector'
import { setUser } from '../../slices/profileSlice'


const {
  SENDOTP_API,
  SIGNUP_API,
  LOGIN_API,
  RESETPASSTOKEN_API,
  RESETPASSWORD_API,
} = authEndpoints

export function sendOtp(email, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("POST", SENDOTP_API, {
                email,
                checkUserPresent: true,
            })
            console.log("SENDOTP API RESPONSE......", response)
            console.log("IN authApi.js: ",response.data.success)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }

            toast.success("OTP sent successfully")
            navigate("/verify-email")
        } catch (error) {
            console.log("SENDOTP API ERROR.......")
            toast.error("Could Not Send OTP")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}

export function login(email, password, navigate) {
    return async (dispatch) => {
       const toastId = toast.loading("Loading...")
       dispatch(setLoading(true))
       try {
           const response = await apiConnector("POST",LOGIN_API,{
              email, 
              password
           })

           console.log("LOGIN API RESPONSE............", response)

           if(!response.data.success) {
             throw new Error(response.data.message)
           }

           toast.success("Login Successful")
           dispatch(setToken(response.data.token))
           const userImage = response.data?.user?.image 
                 ? response.data.user.image
                 : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.user.firstName} ${response.data.user.lastName}`;
           dispatch(setUser({...response.data.user, image: userImage}))
           localStorage.setItem("token",JSON.stringify(response.data.token))
           navigate("/dashboard/my-profile")
       } catch (error) {
            console.log("LOGIN API ERROR............", error)
            toast.error("Login Failed")
       }
       dispatch(setLoading(false))
       toast.dismiss(toastId)
    }
}
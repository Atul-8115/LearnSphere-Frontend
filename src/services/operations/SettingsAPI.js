import { settingsEndpoints } from "../apis"
import { toast } from "react-hot-toast"
import { apiConnector } from "../apiconnector"
import { setUser } from "../../slices/profileSlice"
import { logout } from "./authApi"



const {
    UPDATE_DISPLAY_PICTURE_API,
    UPDATE_PROFILE_API,
    CHANGE_PASSWORD_API,
    DELETE_PROFILE_API
} = settingsEndpoints

export function updateDisplayPicture(refreshToken, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector(
                "PUT",
                UPDATE_DISPLAY_PICTURE_API, 
                formData,
                {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${refreshToken}`
                }
            )
            console.log(
                "UPDATE_DISPLAY_PICTURE_API API RESPONSE............",
                response
            )

            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Display Picture Updated Successfully")
            console.log("Printing what is in data -> ",response.data.data)
            dispatch(setUser(response.data.data))
            localStorage.setItem("user",JSON.stringify(response.data.data))
        } catch (error) {
            console.log("UPDATE_DISPLAY_PICTURE_API API ERROR............", error)
            toast.error("Could Not Update Display Picture")
        }
        toast.dismiss(toastId)
    }
}

export function updateProfile(refreshToken, formData) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("PUT", UPDATE_PROFILE_API, formData, {
                Authorization: `Bearer ${refreshToken}`
            })

            console.log("UPDATE_PROFILE_API API RESPONSE............", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            console.log("Printing updated user details -> ",response.data.data.image)
            const userImage = response.data.data.image 
                ? response.data.data.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`

            console.log("Printing user image ")
            dispatch(
                setUser({...response.data.data, image: userImage})
            )
            toast.success("Profile Updated Successfully")
            localStorage.setItem("user",JSON.stringify(response.data.data))
        }
        catch (error) {
            console.log("UPDATE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Update Profile")
        }
        toast.dismiss(toastId)
    }
}

export async function changePassword(refreshToken, formData) {
const toastId = toast.loading("Loading...")
    try {
        const response = await apiConnector("POST", CHANGE_PASSWORD_API, formData, {
            Authorization: `Bearer ${refreshToken}`
        })

        console.log("Change password api response -> ",response)

        if(!response.data.success) {
            throw new Error(response.data.message)
        }

        toast.success("Passwrod Changed Successfully")
    } catch (error) {
        console.log("CHANGE_PASSWORD_API API ERROR............", error)
        toast.error(error.response.data.message)
    }
    toast.dismiss(toastId)
}

export function deleteProfile(refreshToken, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        try {
            const response = await apiConnector("DELETE",DELETE_PROFILE_API,null, {
                Authorization: `Bearer ${refreshToken}`
            })
            console.log("DELETE_PROFILE_API API RESPONSE............", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            toast.success("Profile Deleted Successfully.")
            dispatch(logout(navigate))
        } catch (error) {
            console.log("DELETE_PROFILE_API API ERROR............", error)
            toast.error("Could Not Delete Profile")
        }
        toast.dismiss(toastId)
    }
}
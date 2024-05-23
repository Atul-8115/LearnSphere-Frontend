import toast from "react-hot-toast";
import { profileEndpoints } from "../apis";
import { apiConnector } from "../apiconnector"
import { setLoading } from "../../slices/authSlice";
import { setUser } from "../../slices/profileSlice";
import { logout } from "./authApi";

const {GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API, GET_INSTRUCTOR_DATA_API} = profileEndpoints

export function getUserDetails(refreshToken, navigate) {
    return async (dispatch) => {
        const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
        try {
            const response = await apiConnector("GET", GET_USER_DETAILS_API,null, {
                Authorization: `Bearer ${refreshToken}`
            })
            console.log("GET_USER_DETAILS API RESPONSE............", response)

            if(!response.data.success) {
                throw new Error(response.data.message)
            }
            const userImage = response.data.data.image
            ? response.data.data.image
            : `https://api.dicebear.com/5.x/initials/svg?seed=${response.data.data.firstName} ${response.data.data.lastName}`
            dispatch(setUser({ ...response.data.data, image: userImage }))
        } catch (error) {
            dispatch(logout(navigate))
            console.log("GET_USER_DETAILS API ERROR............", error)
            toast.error("Could Not Get User Details")
        }
        toast.dismiss(toastId)
        dispatch(setLoading(false))
    }
}

export async function getUserEnrolledCourses(refreshToken) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        console.log("BEFORE Calling BACKEND API FOR ENROLLED COURSES")
        const response = await apiConnector(
            "GET",
            GET_USER_ENROLLED_COURSES_API,
            null,
            {
                Authorization: `Bearer ${refreshToken}`
            }
        )
        console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES",response);

        if(!response.data.success) {
            throw new Error(response.data.message)
        }
        result = response.data.data
        toast.success("All enrolled courses fetched.")
    } catch (error) {
        console.log("GET_USER_ENROLLED_COURSES_API API ERROR............", error)
        toast.error("Could Not Get Enrolled Courses")
    }
    toast.dismiss(toastId)
    return result
}

export async function getInstructorData(refreshToken) {
    const toastId = toast.loading("Loading...")
    let result = []
    try {
        const response = await apiConnector("GET",GET_INSTRUCTOR_DATA_API,null, {
            Authorization: `Bearer ${refreshToken}`
        })
        console.log("GET_INSTRUCTOR_DATA_API API RESPONSE............", response)
        result = response?.data?.data
    } catch (error) {
        console.log("GET_INSTRUCTOR_DATA_API API ERROR............", error)
        toast.error(error.message)
    }
    toast.dismiss(toastId)
    return result
}
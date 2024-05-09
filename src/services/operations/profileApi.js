import toast from "react-hot-toast";
import { profileEndpoints } from "../apis";
import { apiConnector } from "../apiconnector"

const {GET_USER_DETAILS_API, GET_USER_ENROLLED_COURSES_API} = profileEndpoints

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
                Authorisation: `Bearer ${refreshToken}`
            }
        )
        console.log("AFTER Calling BACKEND API FOR ENROLLED COURSES");

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
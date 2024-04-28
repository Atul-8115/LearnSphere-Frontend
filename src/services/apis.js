const BASE_URL = 'http://localhost:8000/api/v1'
// const BASE_URL = process.env.REACT_APP_BASE_URL

// AUTH ENPOINTS
export const authEndpoints = {
    SENDOTP_API: BASE_URL + "/auth/sendotp",
    LONGIN_API: BASE_URL + "/auth/login",
    SIGNUP_API: BASE_URL + "/auth/signup",
    RESETPASSTOKEN_API: BASE_URL + "/auth/reset-password-token",
    RESETPASSWORD_API: BASE_URL + "/auth/reset-password"
}

export const categories = {
    CATEGORIES_API : BASE_URL + '/course/showAllCategories'
}
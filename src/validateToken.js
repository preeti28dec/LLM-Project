import jwtDecode from "jwt-decode";

const validateToken = (token) => {
    if (!token) {
        return { success: false, message: "Token is missing" };
    }

    try {
        const decoded = jwtDecode(token);

        // Check if the token has expired
        if (decoded.exp * 1000 < Date.now()) {
            return { success: false, message: "Token has expired" };
        }

        return { success: true, data: decoded };
    } catch (error) {
        return { success: false, message: "Invalid token: " + error.message };
    }
};

// Example Usage
const token = "your_jwt_token_here";
const result = validateToken(token);
console.log(result);

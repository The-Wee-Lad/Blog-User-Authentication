import jwt from "jsonwebtoken";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { Users } from "../models/users.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const verifyJWT = asyncHandler( async (req, res, next) => {
    try {
        
        const receivedAccessToken = req.cookies?.accessToken || req.headers.authorization?.replace("Bearer","")?.trim();
    
        if(!receivedAccessToken){
            res.status(401).json(new ApiResponse(401, {}, "No Token Found", 708));
            throw new Error("No Token Found");
        }
        
        let decodedToken;
        try {
            decodedToken = jwt.verify(receivedAccessToken, process.env.ACCESS_TOKEN_SECRET);
        } catch (error) {
            if(error.name == 'TokenExpiredError'){
                res.status(401).json(new ApiResponse(401, {}, "Token Expired", 709));
                throw error;
            }
            else{
                throw new Error("Invalid Token");
            }
        }
        // console.log(decodedToken);
        const user = await Users.findById(decodedToken?._id).select("-password -refreshToken");
        
        if(!user){
            res.status(500).json(new ApiResponse(500, {}, "DB error", 708));
            throw new Error("DB server error in validation middleware");
        }
        req.user = user;
        next();

    } catch (error) {
        throw error;
    }
}
);
export { verifyJWT };
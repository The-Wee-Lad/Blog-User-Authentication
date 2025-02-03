import {Router}  from "express";
import { 
    registerUser, 
    refreshAccessToken, 
    loginUser, 
    isUserLoggedIn,
    logoutUser
} from "../controllers/user.controller.js"
import { verifyJWT } from "../middlewares/auth.middlewares.js";


const router = Router();

router.route('/').get((req,res) => {
    res.redirect('/');
});

router.route('/register')
.get((req,res)=>{
    res.render('userRegister',{title:"SignUp Page"});
})
.post(registerUser);

router.route('/login')
.get((req,res)=>{
    res.render("userLogin",{title: "Login Page"});
})
.post(loginUser);

router.route('/isUserLoggedIn')
.get(isUserLoggedIn);

router.route("/refreshAccessToken")
.post(refreshAccessToken)

router.route("/logout")
.get(verifyJWT,logoutUser)

export default router;
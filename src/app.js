import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";


const app = express();

app.set('view engine','ejs');


app.use(cors({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}));




app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({extended : true, limit : "16kb"}));
app.use(express.static(path.resolve()+"/src/public"));
app.use(cookieParser());


import userRouter from "./router/user.routes.js";
import homeRouter from "./router/home.routes.js"
import articleRouter from "./router/articles.routes.js";

app.use('/api/v1/user',userRouter);
app.use('/api/v1/home',homeRouter);
app.get('/api/v1/',(req, res)=>{
    res.redirect('/api/v1/home')
});

app.get('/',(req ,res )=> {
    res.redirect('/api/v1/home');
});

app.
get('/contact',(req ,res )=> {
    res.redirect('/api/v1/home/contact');
});

app.get('/about',(req ,res )=> {
    res.redirect('/api/v1/home/about');
});

app.get('/myBlogs',(req ,res )=> {
    res.redirect("/api/v1/user/myBlogs");
});

app.use('/articles', articleRouter);

app.get('/error',(req,res)=>{
    res.render("ErrorPage",{
        title: "ERROR ",
        error: {
            name:"500 ServerError",
            message: "Servor Error Occurred. Try Again Later",
        },
    })
})

app.get("*",(req,res) => {
    res.render("ErrorPage",{
        title: "Page Not Found",
        error: {
            message : "Page Not Found"
        }
    });
});

// app.use((err,req,res,next) => {
//     res.render("ErrorPage",{
//         title: "Page Not Found",
//         error: err
//     });
// });


export default app;
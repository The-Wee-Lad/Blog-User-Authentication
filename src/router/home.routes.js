import {Router}  from "express";

const router = Router();

router.route('/').get((req,res) => {
    res.render('HomePage',{title:"Home"});
});

router.route('/about').get((req, res) => {
    res.redirect("/api/v1/home/");
}
);




export default router;
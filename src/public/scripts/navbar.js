function toggleMenu() {
    const elem = document.querySelector('.nav-links');
    elem.classList.toggle('active');
    const toggleButton = document.querySelector('.menu-toggle');
    if(toggleButton.textContent.charCodeAt(0) == 9887)
        toggleButton.innerHTML = "&#9776;";
    else
        toggleButton.innerHTML = "&#9887;";
}

let loginStatus;
async function checkLogin() {
    try {
        const response = await axios.get('/api/v1/user/isUserLoggedIn');
        // console.log(response.data);
        loginStatus = response.data.data.isUserLoggedIn;    
    } catch (error) {
        // console.log("Error in check login :",error);
        if(error.status<500){
            if(error.response.data.code == 709){
                console.log("Refreshing Token");
                await axios.post("/api/v1/user/refreshAccessToken")
                .then((res,rej) => {
                    loginStatus = true;
                }).catch((error) => {
                    if(error.status < 500){
                        loginStatus = false;
                    } else{
                        // throw error;
                        setTimeout(() => {
                            window.location.href = "/error";                
                        }, 1000);
                    }
                })
            }else{
                loginStatus = false;
            }
        } else{
            setTimeout(() => {
                window.location.href = "/error";                
            }, 1000);
        }
    }

    const logButton = document.querySelector('.login');
    const signUpButton = document.querySelector('.signup');

    if (loginStatus) {
        logButton.href = "#";
        logButton.addEventListener('click',logoutHandler);
        logButton.textContent = "Logout";
        logButton.style.backgroundColor = "#f48989";
        signUpButton.style.backgroundColor = "aquamarine";
        signUpButton.textContent = "Accounts";
        signUpButton.href = "/";
    } else {
        logButton.removeEventListener('click',logoutHandler);
        logButton.href = "/api/v1/user/login"
        logButton.textContent = "Login";
        logButton.style.backgroundColor = " #22cb98";
        signUpButton.style.backgroundColor = "#324b9e";
        signUpButton.textContent = "SignUp";
        signUpButton.href = "/api/v1/user/register";
    }
};

const logoutHandler = async (event) => {
    try{
        console.log("Logging Out...");
        await axios.get("/api/v1/user/logout");
        window.location.href = "/";
    } catch(error){
        console.log("Error in logutHandler: ",error);
        if(error.status<500){
            if(error.response.data.code == 709){
                console.log("Refreshing Token in logoutHandler");
                await axios.post("/api/v1/user/refreshAccessToken")
                .then((res, rej)=>{logoutHandler();})
                .catch((err)=>{
                    if(err.status<500){
                        loginStatus = false;
                    }else {
                        console.log("Inside");
                        throw error
                        // window.location.href = "/error";
                    }
                });
            }
        } else{
            console.log("Outside");
            // throw err
            // window.location.href = "/error"
        }
    }
};

document.body.addEventListener('click',(event)=>{
    const elem = document.querySelector('.navbar');
    const links = document.querySelector('.nav-links');
    if(!elem.contains(event.target) && links.classList.contains('active'))
        toggleMenu();
});
checkLogin();
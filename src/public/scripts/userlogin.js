const loginButton = document.querySelector("#submit");
        const messageDiv = document.querySelector(".message");

        const stateMessage = (error = false,message, reset = false) => {
            messageDiv.style.display = "flex"
            if(reset)   messageDiv.style.display = "none";
            if(error){
                messageDiv.style.backgroundcolor = "#f7e9e9";
                messageDiv.style.color= "#571515";
                messageDiv.style.border= "1px solid #e6c3c3";
            } else{
                messageDiv.style.backgroundcolor = "#e9f7ef";
                messageDiv.style.color= "#155724";
                messageDiv.style.border= "1px solid #c3e6cb";
            }
            messageDiv.textContent = message;
        }

        const login = async (event) => {
            stateMessage(null,null,true);
            const formData = {
                usernameOrEmail : document.forms[0].usernameOrEmail.value,
                password : document.forms[0].password.value,
            };

            if(!formData.usernameOrEmail || !formData.password){
                stateMessage(true,"All Fields are Required!!");
                return;
            }

            try {
                const response = await axios.post("/api/v1/user/login",formData);
                stateMessage(false, response.data.message+"....redirecting")
                setTimeout(() => {
                        window.location.href = "/";
                    }, 2000);
                // console.log(response.data.data);
            } catch (error) {
                // console.log(error);
                if(error.status <500){
                    stateMessage(true,error.response.data.message);
                }else{
                    setTimeout(() => {
                        window.location.href = "/error";
                    }, 500);
                }
            }
        }
        loginButton.addEventListener('click',login);
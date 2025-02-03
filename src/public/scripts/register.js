const form = document.forms[0];
        const button = document.getElementById("submit");
        const message= document.querySelector(".Message");
        const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        
        const submit = async (event) => {
            event.preventDefault();
            message.style.color = "red"; 
            message.textContent = "";
            if(!(form.password.value &&  form.confPassword.value && form.username.value && form.email.value)){
                message.textContent = "All Fields are required!!!";
                return;
            }
            if(form.confPassword.value !== form.password.value){
                message.textContent = "Confirm Password Doesn't Match";
                return;
            }
            if(!regex.test(form.email.value)){
                message.textContent = "Invalid Email"; 
                return;               
            }
            if(form.password.value.length <8){
                message.textContent = "Password must be atleast 8 characters";
                return;
            }

            const formData = {
                username : form.username.value,
                email : form.email.value,
                password : form.password.value
            }
            
            try {
                const result = await axios.post("/api/v1/user/register",formData);
                console.log(result.data);
                message.style.color = "green";
                message.textContent = result.data.message+"\n .....Redirecting";
                setTimeout(() => {
                    window.location.href= "/api/v1/user/login";
                }, 2000);
            } catch (error) {
                console.log(error);
                if(error.status<500)
                    message.textContent = error.response.data.message
                else
                {
                    window.location.href= "/error";
                }             
            }

        }

        

        button.addEventListener('click',submit)
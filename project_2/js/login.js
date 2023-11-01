const backendURL = "http://localhost:8080";

const loginButton = document.getElementById("login-btn")
loginButton.addEventListener("click", async (e) => {
    e.preventDefault();
    let loginInputValue = document.getElementById("login_username").value
    let passwordInputValue = document.getElementById("login_password").value
    if(passwordInputValue && loginInputValue){
        const response = await fetch(`${backendURL}/user/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: loginInputValue, password: passwordInputValue }),
          });
        const responseJson = await response.json();
        
        const { token, username, _id } = responseJson;
        
        document.cookie = `token=${token}; path=/; SameSite=None; Secure`;
    
        localStorage.setItem("username", username);
        localStorage.setItem("id", _id);

        window.location.pathname = "/"
    }
    else{
        console.log("login error!!!!!!!!")
    }
    
})




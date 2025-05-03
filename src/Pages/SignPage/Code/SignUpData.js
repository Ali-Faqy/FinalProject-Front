export async function userSignUp(userEmail, userName, password) {
    try {
        const response = await fetch("http://127.0.0.1:8000/users/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_email: userEmail, user_name: userName, user_password: password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          return data;
        } else {
          alert(data.message || "Error in SignUp.");
        }
        console.log("Response data:", data);
      } catch (error) {
        console.error("Error during sign-in:", error);
        alert("An error occurred. Please try again later.");
      }
    };

    export async function checkUserDefined(userEmail) {
        try {
            const response = await fetch("http://127.0.0.1:8000/users/check-email", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ user_email: userEmail}),
            });
      
            const data = await response.json();
      
            if (response.ok) {
              return data;
            } else {
              alert(data.message || "Error in check defined email.");
            }
            console.log("Response data:", data);
          } catch (error) {
            console.error("Error during sign-in:", error);
            alert("An error occurred. Please try again later.");
          }
        };
async function IsUserDefined(userEmail, userPassword) {
    try {
        const response = await fetch("http://127.0.0.1:8000/users/signin", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ user_email: userEmail, user_password: userPassword }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert("Sign-in successful!");
          console.log(data);
          return data;
        } else {
          alert(data.message || "Sign-in failed. Incorrect in Email or password.");
        }
        console.log("Response data:", data);
      } catch (error) {
        console.error("Error during sign-in:", error);
        alert("An error occurred. Please try again later.");
      }
    };

export default IsUserDefined;
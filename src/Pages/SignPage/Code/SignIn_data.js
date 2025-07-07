import { toast } from 'react-toastify';
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
          console.log(data);
          return data;
        } else {
          toast.error("Sign-in failed. Incorrect in Email or password.", { containerId: "sign-container" });
        }
        console.log("Response data:", data);
      } catch (error) {
        console.error("Error during sign-in:", error);
      }
    };

export default IsUserDefined;
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  ArrowLeft,
  Github,
  Facebook,
  Mail,
  Linkedin,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import IsUserDefined from "../Code/SignIn_data.js";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import { toast } from "react-toastify";

function SignIn() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [User, setUser] = useState({
    isDefined: false,
    userId: 0,
  });

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = async () => {
    if (!email || !password) {
      toast.error("Please fill in both email and password.", {
        containerId: "sign-container",
      });
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.", {
        containerId: "sign-container",
      });
      return;
    }

    try {
      console.log("Fetching data...");
      const data = await IsUserDefined(email, password);
      const user = {
        isDefined: data.IsUserDefined,
        userId: data.user_id,
        user_status: data.user_status,
        userRole: data.role,
        user_name: data.user_name,
        user_avatar: data.avatar,
      };
      setUser(user);

      localStorage.setItem("userId", user.userId);
      localStorage.setItem("userRole", user.userRole);
      localStorage.setItem("userName", user.user_name);
      localStorage.setItem("userAvatar", user.user_avatar);
      window.dispatchEvent(new Event("storage"));

      if (user.isDefined) {
        if (user.user_status) {
          toast.success("Sign-in successful!", {
            containerId: "sign-container",
          });
          setTimeout(() => {
            if (user.userRole === "User") {
              navigate("/home");
            } else if (user.userRole === "Driver") {
              navigate("/delivery");
            } else if (user.userRole === "Admin") {
              navigate("/admin");
            } else {
              toast.error("Unknown user role.", {
                containerId: "sign-container",
              });
            }
          }, 3500);
        } else {
          toast.error(
            "Sorry, You account are reported. You can not signed from this email",
            { containerId: "sign-container" }
          );
        }
      } else {
        toast.error("Sign-in failed. Incorrect in Email or password.", {
          containerId: "sign-container",
        });
      }
    } catch (error) {
      console.error("Fetch error:", error);
      toast.error("An error occurred during sign-in. Please try again.", {
        containerId: "sign-container",
      });
    }
  };

  return (
    <GoogleOAuthProvider clientId="631245239192-8cek364mrcs3477aet7poiv7tj0kn39c.apps.googleusercontent.com">
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-gray-50 to-gray-100">
        <Link
          to="/"
          className="absolute top-8 left-8 text-gray-600 hover:text-black transition-colors duration-300"
        >
          <ArrowLeft className="h-6 w-6" />
        </Link>

        <div className="w-full max-w-5xl h-[700px] overflow-hidden rounded-2xl shadow-2xl flex flex-col md:flex-row">
          {/* Sign In Section */}
          <div className="w-full md:w-1/2 bg-white p-8 md:p-12 relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600"></div>

            <h1 className="text-3xl font-bold mb-8 text-center text-black">
              Welcome Back
            </h1>
            <div className="flex justify-center space-x-4 mb-8">
              {/* Google login inside Mail icon */}
              <GoogleLogin
                onSuccess={async (credentialResponse) => {
                  try {
                    const res = await axios.post(
                      "http://localhost:8000/users/google-login",
                      {
                        token: credentialResponse.credential,
                      }
                    );
                    localStorage.setItem("userId", res.data.user_id);
                    localStorage.setItem("userRole", "User");
                    localStorage.setItem("userName", res.data.user_name);
                    localStorage.setItem("userAvatar", res.data.avatar);
                    window.dispatchEvent(new Event("storage"));
                    toast.success("Google sign-in successful!", {
                      containerId: "sign-container",
                    });
                    // Navigate based on role
                    if (res.data.userRole === "User") {
                      navigate("/home");
                    } else if (res.data.userRole === "Driver") {
                      navigate("/delivery");
                    } else if (res.data.userRole === "Admin") {
                      navigate("/admin");
                    }
                  } catch (error) {
                    console.error("Error during Google sign-in:", error);
                    toast.error("Google sign-in failed. Please try again.", {
                      containerId: "sign-container",
                    });
                  }
                }}
                onError={() => {
                  console.log("Google Login Failed");
                  toast.error("Google sign-in failed.", {
                    containerId: "sign-container",
                  });
                }}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    className="w-12 h-12 flex items-center justify-center rounded-full bg-red-600 hover:bg-red-700 transition-all duration-300 transform hover:scale-110 shadow-md"
                  >
                    <Mail className="h-5 w-5 text-white" />
                  </button>
                )}
              />
              {/* Facebook login with icon */}
              <FacebookLogin
                appId="717835217478182"
                autoLoad={false}
                fields="name,email"
                callback={async (response) => {
                  try {
                    const res = await axios.post(
                      "http://localhost:8000/users/facebook-login",
                      {
                        accessToken: response.accessToken,
                      }
                    );
                    localStorage.setItem("userId", res.data.user_id);
                    localStorage.setItem("userRole", "User");
                    localStorage.setItem("userName", res.data.user_name);
                    localStorage.setItem("userAvatar", res.data.avatar);
                    window.dispatchEvent(new Event("storage"));
                    toast.success("Facebook sign-in successful!", {
                      containerId: "sign-container",
                    });
                    // Navigate based on role
                    if (res.data.userRole === "User") {
                      navigate("/home");
                    } else if (res.data.userRole === "Driver") {
                      navigate("/delivery");
                    } else if (res.data.userRole === "Admin") {
                      navigate("/admin");
                    }
                  } catch (error) {
                    console.error("Facebook login failed:", error);
                    toast.error("Facebook sign-in failed. Please try again.", {
                      containerId: "sign-container",
                    });
                  }
                }}
                render={(renderProps) => (
                  <button
                    onClick={renderProps.onClick}
                    className="w-60 h-10 flex items-center justify-center border"
                  >
                    <Facebook className="mr-2 h-5 w-5 text-blue-500" />
                    Sign in with Facebook
                  </button>
                )}
              />
            </div>

            <div className="relative flex items-center justify-center mb-8">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="flex-shrink mx-4 text-gray-500">
                or continue with email
              </span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <div className="space-y-6 mb-8">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full h-12 px-4 pl-12 rounded-lg bg-gray-100 focus:bg-white border-2 border-transparent focus:border-teal-500 transition-all duration-300 outline-none"
                />
                <Mail className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
              </div>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full h-12 px-4 pl-12 pr-12 rounded-lg bg-gray-100 focus:bg-white border-2 border-transparent focus:border-teal-500 transition-all duration-300 outline-none"
                />
                <Lock className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3.5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end mb-8">
              <button className="text-teal-600 hover:text-teal-800 text-sm font-medium transition-colors duration-300">
                Forgot Your Password?
              </button>
            </div>
            <button
              onClick={handleSignIn}
              className="w-full h-12 rounded-lg bg-teal-700 text-white font-medium hover:bg-teal-800 transition-all duration-300 transform hover:translate-y-[-2px] shadow-md"
            >
              SIGN IN
            </button>
            <div className="mt-6 text-center md:hidden">
              <p className="text-gray-500 mb-2">Don't have an account?</p>
              <Link
                to="/signUp"
                className="text-teal-600 font-medium hover:text-teal-800 transition-colors duration-300"
              >
                SIGN UP
              </Link>
            </div>
          </div>

          {/* Sign Up Section */}
          <div className="hidden md:flex w-1/2 bg-gradient-to-br from-teal-700 to-teal-900 relative overflow-hidden">
            <div className="absolute top-[-50px] right-[-50px] w-[200px] h-[200px] rounded-full bg-teal-500 opacity-20"></div>
            <div className="absolute bottom-[-100px] left-[-50px] w-[300px] h-[300px] rounded-full bg-teal-500 opacity-20"></div>
            <div className="flex flex-col items-center justify-center p-12 text-center w-full h-full">
              <h1 className="text-4xl text-white font-bold mb-6">
                Hello, Friend!
              </h1>
              <p className="text-teal-100 text-lg mb-10 max-w-xs">
                Register with your personal details to use all of the site
                features
              </p>
              <Link to="/signUp">
                <button className="border-2 border-white text-white px-10 py-3 rounded-lg font-medium hover:bg-white hover:text-teal-800 transition-all duration-300 transform hover:scale-105">
                  SIGN UP
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}

export default SignIn;

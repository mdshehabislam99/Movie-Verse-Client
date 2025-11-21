import { useEffect, useState } from "react";
import toast, { ErrorIcon } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Provider/AuthProvider";
import { FaCheck, FaEnvelope, FaEye, FaEyeSlash, FaTimes } from "react-icons/fa";
import Logo from "../../Components/Logo/Logo";
import imgs from "../../assets/banner2.jpg"
import { RiLockPasswordFill } from "react-icons/ri";
import { BsFillPersonFill, BsFillPersonPlusFill } from "react-icons/bs";
import { MdAddAPhoto, MdError } from "react-icons/md";
import GlobalLoader from "../../Components/GlobalLoader/GlobalLoader";

const Register = () => {
  const { createUser, updateUserProfile, signInWithGoogle, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    photoURL: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

 const handleChange = (e) => {
   setRegisterData({
     ...registerData,
     [e.target.name]: e.target.value,
   });
 };

  const passwordValid = (password) => {
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasMinLength = password.length >= 6;

    return {
      isValid: hasUppercase && hasLowercase && hasMinLength,
      errors: [
        !hasUppercase && "Must have an Uppercase letter",
        !hasLowercase && "Must have a Lowercase letter",
        !hasMinLength && "Length must be at least 6 characters",
      ].filter(Boolean),
    };
  };

  const validatePhotoURL = (url) => {
    if (!url) return false; 
    try {
      new URL(url);
      return url.match(/\.(jpeg|jpg|gif|png|webp)$/) != null;
    } catch {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (
      !registerData.firstName ||
      !registerData.lastName ||
      !registerData.email ||
      !registerData.password ||
      !registerData.photoURL
    ) 


    if (!registerData.acceptTerms) {
      toast.error("Please accept the Terms of Use and Privacy Policy", {
        position: "top-right",
        autoClose: 5000,
      });
      setLoading(false);
      return;
    }

    if (registerData.photoURL && !validatePhotoURL(registerData.photoURL)) {
      toast.error("Please enter a valid image URL", {
        position: "top-right",
        autoClose: 5000,
      });
      setLoading(false);
      return;
    }

    const validation = passwordValid(registerData.password);
    if (!validation.isValid) {
      validation.errors.forEach((error) => toast.error(error));
      setLoading(false);
      return;
    }

    const fullName = `${registerData.firstName} ${registerData.lastName}`;

    createUser(registerData.email, registerData.password)
      .then((res) => {
        return updateUserProfile(res.user, {
          displayName: fullName,
          photoURL: registerData.photoURL,
        });
      })
      .then(() => {
        toast.success("Successfully registered in website", {
          autoClose: 3000,
        });
        setLoading(false);
      })
      
  };

  const handleGoogle = () => {
    setLoading(true);

    signInWithGoogle().then(() => {
      toast.success("Successfully logged in with Google", {
        autoClose: 3000,
      });
      navigate("/", { replace: true });
      setLoading(false);
    });
  };

  const PasswordRequirement = ({ requirement, text }) => (
    <div className="flex items-center">
      {requirement ? (
        <FaCheck className="h-4 w-4 text-green-500 mr-2" />
      ) : (
        <FaTimes className="h-4 w-4 text-red-500 mr-2" />
      )}
      <span
        className={`text-sm font-medium ${
          requirement ? "text-green-600" : "text-red-600"
        }`}
      >
        {text}
      </span>
    </div>
  );
    if (loading) {
      return <GlobalLoader />;
    }

  return (
    <div className=" min-h-screen flex items-center justify-center py-15  ">
      <div className="flex  space-y-8">
        <div className="mt-15 bg-gradient-to-br from-pink-300 to-green-400 p-4 rounded-2xl shadow-lg border border-gray-200">
          {/* Register Form */}
          <form className="flex gap-3 space-y-6" onSubmit={handleSubmit}>
            <div>
              <div className="text-center mb-8">
                <Link to="/">
                  <h2 className=" text-3xl font-bold">
                    <Logo />
                  </h2>
                </Link>
                <p className="text-xl text-gray-600 font-bold">
                  Create your account.
                </p>
              </div>
              <div className="space-y-2">
                {/* Name Fields */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="firstName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      First Name
                    </label>
                    <div
                      className="relative  transition-all
                  duration-500 transform hover:scale-105"
                    >
                      {" "}
                      <div
                        className="absolute inset-y-0  pl-3 
                                                flex items-center "
                      >
                        <BsFillPersonFill className="h-5 text-gray-700 w-5" />
                      </div>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={registerData.firstName}
                        onChange={handleChange}
                        className="w-full px-9 py-2 text-gray-800 bg-gray-200 border border-gray-400 rounded-full 
                    focus:outline-none focus:ring-2 focus:ring-green-500
                     focus:border-transparent"
                        placeholder="First Name"
                      />
                    </div>
                  </div>
                  <div>
                    <label
                      htmlFor="lastName"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Last Name
                    </label>
                    <div
                      className="relative  transition-all
                  duration-500 transform hover:scale-105"
                    >
                      {" "}
                      <div
                        className="absolute inset-y-0  pl-3 
                                                flex items-center "
                      >
                        <BsFillPersonPlusFill className="h-5 text-gray-700 w-5" />
                      </div>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        required
                        value={registerData.lastName}
                        onChange={handleChange}
                        className="w-full px-9 py-2 text-gray-800 bg-gray-200 border border-gray-400 rounded-full 
                    focus:outline-none focus:ring-2 focus:ring-green-500
                     focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <div
                    className="relative  transition-all
                  duration-500 transform hover:scale-105"
                  >
                    {" "}
                    <div
                      className="absolute inset-y-0  pl-3 
                                                flex items-center "
                    >
                      <FaEnvelope className="h-4 text-gray-700 w-4" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={registerData.email}
                      onChange={handleChange}
                      className="w-full px-9 py-2 text-gray-800 bg-gray-200 border border-gray-400 rounded-full 
                    focus:outline-none focus:ring-2 focus:ring-green-500
                     focus:border-transparent"
                      placeholder="Email"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Password
                  </label>
                  <div
                    className="relative  transition-all
                  duration-500 transform hover:scale-105"
                  >
                    <div
                      className="absolute inset-y-0  pl-3 
                                                flex items-center "
                    >
                      <RiLockPasswordFill className="h-4 text-gray-700 w-4" />
                    </div>
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      required
                      value={registerData.password}
                      onChange={handleChange}
                      className="w-full px-8 py-2 text-gray-800 bg-gray-200 border border-gray-400 rounded-full 
                    focus:outline-none focus:ring-2 focus:ring-green-500
                     focus:border-transparent"
                      placeholder="Password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((s) => !s)}
                      className="absolute inset-y-0 right-0 pr-3 flex 
                      items-center text-gray-600 hover:text-gray-600"
                    >
                      {showPassword ? (
                        <FaEye size={16} />
                      ) : (
                        <FaEyeSlash size={16} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Photo URL (Optional) */}

                <div>
                  <label
                    htmlFor="photoURL"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Photo URL
                  </label>
                  <div
                    className="relative  transition-all
                  duration-500 transform hover:scale-105"
                  >
                    <div
                      className="absolute inset-y-0  pl-3 
                                                flex items-center "
                    >
                      <MdAddAPhoto className="h-4 text-gray-700 w-4" />
                    </div>
                    <input
                      id="photoURL"
                      name="photoURL"
                      type="url"
                      value={registerData.photoURL}
                      onChange={handleChange}
                      required
                      className="w-full px-8 py-2 text-gray-800 bg-gray-200 border border-gray-400 rounded-full 
                    focus:outline-none focus:ring-2 focus:ring-green-500
                     focus:border-transparent "
                      placeholder="https://example.com/photo.jpg"
                    />
                    {registerData.photoURL &&
                      validatePhotoURL(registerData.photoURL) && (
                        <div className="mt-2">
                          <p className="text-sm text-gray-600 mb-1">
                            Photo Preview:
                          </p>
                          <div className="w-20 h-20 border-2 border-green-400 rounded-lg overflow-hidden">
                            <img
                              src={registerData.photoURL}
                              alt="Preview"
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = "none";
                              }}
                            />
                          </div>
                        </div>
                      )}

                       {registerData.photoURL &&
                  !validatePhotoURL(registerData.photoURL) && (
                    <p className="mt-1 text-xs text-red-500 flex items-center">
                      <MdError className="text-red-500 mr-1" size={12} />
                      Please enter a valid image URL
                    </p>
                  )}
              </div>
                  </div>
                </div>

              {/* Password Requirements */}
              {registerData.password && (
                <div className="mt-4 p-4 bg-gray-300 rounded-lg space-y-2">
                  <p className="text-sm font-semibold text-gray-700 mb-2">
                    Password must contain:
                  </p>
                  <PasswordRequirement
                    requirement={/[A-Z]/.test(registerData.password)}
                    text="At least one uppercase letter"
                  />
                  <PasswordRequirement
                    requirement={/[a-z]/.test(registerData.password)}
                    text="At least one lowercase letter"
                  />
                  <PasswordRequirement
                    requirement={registerData.password.length >= 6}
                    text="Minimum 6 characters"
                  />
                </div>
              )}

              {/* Register Button */}
              <button
                type="submit"
                disabled={loading}
                className="mt-4 w-full bg-amber-600 hover:bg-amber-700 
                text-white font-semibold py-3 px-4 rounded-full  transition-all
                  duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Creating Account..." : "Register"}
              </button>
              <div className="mt-4 flex  justify-center">
                <span className="mx-2 text-gray-700 text-sm">
                  Or continue with
                </span>
              </div>

              {/* Google Sign Up */}
              <button
                type="submit"
                onClick={handleGoogle}
                disabled={loading}
                className="mt-4 w-full flex justify-center
                 items-center py-3 px-4 border border-gray-300
                  rounded-full
                   shadow-sm bg-gray-400 
                   text-sm font-medium text-gray-700
                    hover:bg-amber-500
                      transition-all
                  duration-300 transform hover:scale-105
                   disabled:opacity-50"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Log In with Google
              </button>
              {/* Login Link */}
              <div className="flex justify-between mt-4">
                <p className="text-gray-600">
                  Already a member?{" "}
                  <button
                    className="text-blue-600 
                    hover:text-amber-500 font-semibold
                     transition-all
                  duration-500 transform hover:scale-105"
                  >
                    <Link to="/login">Log In</Link>
                  </button>
                </p>
                <button
                  className="text-blue-600
                 transition-all
                  duration-500 transform hover:scale-105
                   hover:text-amber-500 font-semibold"
                >
                  <Link to="/terms-services">Terms of Services</Link>
                </button>
              </div>
            </div>
            <div>
              <img
                className="shadow-md rounded-lg h-screen hidden sm:block"
                src={imgs}
                alt=""
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;

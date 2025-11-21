import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaEnvelope} from "react-icons/fa";
    import { SiGmail } from "react-icons/si";
import toast from "react-hot-toast";
import { useAuth } from "../../Provider/AuthProvider";
import Logo from "../../Components/Logo/Logo";
import GlobalLoader from "../../Components/GlobalLoader/GlobalLoader";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { resetPassword } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const previousfillEmail = searchParams.get("email");
    if (previousfillEmail) {
      setEmail(previousfillEmail);
    }
  }, [location]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    resetPassword(email).then(() => {
      toast.success("Password reset email sent! Check your inbox.");
      setTimeout(() => {
        window.open("https://mail.google.com", "_blank");
        navigate("/login");
      }, 2000);
    });
  };

  return (
    <div
      className="min-h-screen 
      flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8"
    > <GlobalLoader></GlobalLoader>
      <div className="max-w-md w-full space-y-8">
        <div className="bg-gradient-to-br from-pink-300 to-green-400 p-8 rounded-2xl shadow-xl border border-gray-100">
          <div className="text-center">
            <Link to="/" className="inline-block mb-4">
              <Logo />
            </Link>
            <h2 className="text-2xl font-bold text-gray-700">
              Reset Your Password
            </h2>
            <p className="mt-2 text-gray-800">
              Enter your email and we'll send you a reset link
            </p>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <div
                className="relative  transition-all
                  duration-500 transform hover:scale-105"
              >
                <div
                  className="absolute inset-y-0  pl-3 
                flex items-center "
                >
                  <FaEnvelope className="h-5 text-gray-700 w-5" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  disabled={isSubmitting}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-9 py-3 border 
                  border-gray-400 text-gray-800 bg-gray-200 rounded-full 
                  focus:outline-none focus:border-green-400 focus:z-10 "
                  placeholder="Enter your email address"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="group relative w-full flex justify-center
                 py-3 px-4 border border-transparent text-lg font-medium
                  rounded-full text-white bg-amber-500
                  hover:bg-amber-700   transition-all
                  duration-300 transform hover:scale-105 "
              >
                {isSubmitting ? (
                  <div className="flex items-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending in your Mail...
                  </div>
                ) : (
                  <div className="flex items-center">
                    <SiGmail color="red" className="mr-2" />
                    Send Reset Link
                  </div>
                )}
              </button>
            </div>

            <div className="text-center">
              <Link
                to="/login"
                className="inline-flex items-center
                 text-blue-600 hover:text-amber-500 
                 font-medium  transition-all
                  duration-500 transform hover:scale-105"
              >
                <FaArrowLeft className="mr-2" />
                Back to Login
              </Link>
            </div>
          </form>

          <div className="mt-3 rounded-lg">
            <p className="text-sm  font-semibold text-center">
              After on click the button, you'll be redirected to Gmail to check
              your email.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;

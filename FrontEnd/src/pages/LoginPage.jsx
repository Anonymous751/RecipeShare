import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Player } from "@lottiefiles/react-lottie-player";
import { useNavigate } from "react-router-dom";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Min 6 characters")
    .required("Password is required"),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Login failed");
      } else {
        alert("Logged in successfully");
        localStorage.setItem("token", data.token); // Save token
        resetForm();
        navigate("/dashboard"); // Redirect
      }
    } catch (error) {
      alert("Server error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[color:var(--color-background)] text-[color:var(--color-text-primary)] transition-colors duration-300">
      <div className="flex flex-col md:flex-row items-center bg-[color:var(--color-card)] rounded-xl shadow-lg overflow-hidden max-w-4xl w-full">
        {/* Animation */}
        <div className="w-full md:w-1/2 p-6 flex justify-center items-center">
          <Player
            autoplay
            loop
            src="https://assets3.lottiefiles.com/packages/lf20_x62chJ.json"
            style={{ width: "100%", maxWidth: 300, height: "auto" }}
          />
        </div>

        {/* Login Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-center text-[color:var(--color-primary)]">
            Login to Your Account
          </h2>

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-5">
                {/* Email Field */}
                <div>
                  <label className="block mb-1 font-medium">Email</label>
                  <Field
                    type="email"
                    name="email"
                    placeholder="example@mail.com"
                    className="w-full p-2 border rounded bg-transparent text-[color:var(--color-text-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)] outline-none"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Password Field */}
                <div className="relative">
                  <label className="block mb-1 font-medium">Password</label>
                  <Field
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    className="w-full p-2 border rounded bg-transparent text-[color:var(--color-text-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)] outline-none"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute top-9 right-3 text-xl text-[color:var(--color-text-muted)]"
                    tabIndex={-1}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <AiOutlineEyeInvisible />
                    ) : (
                      <AiOutlineEye />
                    )}
                  </button>
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 font-semibold rounded bg-[color:var(--color-accent)] hover:bg-[color:var(--color-primary)] text-[color:var(--color-text-primary)] transition duration-300"
                >
                  {isSubmitting ? "Logging in..." : "Login"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

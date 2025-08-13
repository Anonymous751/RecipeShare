import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Player } from "@lottiefiles/react-lottie-player";
import * as Yup from "yup";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

// Validation schema: updated min length and optional URL
const validationSchema = Yup.object({
  username: Yup.string()
    .required("Username is required")
    .min(3, "Username must be at least 3 characters"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required"),
  avatarUrl: Yup.string().url("Invalid URL").nullable().notRequired(),
  bio: Yup.string().max(200, "Bio must be 200 characters or less"),
});

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await fetch("http://localhost:5000/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Failed to register");
      } else {
        alert("Registered successfully");
        resetForm();
      }
    } catch (error) {
      alert("Server error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[color:var(--color-background)] text-[color:var(--color-text-primary)] transition-colors duration-300">
      <div className="flex flex-col md:flex-row items-center bg-[color:var(--color-card)] rounded-xl shadow-lg overflow-hidden max-w-5xl w-full">
        {/* Animation */}
        <div className="w-full md:w-1/2 p-4 flex justify-center items-center bg-[color:var(--color-background)]">
          <Player
            autoplay
            loop
            src="https://assets6.lottiefiles.com/packages/lf20_1pxqjqps.json"
            style={{ width: "100%", maxWidth: 300 }}
          />
        </div>

        {/* Form */}
        <div className="w-full md:w-1/2 p-8">
          <h2 className="text-3xl font-bold mb-6 text-[color:var(--color-primary)] text-center">
            Create Your Account
          </h2>

          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              avatarUrl: "",
              bio: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4" noValidate>
                {/* Username */}
                <div>
                  <label
                    htmlFor="username"
                    className="block mb-1 font-medium text-[color:var(--color-text-primary)]"
                  >
                    Username
                  </label>
                  <Field
                    id="username"
                    name="username"
                    className="w-full p-2 border rounded bg-transparent text-[color:var(--color-text-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)] outline-none"
                    placeholder="Enter your username"
                    autoComplete="username"
                  />
                  <ErrorMessage
                    name="username"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-1 font-medium text-[color:var(--color-text-primary)]"
                  >
                    Email
                  </label>
                  <Field
                    id="email"
                    name="email"
                    type="email"
                    className="w-full p-2 border rounded bg-transparent text-[color:var(--color-text-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)] outline-none"
                    placeholder="example@mail.com"
                    autoComplete="email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <label
                    htmlFor="password"
                    className="block mb-1 font-medium text-[color:var(--color-text-primary)]"
                  >
                    Password
                  </label>
                  <Field
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="w-full p-2 border rounded bg-transparent text-[color:var(--color-text-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)] outline-none"
                    placeholder="Enter your password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-9 text-xl text-[color:var(--color-text-muted)]"
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

                {/* Avatar URL */}
                <div>
                  <label
                    htmlFor="avatarUrl"
                    className="block mb-1 font-medium text-[color:var(--color-text-primary)]"
                  >
                    Avatar URL
                  </label>
                  <Field
                    id="avatarUrl"
                    name="avatarUrl"
                    className="w-full p-2 border rounded bg-transparent text-[color:var(--color-text-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)] outline-none"
                    placeholder="https://example.com/avatar.jpg"
                    autoComplete="off"
                  />
                  <ErrorMessage
                    name="avatarUrl"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Bio */}
                <div>
                  <label
                    htmlFor="bio"
                    className="block mb-1 font-medium text-[color:var(--color-text-primary)]"
                  >
                    Bio
                  </label>
                  <Field
                    as="textarea"
                    id="bio"
                    name="bio"
                    rows="3"
                    className="w-full p-2 border rounded bg-transparent text-[color:var(--color-text-primary)] focus:ring-2 focus:ring-[color:var(--color-primary)] outline-none resize-none"
                    placeholder="Tell us about yourself..."
                  />
                  <ErrorMessage
                    name="bio"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 font-semibold rounded bg-[color:var(--color-accent)] hover:bg-[color:var(--color-primary)] text-[color:var(--color-text-primary)] transition duration-300"
                >
                  {isSubmitting ? "Registering..." : "Register"}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

  import React, { useState } from "react";
  import api from "../api";
  import { useNavigate } from "react-router-dom";

  function RegisterCustomer() {
    const [form, setForm] = useState({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    const [msg, setMsg] = useState("");
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
      setErrors({ ...errors, [e.target.name]: "" });
    };
const validate = (data) => {
  const newErrors = {};
  if (!data.firstName) newErrors.firstName = "First name is required";
  if (!data.lastName) newErrors.lastName = "Last name is required";
  if (!data.email) {
    newErrors.email = "Email is required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    newErrors.email = "Invalid email format";
  }
  if (!data.password) {
    newErrors.password = "Password is required";
  } else if (data.password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }
  return newErrors;
};


   const handleSubmit = async (e) => {
     e.preventDefault();

   
     const trimmedForm = {
       firstName: form.firstName.trim(),
       lastName: form.lastName.trim(),
       email: form.email.trim(),
       password: form.password.trim(),
     };

     const validationErrors = validate(trimmedForm);
     if (Object.keys(validationErrors).length > 0) {
       setErrors(validationErrors);
       return;
     }

     try {
       setLoading(true);
       const res = await api.post("/auth/register/customer", trimmedForm);
       setMsg("Registration successful. Please check your email.");
       navigate("/verify");
     } catch (err) {
       setMsg(err.response?.data?.msg || "Registration failed");
     } finally {
       setLoading(false);
     }
   };


    return (
      <div className="container mt-5" style={{ maxWidth: "500px" }}>
        <h2>Customer Registration</h2>
        {msg && <div className="alert alert-info">{msg}</div>}
        <form onSubmit={handleSubmit} noValidate>
          {["firstName", "lastName", "email", "password"].map((field) => (
            <div className="mb-3" key={field}>
              <label className="form-label text-capitalize">{field}</label>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                className={`form-control ${errors[field] ? "is-invalid" : ""}`}
                value={form[field]}
                onChange={handleChange}
              />
              {errors[field] && (
                <div className="invalid-feedback">{errors[field]}</div>
              )}
            </div>
          ))}

          <button className="btn btn-primary w-100" disabled={loading}>
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>
      </div>
    );
  }

  export default RegisterCustomer;

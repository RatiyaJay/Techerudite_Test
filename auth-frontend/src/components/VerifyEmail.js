import React, { useState } from "react";
import api from "../api";

function VerifyEmail() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [msg, setMsg] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email format";
    }

    if (!code.trim()) {
      newErrors.code = "Verification code is required";
    } else if (code.length < 4) {
      newErrors.code = "Code must be at least 4 characters";
    }

    return newErrors;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setMsg("");

  
  const trimmedEmail = email.trim();
  const trimmedCode = code.trim();

  const validationErrors = validate();
  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    setLoading(true);
    const res = await api.post("/auth/verify", {
      email: trimmedEmail,
      code: trimmedCode,
    });
    setMsg(res.data.msg);
  } catch (err) {
    setMsg(err.response?.data?.msg || "Verification failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="container mt-5" style={{ maxWidth: "500px" }}>
      <h2>Email Verification</h2>
      {msg && <div className="alert alert-info">{msg}</div>}
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label>Email</label>
          <input
            className={`form-control ${errors.email ? "is-invalid" : ""}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setErrors({ ...errors, email: "" });
            }}
            type="email"
            required
          />
          {errors.email && (
            <div className="invalid-feedback">{errors.email}</div>
          )}
        </div>

        <div className="mb-3">
          <label>Verification Code</label>
          <input
            className={`form-control ${errors.code ? "is-invalid" : ""}`}
            value={code}
            onChange={(e) => {
              setCode(e.target.value);
              setErrors({ ...errors, code: "" });
            }}
            type="text"
            required
          />
          {errors.code && <div className="invalid-feedback">{errors.code}</div>}
        </div>

        <button className="btn btn-success w-100" disabled={loading}>
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Verifying...
            </>
          ) : (
            "Verify"
          )}
        </button>
      </form>
    </div>
  );
}

export default VerifyEmail;

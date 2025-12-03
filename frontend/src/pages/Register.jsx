import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import AuthContext from "../contexts/AuthContext";
import { validateRegisterForm } from "../utils/formValidators";

const Register = () => {
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const updateForm = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const validation = validateRegisterForm(form);
    if (!validation.valid) {
      setErrors(validation.errors);
      return;
    }

    try {
      await register(form); // form is an object
      navigate("/login");
    } catch (err) {
      setErrors({ general: err.response?.data?.message || "Registration failed" });
    }
  };

  return (
    <div className="auth-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister} className="auth-form">
        <InputField label="Name" value={form.name} onChange={(v) => updateForm("name", v)} error={errors.name} />
        <InputField label="Email" type="email" value={form.email} onChange={(v) => updateForm("email", v)} error={errors.email} />
        <InputField label="Address" value={form.address} onChange={(v) => updateForm("address", v)} error={errors.address} />
        <InputField label="Password" type="password" value={form.password} onChange={(v) => updateForm("password", v)} error={errors.password} />
        {errors.general && <p className="error">{errors.general}</p>}
        <button className="btn-primary" type="submit">Create Account</button>
      </form>
    </div>
  );
};

export default Register;

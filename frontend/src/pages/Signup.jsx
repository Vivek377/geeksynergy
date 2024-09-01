import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContextProvider";
import { Toaster, toast } from "react-hot-toast";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    profession: "",
  });
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("https://geeksynergy-backend-production.up.railway.app/user/register", formData)
      .then((res) => {
        console.log(res.data);
        toast.success("Signup done. Please login");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      })
      .catch((err) => console.log(err));
  };

  if (user?.token) return <Navigate to={"/"} />;

  return (
    <div className="container mt-5">
      <Toaster />
      <h2 className="text-center mb-4">Sign Up</h2>
      <form onSubmit={handleSubmit} className="col-md-6 offset-md-3">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">
            Phone
          </label>
          <input
            type="tel"
            className="form-control"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="profession" className="form-label">
            Profession
          </label>
          <select
            className="form-select"
            id="profession"
            name="profession"
            value={formData.profession}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select your profession
            </option>
            <option value="student">Student</option>
            <option value="developer">Developer</option>
            <option value="designer">Designer</option>
            <option value="teacher">Teacher</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="mb-3 text-decoration-none">
          <Link to={"/login"}>Already have an account? Log In.</Link>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-primary">
            Sign Up
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;

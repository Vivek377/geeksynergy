import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Toaster, toast } from "react-hot-toast";

const Home = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    profession: "",
  });
  const { user } = useContext(AuthContext);
  const [id, setId] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleDelete = (id) => {
    axios
      .delete(
        `https://geeksynergy-backend-production.up.railway.app/user/delete/${id}`,
        {
          headers: {
            Authorization: `${user.token}`,
          },
        }
      )
      .then((res) => {
        setUsers(res.data);
        toast.success("User Deleted");
      })
      .catch((e) => console.log(e));
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .patch(
        `https://geeksynergy-backend-production.up.railway.app/user/edit/${id}`,
        formData,
        {
          headers: {
            Authorization: `${user.token}`,
          },
        }
      )
      .then((res) => {
        setUsers(res.data);
        toast.success("User Updated");
      })
      .catch((e) => console.log(e));
  };

  useEffect(() => {
    axios
      .get("https://geeksynergy-backend-production.up.railway.app/user", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setUsers(res.data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <div className="container mt-5">
      <Toaster />
      <h2 className="text-center mb-4">User Data</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Profession</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.profession}</td>
              <td>
                <button
                  data-bs-toggle="modal"
                  data-bs-target="#userFormModal"
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => {
                    setId(user._id), setFormData(user);
                  }}
                >
                  Update
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(user._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div
        className="modal fade"
        id="userFormModal"
        tabIndex="-1"
        aria-labelledby="userFormModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="userFormModalLabel">
                User Information
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleUpdate}>
                {/* Name Field */}
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

                {/* Email Field */}
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

                {/* Phone Field */}
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

                {/* Profession Field */}
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

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    data-bs-dismiss="modal"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

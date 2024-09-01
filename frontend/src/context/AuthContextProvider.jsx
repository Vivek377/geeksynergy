import { createContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const login = (data) => {
    axios
      .post("https://geeksynergy-backend-production.up.railway.app/user/login", data)
      .then((res) => {
        setUser({ token: res.data.token });
        navigate("/");
      })
      .catch((e) => console.log(e));
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, logout, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;

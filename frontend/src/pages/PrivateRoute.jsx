import { useContext } from "react";
import { AuthContext } from "../context/AuthContextProvider";
import { Navigate } from "react-router-dom";

const PrivatRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) return children;

  return <Navigate to={"/login"} />;
};

export default PrivatRoute;

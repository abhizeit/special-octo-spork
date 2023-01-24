import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { isAuth } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAuth) {
      navigate("/login");
    }
  }, [isAuth, navigate]);
  if (!isAuth) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;

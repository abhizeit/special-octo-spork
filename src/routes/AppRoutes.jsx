import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../hoc/PrivateRoute";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AppRoutes;

import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../hoc/PrivateRoute";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Write from "../pages/Write";
import Trending from "../pages/Trending";
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
      <Route
        path="/write"
        element={
          <PrivateRoute>
            <Write />
          </PrivateRoute>
        }
      />
      <Route
        path="/trending"
        element={
          <PrivateRoute>
            <Trending />
          </PrivateRoute>
        }
      />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
};

export default AppRoutes;

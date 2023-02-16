import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../hoc/PrivateRoute";
import Home from "../pages/Home";
import Signup from "../pages/Signup";
import Login from "../pages/Login";
import Write from "../pages/Write";
import Trending from "../pages/Trending";
import ViewBlog from "../pages/ViewBlog";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/write" element={<Write />} />
      <Route path="/trending" element={<Trending />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="viewblog/:id" element={<ViewBlog />} />
    </Routes>
  );
};

export default AppRoutes;

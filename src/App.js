import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import axios from "axios";

// Custom Modules
import Dashboard from "./components/admin/Dashboard";
import Profile from "./components/admin/Profile";
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import BaseIndex from "./components/frontend/BaseIndex";
import Home from "./components/frontend/Home";
import MasterLayout from "./layouts/admin/MasterLayout";
import UserProtectedRoute from "./routes/UserProtectedRoute";
import Page404 from "./components/error/Page404";
import AddCategory from "./components/admin/category/AddCategory";
import ViewCategory from "./components/admin/category/ViewCategory";
import EditCategory from "./components/admin/category/EditCategory";

// Settting up axios defaults
axios.defaults.baseURL = "http://localhost:8000/";
// axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("authToken");
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axios.defaults.withCredentials = true;

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<BaseIndex />}>
            <Route index element={<Home />} />
            <Route
              path="login"
              element={
                // check if user is logged in
                localStorage.getItem("authToken") ? (
                  <Navigate to="/" replace />
                ) : (
                  <Login />
                )
              }
            />
            <Route
              path="register"
              element={
                localStorage.getItem("authToken") ? (
                  <Navigate to="/" replace />
                ) : (
                  <Register />
                )
              }
            />
          </Route>

          <Route
            path="/admin"
            element={
              <UserProtectedRoute>
                <MasterLayout />
              </UserProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<Profile />} />
            <Route path="category" element={<ViewCategory />} />
            <Route path="add-category" element={<AddCategory />} />
            <Route
              path="edit-category/:categoryId"
              element={<EditCategory />}
            />
          </Route>
          <Route path="*" element={<Page404 />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

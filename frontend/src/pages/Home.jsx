import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Home = () => {
  const { user } = useAuth();

  return (
    <div className="container py-5 text-center">
      <h1 className="fw-bold mb-3">Welcome to Store Rating Platform</h1>
      <p className="text-muted mb-4">
        Rate stores, explore reviews, and manage your business efficiently.
      </p>

      {!user ? (
        <div>
          <Link className="btn btn-primary me-2" to="/login">
            Login
          </Link>
          <Link className="btn btn-outline-secondary" to="/register">
            Register
          </Link>
        </div>
      ) : (
        <div className="mt-4">
          {user.role === "admin" && (
            <Link className="btn btn-primary" to="/admin/dashboard">
              Go to Admin Dashboard
            </Link>
          )}

          {user.role === "store_owner" && (
            <Link className="btn btn-success" to="/owner/dashboard">
              Go to Store Owner Dashboard
            </Link>
          )}

          {user.role === "normal_user" && (
            <Link className="btn btn-info" to="/stores">
              Browse Stores
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;

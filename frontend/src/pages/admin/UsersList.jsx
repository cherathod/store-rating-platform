import { useEffect, useState } from "react";
import axios from "../../api/axios";
import useAuth from "../../hooks/useAuth";

const UsersList = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
    role: "",
  });
  const [sort, setSort] = useState("name.asc");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/admin/users", {
        params: {
          ...filters,
          sort,
        },
      });
      setUsers(res.data.items || []);
    } catch (err) {
      console.error("Failed to load users", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [sort]);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  return (
    <div className="container p-3">
      <h2 className="mb-3">Users List</h2>

      {/* Filters */}
      <form className="mb-3" onSubmit={handleFilter}>
        <div className="row g-2">
          <div className="col">
            <input
              type="text"
              placeholder="Name"
              className="form-control"
              value={filters.name}
              onChange={(e) =>
                setFilters({ ...filters, name: e.target.value })
              }
            />
          </div>
          <div className="col">
            <input
              type="text"
              placeholder="Email"
              className="form-control"
              value={filters.email}
              onChange={(e) =>
                setFilters({ ...filters, email: e.target.value })
              }
            />
          </div>
          <div className="col">
            <input
              type="text"
              placeholder="Address"
              className="form-control"
              value={filters.address}
              onChange={(e) =>
                setFilters({ ...filters, address: e.target.value })
              }
            />
          </div>
          <div className="col">
            <select
              className="form-select"
              value={filters.role}
              onChange={(e) =>
                setFilters({ ...filters, role: e.target.value })
              }
            >
              <option value="">All Roles</option>
              <option value="admin">Admin</option>
              <option value="normal_user">Normal User</option>
              <option value="store_owner">Store Owner</option>
            </select>
          </div>
          <div className="col-auto">
            <button className="btn btn-primary">Search</button>
          </div>
        </div>
      </form>

      {/* User Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th onClick={() => setSort("name.asc")}>Name</th>
            <th onClick={() => setSort("email.asc")}>Email</th>
            <th onClick={() => setSort("address.asc")}>Address</th>
            <th onClick={() => setSort("role.asc")}>Role</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center">
                Loading...
              </td>
            </tr>
          ) : users.length ? (
            users.map((u) => (
              <tr key={u.id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.address}</td>
                <td>{u.role}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No Users Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UsersList;

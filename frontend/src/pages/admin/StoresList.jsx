import { useEffect, useState } from "react";
import axios from "../../api/axios";

const StoresList = () => {
  const [stores, setStores] = useState([]);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [sort, setSort] = useState("name.asc");
  const [loading, setLoading] = useState(false);

  const fetchStores = async () => {
    try {
      setLoading(true);
      const res = await axios.get("/admin/stores", {
        params: { ...filters, sort },
      });

      setStores(res.data.items || []);
    } catch (err) {
      console.error("Failed to load stores", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, [sort]);

  const handleFilter = (e) => {
    e.preventDefault();
    fetchStores();
  };

  return (
    <div className="container p-3">
      <h2 className="mb-3">Stores List</h2>

      {/* Filters */}
      <form className="mb-3" onSubmit={handleFilter}>
        <div className="row g-2">
          <div className="col">
            <input
              type="text"
              placeholder="Store Name"
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
          <div className="col-auto">
            <button className="btn btn-primary">Search</button>
          </div>
        </div>
      </form>

      {/* Stores Table */}
      <table className="table table-bordered">
        <thead>
          <tr>
            <th onClick={() => setSort("name.asc")}>Name</th>
            <th onClick={() => setSort("email.asc")}>Email</th>
            <th onClick={() => setSort("address.asc")}>Address</th>
            <th>Rating</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4" className="text-center">
                Loading...
              </td>
            </tr>
          ) : stores.length ? (
            stores.map((store) => (
              <tr key={store.id}>
                <td>{store.name}</td>
                <td>{store.email}</td>
                <td>{store.address}</td>
                <td>{store.rating ?? "N/A"}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No Stores Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StoresList;

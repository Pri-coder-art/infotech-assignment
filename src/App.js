import React, { useState, useMemo } from "react";
import data from "./data.json";

const SAMPLE_IMAGE_URL = "";

const App = () => {
  const [filters, setFilters] = useState({
    search: "",
    category: "All",
    sortBy: "name",
    sortOrder: "asc",
  });

  const categories = useMemo(
    () => ["All", ...new Set(data.map((item) => item.category))],
    []
  );

  const filteredData = useMemo(() => {
    const { search, category, sortBy, sortOrder } = filters;

    let filtered = data.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.brand.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = category === "All" || item.category === category;

      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a, b) => {
      const valueA = a[sortBy];
      const valueB = b[sortBy];

      if (typeof valueA === "string") {
        return sortOrder === "asc"
          ? valueA.localeCompare(valueB)
          : valueB.localeCompare(valueA);
      }
      return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
    });
  }, [filters]);

  return (
    <div className="app">
      <h1>Product List</h1>
      {/* Filters */}
      <div className="filters">
        <input
          type="text"
          placeholder="Search..."
          value={filters.search}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, search: e.target.value }))
          }
        />
        <select
          value={filters.category}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, category: e.target.value }))
          }
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <select
          value={filters.sortBy}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, sortBy: e.target.value }))
          }
        >
          <option value="name">Name</option>
          <option value="price">Price</option>
          <option value="rating">Rating</option>
          <option value="stock">Stock</option>
        </select>
        <select
          value={filters.sortOrder}
          onChange={(e) =>
            setFilters((prev) => ({ ...prev, sortOrder: e.target.value }))
          }
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      {/* Horizontal Card List */}
      <div className="horizontal-scroll-container">
        {filteredData.map((item) => (
          <div key={item.id} className="card">
            <img src="./grocery.jpeg" alt={item.name} className="card-image" />
            <div className="card-content">
              <h3>{item.name}</h3>
              <p>
                <strong>Brand:</strong> {item.brand}
              </p>
              <p>
                <strong>Price:</strong> ${item.price.toFixed(2)}
              </p>
              <p>
                <strong>Category:</strong> {item.category}
              </p>
              <p>
                <strong>Rating:</strong> {item.rating}
              </p>
              <p>
                <strong>Stock:</strong> {item.stock}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;

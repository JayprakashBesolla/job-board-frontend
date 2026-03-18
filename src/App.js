import { useEffect, useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [page, setPage] = useState(1);

  useEffect(() => {
    setLoading(true);

    const url = `https://job-board-backend-7zn5.onrender.com/api/jobs?search=${search}&location=${location}&type=${type}&page=${page}`;

    axios
      .get(url)
      .then((res) => setJobs(res.data))
      .catch((err) => console.log("Error:", err))
      .finally(() => setLoading(false));
  }, [search, location, type, page]);

  return (
    <div className="app-wrapper">

      {/* HEADER */}
      <header className="header">
        <div className="header-left">
          <span className="header-label">// opportunities.board</span>
          <h1 className="header-title">Job Board</h1>
        </div>

        <div className="header-meta">
          <div>SYS_STATUS <span>ONLINE</span></div>
          <div>LISTINGS <span>{jobs.length}</span></div>
          <div>PAGE <span>{page}</span></div>
        </div>
      </header>

      {/* FILTERS */}
      <div className="filters-bar">

        <div className="filter-group">
          <label className="filter-label">{/* search */}</label>
          <input
            className="filter-input"
            type="text"
            placeholder="role, skill, keyword..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>

        <div className="filter-group">
          <label className="filter-label">{/* location */}</label>
          <div className="select-wrapper">
            <select
              className="filter-select"
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Locations</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Bangalore">Bangalore</option>
              <option value="Chennai">Chennai</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>

        <div className="filter-group">
          <label className="filter-label">{/* job type */}</label>
          <div className="select-wrapper">
            <select
              className="filter-select"
              value={type}
              onChange={(e) => {
                setType(e.target.value);
                setPage(1);
              }}
            >
              <option value="">All Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Remote">Remote</option>
            </select>
          </div>
        </div>

      </div>

      {/* STATUS */}
      <div className="status-bar">
        <div
          className={`status-dot ${
            loading
              ? "loading"
              : jobs.length === 0
              ? "empty"
              : "loaded"
          }`}
        />

        {loading && "FETCHING LISTINGS..."}
        {!loading && jobs.length === 0 && "NO RESULTS FOUND"}
        {!loading && jobs.length > 0 && `${jobs.length} LISTINGS LOADED`}
      </div>

      {/* EMPTY STATE */}
      {!loading && jobs.length === 0 && (
        <div className="empty-state">
          <h2>NULL RESULTS</h2>
          <p>Adjust filters or try a different search query.</p>
        </div>
      )}

      {/* JOB GRID */}
      <div className="jobs-grid">
        {jobs.map((job, i) => (
          <div className="job-card" key={job._id}>
            <div className="card-index">
              #{String(i + 1 + (page - 1) * jobs.length).padStart(3, "0")}
            </div>

            <h3 className="job-title">{job.title}</h3>
            <div className="job-company">{job.company}</div>

            <div className="job-tags">
              <span className="tag">{job.location}</span>
              <span className="tag tag-type">{job.type}</span>
            </div>

            {job.description && (
              <p className="job-description">{job.description}</p>
            )}

            <div className="job-footer">
              <span>POSTED</span>
              <span>{new Date(job.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
        ))}
      </div>

      {/* PAGINATION */}
      <div className="pagination">
        <button
          className="page-btn"
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
        >
          ← PREV
        </button>

        <div className="page-indicator">
          PG <span>{page}</span>
        </div>

        <button
          className="page-btn"
          onClick={() => setPage(page + 1)}
          disabled={jobs.length === 0}
        >
          NEXT →
        </button>
      </div>

    </div>
  );
}

export default App;
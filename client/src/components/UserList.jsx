import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactPaginate from "react-paginate";
const UserList = () => {
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(0);
  const [totalRows, setTotalRows] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [query, setQuery] = useState("");
  const [message, setMessage] = useState("");

  // Fungsi yg dijalankan ketika (nomer) halaman berubah
  // fungsi ini juga secara otomatis membawa data selected ketika dijalankan
  // note: nilai dari {selected} dimulai dari 0
  const changePage = ({ selected }) => {
    setPage(selected);
    // handle ketika halaman sudah mencapai akhir
    if (selected >= 19) {
      setMessage("Nyari data Sejauh ini, apa gunanya fitur searching cok ?");
    }
  };

  // jalankan useEffect
  useEffect(() => {
    getUsers();
  }, [page, keyword]);

  // Get data users
  const getUsers = async () => {
    const response = await axios.get(
      `http://localhost:5000/users?search_query=${keyword}&page=${page}&limit=${limit}`
    );
    setUsers(response.data.result);
    setPage(response.data.page);
    setTotalPages(response.data.totalPage);
    setTotalRows(response.data.totalRows);
  };

  // handle Search Data
  const searchData = (e) => {
    e.preventDefault();
    setPage(0); // reset page menjadi nilai awal lagi (0)
    setKeyword(query);
  };

  return (
    <div className="container mt-5">
      <div className="columns">
        <div className="column is-centered">
          <form onSubmit={searchData}>
            <div className="field has-addons">
              <div className="control is-expanded">
                <input
                  type="text"
                  className="input"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search something here..."
                />
              </div>
              <div className="control">
                <button type="submit" className="button is-info">
                  Search
                </button>
              </div>
            </div>
          </form>
          <table className="table is-striped is-bordered is-fullwidth mt-2">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Gender</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td> {user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.gender}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p>
            Total Data:{" "}
            <span className="has-text-weight-bold">{totalRows}</span> <br />{" "}
            Halaman:{" "}
            <span className="has-text-weight-bold">
              {totalRows ? page + 1 : 0}
            </span>{" "}
            dari <span className="has-text-weight-bold">{totalPages}</span>
          </p>
          {page >= 19 ? (
            <p className="has-text-centered has-text-danger mb-2">{message}</p>
          ) : (
            ""
          )}
          <nav
            className="pagination is-centered is-rounded"
            // render ulang halaman pada saat ada perubahan pada totalPages
            key={totalPages}
            role="navigation"
            aria-label="pagination"
          >
            <ReactPaginate
              previousLabel={"< Prev"}
              nextLabel={"Next >"}
              pageCount={Math.min(20, totalPages)}
              onPageChange={changePage}
              containerClassName={"pagination-list"}
              pageLinkClassName={"pagination-link"}
              previousLinkClassName={"pagination-previous"}
              nextLinkClassName={"pagination-next"}
              activeLinkClassName={"pagination-link is-current"}
              disabledLinkClassName={"pagination-link is-disabled"}
            />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default UserList;

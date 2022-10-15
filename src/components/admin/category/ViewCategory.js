import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Toast from "../../notification/Toast";

function ViewCategory(props) {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/category`)
      .then((res) => {
        if (res.data.status === 200) {
          setCategories(res.data.categories);
          //   console.log(res.data.categories);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  //   Delete Category
  const deleteCategory = (e, id) => {
    e.preventDefault();

    const thisClicked = e.currentTarget;
    thisClicked.innerText = "Deleting...";

    axios
      .delete(`/api/delete-category/${id}`)
      .then((res) => {
        if (res.data.status === 200) {
          Toast.fire({
            icon: "success",
            title: res.data.message,
          });
          thisClicked.closest("tr").remove(); // Remove the row
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <div className="container-fluid px-4">
      <div className="card mt-4">
        <div className="card-header">
          <h4>View Category</h4>
          <Link
            to="/admin/add-category"
            className="btn btn-primary btn-sm float-end"
          >
            Add Category
          </Link>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Slug</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((category, index) => (
                <tr key={category.id}>
                  <td>{index + 1}</td>
                  <td>{category.name}</td>
                  <td>{category.slug}</td>
                  <td>{category.status}</td>
                  <td>
                    <Link
                      to={`/admin/edit-category/${category.id}`}
                      className="btn btn-primary btn-sm"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={(e) => deleteCategory(e, category.id)}
                      className="btn btn-danger btn-sm ms-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ViewCategory;

import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Toast from "../../notification/Toast";

function Category(props) {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [category, setCategory] = useState({
    slug: "",
    name: "",
    description: "",
    meta_title: "",
    meta_keywords: "",
    meta_description: "",
    error_list: [],
  });

  const handleInputs = (e) => {
    e.persist();

    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const checkHandler = () => {
    setIsChecked(!isChecked);
  };

  //   Handle Submit
  const handleSubmitCategory = (e) => {
    e.preventDefault();

    const data = {
      slug: category.slug,
      name: category.name,
      description: category.description,
      status: isChecked,
      meta_title: category.meta_title,
      meta_keywords: category.meta_keywords,
      meta_description: category.meta_description,
    };

    axios
      .post(`/api/store-category`, data)
      .then((res) => {
        if (res.data.status === 200) {
          Toast.fire({
            icon: "success",
            title: "Category Added Successfully",
          });
          setCategory({
            slug: "",
            name: "",
            description: "",
            status: "",
            meta_title: "",
            meta_keywords: "",
            meta_description: "",
            error_list: [],
          });

          setIsChecked(false);

          navigate("/admin/category");
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          setCategory({
            ...category,
            error_list: error.response.data.errors,
          });
        }
      });
  };
  return (
    <div className="container-fluid px-4">
      <h1 className="m-4"> Add Category</h1>

      <form onSubmit={handleSubmitCategory} id="categoryForm">
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" role="presentation">
            <button
              className="nav-link active"
              id="home-tab"
              data-bs-toggle="tab"
              data-bs-target="#home"
              type="button"
              role="tab"
              aria-controls="home"
              aria-selected="true"
            >
              Home
            </button>
          </li>
          <li className="nav-item" role="presentation">
            <button
              className="nav-link"
              id="seo-tags-tab"
              data-bs-toggle="tab"
              data-bs-target="#seo-tags"
              type="button"
              role="tab"
              aria-controls="profile"
              aria-selected="false"
            >
              SEO Tags
            </button>
          </li>
        </ul>
        <div className="tab-content" id="myTabContent">
          <div
            className="tab-pane p-4 border fade show active"
            id="home"
            role="tabpanel"
            aria-labelledby="home-tab"
          >
            <div className="form-group mb-3">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                onChange={handleInputs}
                value={category.name}
                className="form-control"
                id="name"
                placeholder="Enter name"
              />
              <span className="text-danger">{category.error_list.name}</span>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="slug">Slug</label>
              <input
                type="text"
                name="slug"
                onChange={handleInputs}
                value={category.slug}
                className="form-control"
                id="slug"
                placeholder="Enter Slug"
              />
              <span className="text-danger">{category.error_list.slug}</span>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="description">Description</label>
              <textarea
                onChange={handleInputs}
                value={category.description}
                className="form-control"
                id="description"
                name="description"
                rows="3"
              ></textarea>
              <span className="text-danger">
                {category.error_list.description}
              </span>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="status">Status</label>
              <input
                type="checkbox"
                name="status"
                className="form-check-input m-2"
                onChange={checkHandler}
                checked={isChecked}
                id="status"
              />
              Status: 0=show/1=hide
            </div>
          </div>
          <div
            className="tab-pane p-4 border fade"
            id="seo-tags"
            role="tabpanel"
            aria-labelledby="seo-tags-tab"
          >
            <div className="form-group mb-3">
              <label htmlFor="meta_title">Meta Title</label>
              <input
                type="text"
                name="meta_title"
                onChange={handleInputs}
                value={category.meta_title}
                className="form-control"
                id="meta_title"
                placeholder="Enter Title"
              />
              <span className="text-danger">
                {category.error_list.meta_title}
              </span>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="meta_keywords">Meta Keywords</label>
              <textarea
                onChange={handleInputs}
                value={category.meta_keywords}
                className="form-control"
                id="meta_keywords"
                name="meta_keywords"
                rows="3"
              ></textarea>
              <span className="text-danger">
                {category.error_list.meta_keywords}
              </span>
            </div>
            <div className="form-group mb-3">
              <label htmlFor="meta_description">Meta Description</label>
              <textarea
                onChange={handleInputs}
                value={category.meta_description}
                className="form-control"
                id="meta_description"
                name="meta_description"
                rows="3"
              ></textarea>
              <span className="text-danger">
                {category.error_list.meta_description}
              </span>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary px-5 my-2 float-end">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Category;

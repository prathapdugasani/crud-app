import React from "react";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import Axios from "../Axios";

const CreatePosts = () => {
  let navigate = useHistory();
  let [state, setState] = useState({
    designation: "",
    company: "",
    working: "",
    workingTill : "",
    city: "",
    loading : false
  });
  let { designation, company, working,workingTill,city ,loading} = state;
  let handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setState({ loading: true });
      let payload = { designation, company, working, workingTill, city };
      await Axios.post("/posts", payload);
      navigate("/");
    } catch (err) {}
    setState({ loading: false });
  };
  return (
    <section id="postsBlock" className="col-md-4 mx-auto bg-white p-4 mt-4">
      <article>
        <h2 className="h4 font-weight-bold text-success text-uppercase border-bottom">
          Create post
        </h2>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label class="form-label">Designation</label>
            <input
              type="text"
              class="form-control"
              placeholder="Designation"
              onChange={handleChange}
              name="designation"
              value={designation}
            />
          </div>

          <div class="mb-3">
            <label class="form-label">Company</label>
            <input
              type="text"
              class="form-control"
              placeholder="Company"
              onChange={handleChange}
              name="Company"
              value={company}
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Working Since</label>
            <input
              type="text"
              class="form-control"
              placeholder="Working since"
              onChange={handleChange}
              name="author"
              value={working}
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Working Till</label>
            <input
              type="text"
              class="form-control"
              placeholder="Working Till"
              onChange={handleChange}
              name="author"
              value={workingTill}
            />
          </div>
          <div class="mb-3">
            <label class="form-label">City</label>
            <input
              type="text"
              class="form-control"
              placeholder="Working since"
              onChange={handleChange}
              name="author"
              value={city}
            />
          </div>
          <button className="btn btn-success">
            {loading ? 'loading...' : 'create'}
          </button>
        </form>
      </article>
    </section>
  );
};

export default CreatePosts;

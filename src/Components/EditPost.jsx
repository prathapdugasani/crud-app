import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useParams} from "react-router-dom";
import Axios from "../Axios";
const EditPost = () => {
  let navigate = useHistory();
  let { id } = useParams();
  let [state, setState] = useState({
    designation: '',
    company: '',
    working: '',
    workingTill: '',
    city: '',
    loading: false,
  });
  let { designation, company, working, workingTill, city, loading } = state;
  useEffect(() => {
    let fetchPosts = async () => {
      let existsData = await Axios.get(`/posts/${id}`);
      setState(existsData.data);
    };
    fetchPosts();
  }, [id]);

  let handleChange = (e) => {
    let { name, value } = e.target;
    setState({ ...state, [name]: value });
  };
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setState({ loading: true });
      let payload = {
        designation,
        company,
        working,
        workingTill,
        city,
        loading,
      };
      await Axios.put(`/posts/${id}`, payload);
      navigate("/");
    } catch (err) {}
    setState({ loading: false });
  };
  return (
    <section id="postsBlock" className="col-md-4 mx-auto bg-white p-4 mt-4">
      <article>
        <h2 className="h4 font-weight-bold text-success text-uppercase border-bottom">
          Update Post
        </h2>
        <form onSubmit={handleSubmit}>
          <div class="mb-3">
            <label class="form-label">Designation</label>
            <input
              type="text"
              class="form-control"
              placeholder="Designation"
              onChange={handleChange}
              name="title"
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
              name="author"
              value={company}
            />
          </div>
          <div class="mb-3">
            <label class="form-label">Working Since</label>
            <input
              type="text"
              class="form-control"
              placeholder="Working Since"
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
              placeholder="WorkingTill"
              onChange={handleChange}
              name="author"
              value={workingTill}
            />
          </div>
          <div class="mb-3">
            <label class="form-label"><i class="fas fa-creative-commons-by "></i></label>
            <input
              type="text"
              class="form-control"
              placeholder="city"
              onChange={handleChange}
              name="author"
              value={city}
            />
          </div>
          <button class="btn btn-success">Submit</button>
        </form>
      </article>
    </section>
  );
};

export default EditPost;

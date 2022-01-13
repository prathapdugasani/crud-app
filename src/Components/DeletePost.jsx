import React, { useState } from "react";
import { useParams} from "react-router-dom";
import Axios from "../Axios";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";

const DeletePost = () => {
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
      let deleteData = await Axios.get(`/posts/${id}`);
      setState(deleteData.data);
    };
    fetchPosts();
  }, [id]);
  let handleClick = async () => {
    await Axios.delete(`/posts/${id}`);
    navigate("/");
  };

  return (
    <div className="removeBlock">
      <aside>
        <div className="float-left">
          <h2 className="h4">
            {designation}
            <span className="text-success">{company}</span>
          </h2>
        </div>
        <div className="float-right">
          <button className="btn btn-danger" onClick={handleClick}>
            Delete
          </button>
          <button
            className="btn btn-info"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </button>
        </div>
      </aside>
    </div>
  );
};

export default DeletePost;

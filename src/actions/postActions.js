import { FETCH_USERS, NEW_USER, FETCH_REPOS, FETCH_REPOS_DATA } from './types';
import axios from 'axios';
import getLoading from "./loading";
//import gitApi from "../config"

export const fetchUsers = (data) => dispatch => {
  dispatch(getLoading(true))
  axios
    .get("https://api.github.com/search/users", {
      params: {
        q: data.value,
        page: data.page,
        per_page: data.limit
      }
    })
    .then(res => {
      dispatch(getLoading(false))
      sessionStorage.setItem("users", JSON.stringify(res.data.items));

      dispatch({
        type: FETCH_USERS,
        payload: res.data.items,
        totalCount: res.data.total_count
      })
    })
    .catch(error => error)
};

export const fetchRepos = (login) => dispatch => {
  dispatch(getLoading(true))
  axios
    .get(`https://api.github.com/users/${login}/repos`, {
      params: {
        page: 1,
        per_page: 10
      }
    })
    .then(res => {
      dispatch(getLoading(false))
      sessionStorage.setItem("repos", JSON.stringify(res.data));
      dispatch({
        type: FETCH_REPOS,
        payload: res.data,
        owner: res.data[0] ? res.data[0].owner.login : ""
      })
    })
    .catch(error => error)
};

export const fetchReposData = (id) => dispatch => {
  dispatch({
    type: FETCH_REPOS_DATA,
    payload: parseInt(id)
  })
};

export const createPost = postData => dispatch => {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify(postData)
  })
    .then(res => res.json())
    .then(post =>
      dispatch({
        type: NEW_USER,
        payload: post
      })
    );
};
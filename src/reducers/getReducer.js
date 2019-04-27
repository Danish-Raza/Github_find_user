import { FETCH_USERS, NEW_USER, FETCH_REPOS, FETCH_REPOS_DATA } from '../actions/types';

const initialState = {
  items: [],
  item: {},
  totalCount: "",
  repos: [],
  repoData: {},
  owners: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return {
        ...state,
        items: action.payload,
        totalCount: action.totalCount
      };
    case FETCH_REPOS:
      let temp = JSON.parse(sessionStorage.getItem("owners")) !== null ? JSON.parse(sessionStorage.getItem("owners")) : []
      if (!temp.includes(action.owner)) {
        temp.push(action.owner)
      }
      sessionStorage.setItem("owners", JSON.stringify(temp));
      return {
        ...state,
        repos: action.payload,
        owners: temp
      };
    case FETCH_REPOS_DATA:
      sessionStorage.setItem("repo", JSON.stringify(JSON.parse(sessionStorage.getItem("repos")).find(o => o.id === action.payload)));
      return {
        ...state,
        repoData: state.repos.find(o => o.id === action.payload)
      };
    case NEW_USER:
      return {
        ...state,
        item: action.payload,
        totalCount: action.totalCount
      };
    default:
      return state;
  }
}
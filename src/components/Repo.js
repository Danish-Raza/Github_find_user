import React, { Component } from 'react';
import { fetchReposData } from '../actions/postActions';
import { connect } from 'react-redux';
class Repo extends Component {
  state = {
    fullName: "",
    description: "",
    createdAt: "",
    updatedAt: "",
    login: ""
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.props.fetchReposData(this.props.match.params.id);
    }
  }

  getRepoDataSession = () => {
    if (JSON.parse(sessionStorage.getItem("repo"))) {
      let temp = JSON.parse(sessionStorage.getItem("repo"))
      return <div className="row">
        <div className="col s12 m6">
          <div className="card blue-grey darken-1">
            <div className="card-content white-text">
              <p>Owner name</p>
              <span className="card-title">{temp.owner.login}</span>
            </div>
            <div className="card-content white-text">
              <p>Repo name</p>
              <span className="card-title">{temp.full_name}</span>
            </div>
            <div className="card-content white-text">
              <p>Description</p>
              <span className="card-title">{temp.description}</span>
            </div>
            <div className="card-content white-text">
              <p>Created at </p>
              <span className="card-title">{temp.created_at.substring(0, 10)}</span>
            </div>
            <div className="card-content white-text">
              <p>Updated at </p>
              <span className="card-title">{temp.updated_at.substring(0, 10)}</span>
            </div>
          </div>
        </div>
      </div>
    }
  }

  render() {
    let repoDetail = this.getRepoDataSession()
    return (<div>
      {repoDetail}
    </div>)
  }
}
const mapStateToProps = state => ({
  repoData: state.users.repoData
});
export default connect(mapStateToProps, { fetchReposData })(Repo);
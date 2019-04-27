import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRepos } from '../actions/postActions';
import { NavLink } from 'react-router-dom';
import Loader from '../comman/Loader';
class User extends Component {

  componentDidMount() {
    if (this.props.match.params.login) {
      this.props.fetchRepos(this.props.match.params.login);
    }
  }
  getRepoList = () => {
    return <div>
      {this.props.repos.map((data, index) =>
        <div className="col s12 m4" key={index}>
          <NavLink to={`/user/${data.owner.login}/${data.id}`}>
            <div className="card blue-grey darken-1">
              <div className="card-content white-text">
                <p>Repo Name</p>
                <span className="card-title">{data.name}</span>
              </div>
              <div className="card-action">
                <p href={data.id} style={{ color: "white" }}>{data.language ? data.language : "---"}</p>
              </div>
            </div>
          </NavLink>
        </div>
      )}
    </div>
  }
  render() {
    let repoList = !this.props.loading.loading ?
      this.props.repos.length > 0 ? this.getRepoList()
        : <h3 className="center-align">Data not found</h3>
      : <div className="center-align">
        <Loader />
      </div>
    return (<div className="row" style={{ marginTop: 30 }}>
      {repoList}
    </div>)
  }
}
const mapStateToProps = state => ({
  repos: state.users.repos,
  loading: state.loading
});

export default connect(mapStateToProps, { fetchRepos })(User);
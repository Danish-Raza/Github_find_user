import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions/postActions';
import Card from "./Home-html";
import Tab from "./Tab";
import Loader from "../comman/Loader";
import { NavLink } from "react-router-dom";

class Home extends Component {
  state = {
    search: "",
    limit: 20,
    selectedPage: 1,
    users: []
  }

  inputChangeHandler = e => {
    this.setState({ search: e.target.value })
  }

  getUser = () => {
    if (JSON.parse(sessionStorage.getItem("users")).length > 0) {
      return <div>
        {JSON.parse(sessionStorage.getItem("users")).map((data, index) =>
          <div className="col m4 s12 " key={index} style={{ marginBottom: 20 }}>
            <Card data={data} />
          </div>)}
      </div>
    } else {
      return <h3 className="center-align">No data found</h3>
    }
  }

  submitHandler = (e) => {
    e.preventDefault()
    if (this.state.search !== "") {
      let data = {
        value: this.state.search,
        page: this.state.selectedPage,
        limit: this.state.limit
      }
      this.props.fetchUsers(data);
    }
  }
  render() {
    let userList = !this.props.loading.loading && JSON.parse(sessionStorage.getItem("users")) !== null ? this.getUser()
      : <div className="center-align">
        <Loader />
      </div>
    if (this.props.loading.loading === null && !sessionStorage.getItem("users")) {
      userList = null
    }
    return (
      <div>
        <Tab
          inputChangeHandler={this.inputChangeHandler}
          search={this.state.search}
          submitHandler={this.submitHandler}
        />
        <div className="row" style={{ marginTop: 30 }}>
          <div style={{ marginBottom: 20, marginLeft: 10 }}>
            <NavLink to={"/history"} className="btn">Search history</NavLink>
          </div>
          {userList}
        </div>
      </div>)
  }
}

const mapStateToProps = state => ({
  users: state.users.items,
  totalCount: state.users.totalCount,
  loading: state.loading
});

export default connect(mapStateToProps, { fetchUsers })(Home);
import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { toast } from 'react-toastify'

class Form extends Component {
  state = {
    userName: "",
    isEdit: false
  }

  componentDidMount() {
    if (this.props.match.params.id) {
      this.setState({
        userName: this.props.match.params.id,
        isEdit: true
      })
    }
  }

  inputChangeHandler = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  submitHandler = e => {
    e.preventDefault()
    if (this.state.userName.length > 0) {
      if (this.state.isEdit) {
        let owners = JSON.parse(sessionStorage.getItem("owners"))
        let index = owners.indexOf(this.props.match.params.id)
        if (!owners.includes(this.state.userName)) {
          owners.splice(index, 1)
          owners.splice(index, 0, this.state.userName)
        }
        sessionStorage.setItem("owners", JSON.stringify(owners))
        toast.success("Edited Successfully")
        this.props.history.push("/history")
      } else {
        let owners = JSON.parse(sessionStorage.getItem("owners")) !== null ? JSON.parse(sessionStorage.getItem("owners")) : []
        if (!owners.includes(this.state.userName)) {
          owners.push(this.state.userName)
        }
        sessionStorage.setItem("owners", JSON.stringify(owners))
        toast.success("Created Successfully")
        this.props.history.push("/history")
      }
    } else {
      this.props.history.push("/history")
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col m6 s12 center-align">
          <form onSubmit={this.submitHandler}
            autoComplete="off"
            style={{ margin: 30 }}
          >
            <h3>{this.state.isEdit ? "Edit User Name" : "Add User"}</h3>
            <label>UserName</label><br />
            <input
              name="userName"
              value={this.state.userName}
              onChange={this.inputChangeHandler}
              placeholder={"User Name"}
            />
            <button type="submit" className="btn" style={{ marginLeft: 10 }}>Save</button>
          </form>
        </div>
      </div>
    )
  }
}
export default withRouter(Form);
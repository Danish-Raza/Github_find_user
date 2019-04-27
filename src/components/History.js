import React, { Component } from 'react';
import HistoryPage from './History-html';
import { connect } from 'react-redux';
import { toast } from 'react-toastify';

class History extends Component {
  state = {
    owners: []
  }

  componentDidMount() {
    this.setValue()
  }
  setValue = () => {
    this.setState({ owners: JSON.parse(sessionStorage.getItem("owners")) })
  }

  removeHandler = (data) => {
    let owners = JSON.parse(sessionStorage.getItem("owners"))
    let index = owners.indexOf(data)
    owners.splice(index, 1)
    sessionStorage.setItem("owners", JSON.stringify(owners))
    toast.success("Removed Successfully")
    this.setValue()
  }

  render() {
    return (<div><HistoryPage owners={this.state.owners} removeHandler={this.removeHandler} /></div>)
  }
}
const mapStateToProps = state => ({
  owners: state.users.owners,
});

export default connect(mapStateToProps)(History);
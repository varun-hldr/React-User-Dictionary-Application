import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as Action from "../actionsFiles/apiActions";
import userImg from "./img/user.jpg";
import "./css/Userbook.css";

class AddUser extends Component {
  state = {
    userData: {},
    userAdded: false,
  };
  onChangeEditHandler = (e) => {
    if (!this.state.userAdded) {
      this.setState({
        userData: {
          ...this.state.userData,
          [e.target.name]: e.target.value,
        },
      });
    }
  };

  onUserAction = () => {
    let userData = this.state.userData;
    let today = new Date();
    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();
    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    userData = { ...userData, "Created at": date + "T" + time };
    Action.postUser(userData);
    this.setState({
      userAdded: true,
    });
  };

  render() {
    if (this.state.userAdded) {
      return <Redirect to="/" />;
    }

    return (
      <div className="user-book">
        <div className="add-user bg-light d-flex flex-wrap justify-content-evenly overflow-auto">
          <div className="user">
            <div className="d-flex">
              <img src={userImg} alt="user" />
              <div className="user-details">
                <h6>
                  <b>Name: </b>
                  <input name="Full Name" onChange={this.onChangeEditHandler} />
                </h6>
                <h6>
                  <b>Email: </b>
                  <input name="Email" onChange={this.onChangeEditHandler} />
                </h6>
                <h6>
                  <b>Date of birth: </b>
                  <input
                    type="date"
                    name="Date of birth"
                    onChange={this.onChangeEditHandler}
                  />
                </h6>
                <h6>
                  <b>Country: </b>
                  <input name="Country" onChange={this.onChangeEditHandler} />
                </h6>
              </div>
            </div>
            <div className="user-action d-flex justify-content-between">
              <div></div>
              <div>
                <button
                  className="edit"
                  name="update"
                  onClick={this.onUserAction}
                >
                  Add User
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(AddUser);

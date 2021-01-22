import React, { Component } from "react";
import { connect } from "react-redux";
import * as action from "../actionsFiles/apiActions";
import * as UserAction from "../actionsFiles/userAction";
import Loader from "./Loader/Loader";
import "./css/Userbook.css";

class Usersbook extends Component {
  state = {
    inputText: null,
    users: [],
    text: null,
    editUser: false,
    editData: {},
    filterValues: {
      DOB: null,
      Country: null,
    },
  };

  render() {
    return (
      <div>
        {!this.props.isLoaded ? (
          <Loader />
        ) : (
          <div className="user-book">
            <div className="d-flex search">
              <div className="search-box d-flex justify-content-between">
                <input
                  className="search-input bg-light"
                  type="search"
                  placeholder="Enter user name"
                  aria-label="Search"
                  onChange={(e) => this.setState({ inputText: e.target.value })}
                />
                <button
                  onClick={this.onClickHandler}
                  className="search-btn bg-dark"
                >
                  FIND USER
                </button>
              </div>
            </div>
            <div className="user-list bg-light">
              <UserAction.makeDropDown
                users={this.state.users}
                onChangeFilterHandler={this.onChangeFilterHandler}
                onClickFilterHandler={this.onClickFilterHandler}
              />
              {!this.state.editUser ? (
                this.state.users.length !== 0 ? (
                  <div className="user-book-cards d-flex flex-wrap justify-content-evenly overflow-auto">
                    {this.state.users.map((user) => (
                      <UserAction.makeUserCards
                        user={user}
                        onUserAction={this.onUserAction}
                      />
                    ))}
                  </div>
                ) : (
                  <h3 className="text-center mt-5">{this.state.text}</h3>
                )
              ) : (
                <div className="user-book-cards d-flex flex-wrap justify-content-evenly overflow-auto">
                  <UserAction.makeEditCard
                    user={this.state.editUser}
                    onChangeEditHandler={this.onChangeEditHandler}
                    onUserAction={this.onUserAction}
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  componentDidMount() {
    const { match, isLoaded } = this.props;
    if (!isLoaded) {
      this.props.dispatch(action.getUsers(match.params.id));
    }
  }

  onChangeEditHandler = (e) => {
    this.setState({
      editData: { ...this.state.editData, [e.target.name]: e.target.value },
    });
  };

  onUserAction = (e, user) => {
    if (e.target.name === "del") {
      action.deleteUser(user.id);
      const updatedUsers = this.state.users.filter(
        (value) => value.id !== user.id
      );
      this.props.dispatch({
        type: "USERS",
        payload: updatedUsers,
      });
      this.setState({
        ...this.state,
        users: updatedUsers,
      });
    }
    if (e.target.name === "edit") {
      this.setState({
        ...this.state,
        editUser: user,
      });
    }
    if (e.target.name === "update") {
      action.updateUser(this.state.editData, user.id);
      let userData = this.state.editData;
      userData = { ...userData, id: user.id };
      let index = this.state.users.findIndex((value) => value.id === user.id);
      let updatedUsers = this.state.users;
      updatedUsers[index] = userData;
      this.props.dispatch({
        type: "USERS",
        payload: updatedUsers,
      });
      this.setState({ ...this.state, editUser: false, users: [userData] });
    }
  };

  onClickHandler = () => {
    if (this.state.inputText !== null && this.state.inputText.length >= 3) {
      const name =
        this.state.inputText.charAt(0).toUpperCase() +
        this.state.inputText.slice(1);
      let data = this.props.users.filter((user) =>
        user["Full Name"].includes(name)
      );
      this.setState({
        ...this.state,
        users: data,
      });
      if (data.length === 0) {
        this.setState({
          ...this.state,
          text: "Not Found",
          users: [],
        });
      }
    } else {
      this.setState({
        ...this.state,
        text: "Not Found",
        users: [],
      });
    }
  };
  onClickFilterHandler = () => {
    const filter = this.state.filterValues;
    let filterUser = [];
    if (filter.DOB !== null) {
      filterUser = this.state.users.filter(
        (user) => user["Date of birth"].substring(0, 10) === filter.DOB
      );
    }
    if (filter.Country !== null) {
      filterUser = this.state.users.filter(
        (user) => user.Country === filter.Country
      );
    }

    console.log(filterUser);

    if (filterUser.length !== 0) {
      this.setState({
        ...this.state,
        users: filterUser,
        filterValues: {
          DOB: null,
          Country: null,
        },
      });
    } else {
      this.setState({
        ...this.state,
        text: "Not Found",
        users: [],
        filterValues: {
          DOB: null,
          Country: null,
        },
      });
    }
  };

  onChangeFilterHandler = (e, country) => {
    if (e.target.name === "Country") {
      this.setState({
        filterValues: {
          ...this.state.filterValues,
          [e.target.name]: country,
        },
      });
    }
    if (e.target.name === "DOB") {
      this.setState({
        filterValues: {
          ...this.state.filterValues,
          [e.target.name]: e.target.value,
        },
      });
    }
  };
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Usersbook);

import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import * as action from "../actionsFiles/apiActions";
import * as UserAction from "../actionsFiles/userAction";
import "./css/Home.css";

class Home extends Component {
  state = {
    check: false,
    bookId: null,
  };

  componentDidMount() {
    if (this.props.isLoaded) {
      this.props.dispatch(action.setLoaded(false));
    }
  }

  render() {
    if (this.state.check) {
      return <Redirect to={`/book/${this.state.bookId}`} />;
    }
    return (
      <div className="d-flex flex-wrap justify-content-evenly home">
        <UserAction.makeBooks onClickHandler={this.onClickHandler} />
      </div>
    );
  }

  onClickHandler = (page) => {
    this.props.dispatch(action.getUsers(page));
    this.setState({
      check: true,
      bookId: page,
    });
  };
}

function mapStateToProps(state) {
  return state;
}

export default connect(mapStateToProps)(Home);

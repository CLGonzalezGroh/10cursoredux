import React, { Component } from "react";
import { connect } from "react-redux";
import * as usersActions from "../../actions/usersActions";
import * as publicationsActions from "../../actions/publicationsActions";

class Publications extends Component {
  componentDidMount() {
    if (!this.props.usersReducer.users.length) {
      this.props.getAllUsers();
    }
  }

  render() {
    console.log(this.props);
    return (
      <div>
        <h1>Publication from</h1>
        {this.props.match.params.key}
      </div>
    );
  }
}

const mapStateToProps = ({ usersReducer, publicationsReducer }) => {
  return { usersReducer, publicationsReducer };
};
const mapDispatchToProps = {
  ...usersActions,
  ...publicationsActions,
};
export default connect(mapStateToProps, mapDispatchToProps)(Publications);
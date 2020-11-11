import React, { Component } from "react";
import axios from "axios";
import { connect } from "react-redux";

class Users extends Component {
  // async componentDidMount() {
  //   let response = await axios.get(
  //     "https://jsonplaceholder.typicode.com/users"
  //   );
  //   this.setState({ users: response.data });
  // }

  putFiles = () =>
    this.props.users.map((user) => (
      <tr key={user.id}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.website}</td>
      </tr>
    ));

  render() {
    console.log(this.props);
    return (
      <div>
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Website</th>
            </tr>
          </thead>
          <tbody>{this.putFiles()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usersReducer;
};

export default connect(mapStateToProps, {})(Users);

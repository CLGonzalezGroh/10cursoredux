import React, { Component } from "react";

class SaveTask extends Component {
  render() {
    return (
      <div>
        <h1>Save Task</h1>
        <label htmlFor="user">User id: </label>
        <input id="user" type="number" />
        <br />
        <br />
        <label htmlFor="title">Title: </label>
        <input id="title" />
        <br />
        <br />
        <button>Save</button>
      </div>
    );
  }
}

export default SaveTask;

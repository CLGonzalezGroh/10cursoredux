import React, { Component } from "react";
import { connect } from "react-redux";
import * as tasksActions from "../../actions/tasksActions";
import Fatal from "../General/Fatal";
import Spinner from "../General/Spinner";

class Tasks extends Component {
  componentDidMount() {
    this.props.getAllTasks();
  }

  insertTasks = (user_id) => {
    const { tasks } = this.props;
    const userTasks = { ...tasks[user_id] };

    return Object.keys(userTasks).map((t_id) => (
      <div key={t_id}>
        <input type="checkbox" defaultChecked={userTasks[t_id].completed} />
        {userTasks[t_id].title}
      </div>
    ));
  };

  showContent = () => {
    const { tasks, loading, error } = this.props;

    if (error) {
      return <Fatal message={error} />;
    }
    if (loading) {
      return <Spinner />;
    }
    return Object.keys(tasks).map((user_id) => (
      <div key={user_id}>
        <h2>User {user_id}</h2>
        <div className="container_tasks">{this.insertTasks(user_id)}</div>
      </div>
    ));
  };

  render() {
    console.log(this.props);
    return <div>{this.showContent()}</div>;
  }
}

const mapStateToProps = ({ tasksReducer }) => tasksReducer;

export default connect(mapStateToProps, tasksActions)(Tasks);

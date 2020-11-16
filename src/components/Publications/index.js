import React, { Component } from "react";
import { connect } from "react-redux";
import * as usersActions from "../../actions/usersActions";
import * as publicationsActions from "../../actions/publicationsActions";
import Spinner from "../General/Spinner";
import Fatal from "../General/Fatal";
import Comments from "./Comments";

class Publications extends Component {
  async componentDidMount() {
    const {
      getAllUsers,
      getByUserPublications,
      match: {
        params: { key },
      },
    } = this.props;

    if (!this.props.usersReducer.users.length) {
      await getAllUsers();
    }
    if (this.props.usersReducer.error) {
      return;
    }
    if (!("publications_key" in this.props.usersReducer.users[key])) {
      getByUserPublications(key);
    }
  }
  insertUser = () => {
    const {
      usersReducer,
      match: {
        params: { key },
      },
    } = this.props;
    if (usersReducer.error) {
      return <Fatal message={usersReducer.error} />;
    }

    if (!usersReducer.users.length || usersReducer.loading) {
      return <Spinner />;
    }
    const name = usersReducer.users[key].name;
    return <h1>Publication from {name}</h1>;
  };

  insertPublications = () => {
    const {
      usersReducer,
      usersReducer: { users },
      publicationsReducer,
      publicationsReducer: { publications },
      match: {
        params: { key },
      },
    } = this.props;

    if (!users.length) return;
    if (usersReducer.error) return;
    if (publicationsReducer.loading) {
      return <Spinner />;
    }
    if (publicationsReducer.error) {
      return <Fatal message={publicationsReducer.error} />;
    }
    if (!publications.length) return;
    if (!("publications_key" in users[key])) return;

    const { publications_key } = users[key];

    return this.showPublications(
      publications[publications_key],
      publications_key
    );
  };

  showPublications = (userPublications, pub_key) =>
    userPublications.map((post, com_key) => (
      <div
        key={post.id}
        className="pub_title"
        onClick={() => this.showComments(pub_key, com_key, post.comments)}
      >
        <h2>{post.title}</h2>
        <h3>{post.body}</h3>
        {post.open ? <Comments comments={post.comments} /> : ""}
      </div>
    ));

  showComments = (pub_key, com_key, comments) => {
    this.props.openClose(pub_key, com_key);
    if (!comments.length) {
      this.props.getComments(pub_key, com_key);
    }
  };

  render() {
    return (
      <div>
        {this.insertUser()}
        {this.insertPublications()}
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

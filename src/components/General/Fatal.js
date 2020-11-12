import React from "react";

const Fatal = (props) => (
  <div className="center red">
    <h2>{props.message[0]}</h2>
    <h3>{props.message[1]}</h3>
  </div>
);

export default Fatal;

import React from "react";
// import { FaTrash } from "react-icons/fa";
import ThemeContext from "../contexts/ThemeContext";

export default class TaskItem extends React.Component {
  constructor(props) {
    super(props);
    this.id = props.task.id;
    this.name = props.task.name;
    this.done = props.task.done;
  }

  render() {
    this.done = this.props.task.done;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: 215,
          margin: "10px auto 0 auto",
        }}
        className={this.done ? "checked" : ""}
      >
        <div>
          <input
            onChange={() => this.props.onTaskToggle(this.id)}
            checked={this.done}
            type="checkbox"
          />
          <span style={{ color: this.context }}>{this.name}</span>
        </div>
        <button onClick={() => {
          this.props.onTaskDelete(this.id)
        }} >X</button>
      </div>
    );
  }
}

TaskItem.contextType = ThemeContext;
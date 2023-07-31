import React, { Component } from "react";
import { InputText } from "primereact/inputtext";

class NewTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      editedDescription: props.description,
    };
  }

  handleEditDescription = () => {
    this.setState((prevState) => ({
      isEditing: !prevState.isEditing,
    }));
  };

  handleDescriptionChange = (e) => {
    this.setState({ editedDescription: e.target.value });
  };

  handleSaveDescription = () => {
    const { editedDescription } = this.state;
    const { onUpdateDescription } = this.props;
    onUpdateDescription(editedDescription);
    this.setState({ isEditing: false });
  };
  handleStopTask = () => {
    const { timer, description, date } = this.props;
    this.props.onStop({ timer, description, date });
  };

  render() {
    const { timer, description, onDelete } = this.props;
    const { isEditing, editedDescription } = this.state;

    return (
      <div>
        <div className="time">{timer}</div>
        {isEditing ? (
          <span className="p-input-icon-right">
            <i
              className="pi pi-check-circle"
              onClick={this.handleSaveDescription}
              style={{ fontSize: "24px" }}
            />
            <InputText
              className="editdesc"
              placeholder="Enter new description"
              value={editedDescription}
              onChange={this.handleDescriptionChange}
            />
          </span>
        ) : (
          <div className="description">{description}</div>
        )}
        <div className="icons">
          <i
            title="Pause/continue"
            className="pi pi-pause pi-icon-hover"
            style={{ fontSize: "24px", color: "#FF5722" }}
          ></i>
          <i
            onClick={this.handleStopTask}
            title="Stop"
            className="pi pi-stop-circle pi-icon-hover"
            style={{ fontSize: "24px", color: "#5F6B8A" }}
          ></i>
          <i
            title="Edit description"
            className="pi pi-pencil pi-icon-hover"
            style={{
              fontSize: "24px",
              color: isEditing ? "#11ad33" : "#5F6B8A",
            }}
            onClick={this.handleEditDescription}
          ></i>
          <i
            title="Delete"
            onClick={onDelete}
            className="pi pi-trash pi-icon-hover"
            style={{ fontSize: "24px", color: "#5F6B8A" }}
          ></i>
        </div>
      </div>
    );
  }
}
export default NewTask;
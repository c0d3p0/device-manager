import { IState } from "./DeviceForm";
import "./DeviceForm.css"


export default function DeviceFormView(props: IProps)
{
  if(props.editMode && !props.state.message)
  {
    return (
      <div className="device-form">
        <div className="back-action">
          <button
            className="round-button"
            type="button"
            title="Go Back"
            onClick={(e) => {props.onReturnClick();}}
          >
            👈
          </button>
        </div>
        <div className="box">
          <h2>{`${props.state.isEditing ? "Update" : "New"} Device`}</h2>
          <form onSubmit={(e) => {e.preventDefault(); props.onSubmit()}}>
            <div className="field">
              <label>Name: </label>
              <input
                className="textfield"
                type="text"
                placeholder="Device Name"
                value={props.state.name ?? ""}
                onChange={(e) => {props.updateState("name", e.target.value)}}
                />
            </div>
            <div className="field">
              <label>Hardware Version: </label>
              <input
                className="textfield"
                type="text"
                placeholder="Hardware Version"
                value={props.state.hardwareVersion ?? ""}
                onChange={(e) => {props.updateState("hardwareVersion", e.target.value)}}
              />
            </div>
            <div className="form-actions">
              <button className="button" type="submit">Confirm</button>
            </div>
          </form>
        </div>
      </div>
    );
  }
  else
  {
    return (
      <div className="device-form">
        <div className="back-action">
          <button
            className="round-button"
            type="button"
            title="Go Back"
            onClick={(e) => {props.onReturnClick();}}
          >
            👈
          </button>
        </div>
        <div className="box">
          <h2>Device Form</h2>
          <span className="message">{props.state.message}</span>
        </div>
      </div>
    );
  }
}


interface IProps
{
  editMode: boolean;
  state: IState;
  onSubmit(): void;
  onReturnClick(): void;
  updateState(type: string, value: any): void;
}
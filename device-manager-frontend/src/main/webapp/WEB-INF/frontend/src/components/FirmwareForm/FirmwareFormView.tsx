import { IState } from "./FirmwareForm";

import "./FirmwareForm.css"


export default function FirmwareFormView(props: IProps)
{
  if(props.editMode && !props.state.message)
  {
    return (
      <div className="firmware-form">
        <div className="back-action">
          <button
            className="round-button"
            type="button"
            title="Go Back"
            onClick={(e) => {props?.onReturnClick();}}
          >
            👈
          </button>
        </div>
        <div className="box">
        <h2>{`${props.state.isEditing ? "Update" : "New"} Firmware`}</h2>
          <form onSubmit={(e) => {e.preventDefault(); props?.onSubmit()}}>
            <div className="field">
              <label>Name: </label>
              <input
                id="name-field"
                className="textfield"
                type="text"
                placeholder="Firmware Name"
                value={props.state.name ?? ""}
                onChange={(e) => {props?.updateState("name", e.target.value);}}
              />
            </div>
            <div className="field">
              <label>Binary: </label>
              <label className="button" htmlFor="binary-file">Read File</label>
              <input
                id="binary-file"
                className="textfield"
                type="file"
                onChange={(e) => {props?.onReadBinaryClick(e.target?.files?.item(0))}}
              />
              {props.state.readingBinary ? (<span>Reading binary...</span>) : null}
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
      <div className="firmware-form">
        <div className="back-action">
          <button
            className="round-button"
            type="button"
            title="Go Back"
            onClick={(e) => {props?.onReturnClick();}}
          >
            👈
          </button>
        </div>
        <div className="box">
          <h2>Firmware Form</h2>
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
  onReadBinaryClick(file?: File | null): void;
  onSubmit(): void;
  onReturnClick(): void;
  updateState(type: string, value: any): void;
}
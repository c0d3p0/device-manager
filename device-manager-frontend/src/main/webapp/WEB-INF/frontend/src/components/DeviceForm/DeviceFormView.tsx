import "./DeviceForm.css"


export default function DeviceFormView(props: IProps)
{
  const {editMode, formType, title, apiAction, state} = props;

  
  if(editMode && formType && !state?.error)
  {
    return (
      <div className="device-form">
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
          <h2>{title}</h2>
          <form onSubmit={(e) => {e.preventDefault(); props?.onSubmit()}}>
            <div className="field">
              <label>Name: </label>
              <input
                className="textfield"
                type="text"
                placeholder="Device Name"
                value={state.name ? state.name : ""}
                onChange={(e) => {props?.updateState("name", e.target.value)}}
                />
            </div>
            <div className="field">
              <label>Hardware Version: </label>
              <input
                className="textfield"
                type="text"
                placeholder="Hardware Version"
                value={state.hardwareVersion ? state.hardwareVersion : ""}
                onChange={(e) => {props?.updateState("hardwareVersion", e.target.value)}}
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
    let m =
    [
      "Couldn't get the device data to edit!",
      "Invalid operation, it must be a save or an update!",
      "You don't have permission to change any data!"
    ];
    let message = state?.error ? m[0] : (editMode ? m[1] : m[2]);
    console.log(apiAction);
    console.log(message);

    return (
      <div className="device-form">
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
          <h2>Device Form</h2>
          <span className="message">{message}</span>
        </div>
      </div>
    );
  }
}


interface IProps
{
  editMode: boolean;
  apiAction: any;
  formType: string | undefined;
  title: string;
  state: any;
  onSubmit(): void;
  onReturnClick(): void;
  updateState(type: string, value: any): void;
}
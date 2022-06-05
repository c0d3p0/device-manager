import "./FirmwareForm.css"


export default function FirmwareFormView(props: IProps)
{
  const {editMode, formType, title, apiAction, state} = props;


  if(editMode && formType && !state?.error)
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
          <h2>{title}</h2>
          <form onSubmit={(e) => {e.preventDefault(); props?.onSubmit()}}>
            <div className="field">
              <label>Name: </label>
              <input
                id="name-field"
                className="textfield"
                type="text"
                placeholder="Firmware Name"
                value={state?.name ? state.name : ""}
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
              {state?.readingBinary ? (<span>Reading binary...</span>) : null}
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
      "Couldn't get the firmware data to edit!",
      "Invalid operation, it must be a save or an update!",
      "You don't have permission to change any data!"
    ];
    let message = state?.error ? m[0] : (editMode ? m[1] : m[2]);
    console.log(apiAction);
    console.log(message);

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
  onReadBinaryClick(file?: File | null): void;
  onSubmit(): void;
  onReturnClick(): void;
  updateState(type: string, value: any): void;
}
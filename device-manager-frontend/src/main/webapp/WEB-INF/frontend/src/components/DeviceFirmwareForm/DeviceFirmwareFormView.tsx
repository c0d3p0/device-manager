import Device from "../../model/Device";
import Firmware from "../../model/Firmware";

import "./DeviceFirmwareForm.css"


export default function DeviceFirmwareFormView(props: IProps)
{
  const {editMode, apiAction, state} = props;
  const deviceOptionElements = createDeviceOptionElements(props);
  const firmwareOptionElements = createFirmwareOptionElements(props);
  const deviceToDetachElements = createDeviceToDetachElements(props);


  if(editMode && !state?.error)
  {
    return (
      <div className="device-firmware-form">
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
          <h2>Attach Firmware to Devices</h2>
          <form
            onSubmit={(e) => {e.preventDefault(); props?.onSubmit()}}
          >
            <div className="field">
              <label>Firmware: </label>
              <select
                className="button"
                value={state?.firmwareId ? state?.firmwareId : "-1"}
                onChange={(e) => props?.updateState("firmwareId", e.target.value)}
              >
                <option value="-1">Select a firmware</option>
                {firmwareOptionElements}
              </select>
            </div>
            <div className="field">
              <label>Device: </label>
              <select
                className="button"
                value=""
                onChange={(e) => props?.attachDevice(e.target.value)}
              >
                <option value="-1">Select a device</option>
                {deviceOptionElements}
              </select>
            </div>
            <div className="item-list">
              <h3>Devices to Attach</h3>
              <div className="item-list-items">
                {deviceToDetachElements}
              </div>
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
    let m = editMode ? state?.error : "You don't have permission to change any data!";
    console.log(apiAction);
    console.log(m);

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
          <h2>Attach Firmware to Devices</h2>
          <span className="message">{m}</span>
        </div>
      </div>
    );
  }
}


const createDeviceOptionElements = (props: IProps) =>
{
  const elements: JSX.Element[] = [];
  props?.state?.deviceMap?.forEach((v: Device, k: number) => {
    elements.push(<option key={v.id} value={v.id}>{v.name}</option>);
  });
  return elements;
}

const createFirmwareOptionElements = (props: IProps) =>
{
  const elements: JSX.Element[] = [];
  props?.state?.firmwares?.forEach((f: Firmware) => {
    elements.push(<option key={f.id} value={f.id}>{f.name}</option>);
  });
  return elements;
}

const createDeviceToDetachElements = (props: IProps) =>
{
  const {state, detachDevice} = props;
  const elements: JSX.Element[] = [];
  state?.deviceIds?.forEach((id: number) => {
    const device = state?.deviceMap?.get(id);

    if(device)
    {
      elements.push(
        <button
          className="button"
          key={device?.id}
          title="Detach Device"
          onClick={(e) => {e.preventDefault(); detachDevice(device?.id);}}
        >
          {device?.name}
        </button>
      );
    }
  });
  return elements;
}


interface IProps
{
  editMode: boolean;
  apiAction: any;
  state: any;
  attachDevice(idText: string): void;
  detachDevice(id: number): void;
  onSubmit(): void;
  onReturnClick(): void;
  updateState(type: string, value: any): void
}
import { IState } from "./DeviceFirmwareForm";

import "./DeviceFirmwareForm.css"


export default function DeviceFirmwareFormView(props: IProps)
{
  if(props.editMode && !props.state.message)
  {
    const deviceOptionElements = createDeviceOptionElements(props);
    const firmwareOptionElements = createFirmwareOptionElements(props);
    const deviceToDetachElements = createDeviceToDetachElements(props);

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
                value={props.state.firmwareId ?? "-1"}
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
          <span className="message">{props.state.message}</span>
        </div>
      </div>
    );
  }
}


const createDeviceOptionElements = (props: IProps) =>
{
  const elements: JSX.Element[] = [];
  props?.state?.deviceMap?.forEach((v, k) => {
    elements.push(<option key={v.id} value={v.id}>{v.name}</option>);
  });
  return elements;
}

const createFirmwareOptionElements = (props: IProps) =>
{
  return props?.state?.firmwares?.map((f) =>
    <option key={f.id} value={f.id}>{f.name}</option>
  );
}

const createDeviceToDetachElements = (props: IProps) =>
{
  const elements: JSX.Element[] = [];
  props.state.deviceIds?.forEach((id, index) => {
    const device = props.state.deviceMap.get(id);
    const vId = device?.id ?? -1;

    if(device && vId > -1)
    {
      elements.push(
        <button
          className="button"
          key={index}
          title="Detach Device"
          onClick={(e) => {e.preventDefault(); props.detachDevice(vId);}}
        >
          {device.name}
        </button>
      );
    }
  });
  return elements;
}


interface IProps
{
  editMode: boolean;
  state: IState;
  attachDevice(idText: string): void;
  detachDevice(id: number): void;
  onSubmit(): void;
  onReturnClick(): void;
  updateState(type: string, value: any): void
}
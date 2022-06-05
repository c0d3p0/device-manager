import Search from '../Search/Search'
import Device from '../../model/Device';
import DeviceFirmware from '../../model/DeviceFirmware';

import "./DeviceList.css"


// 🗈 ✍
export default function DeviceListView(props: IProps)
{
  const addDeviceButton = createAddDeviceElement(props);
  const listElements = createDeviceListElements(props);


  return (
    <div className="device-list">
      <div className="box">
        <h2>Device List</h2>
        <Search />
        <div className='edit-actions'>{addDeviceButton}</div>
      </div>
      {listElements}
      {createMessageElement(props?.message)}
    </div>
  );
}


const createAddDeviceElement = (props: IProps) =>
{
  return props?.editMode ? (
    <button
      className='round-button add-button'
      title="Add New Device"
      onClick={(e) => props?.onAddClick()}
    >
      ✎
    </button>
  ) : null;
}

const createDeviceListElements = (props: IProps) =>
{
  const elements: JSX.Element[] = [];
  props?.deviceData?.forEach((device: Device) =>
  {
    elements.push(createDeviceElement(props, device));
  });
  return elements;
}

const createDeviceElement = (props: IProps, device: Device) =>
{
  const id = device?.id;
  const editElements = createDeviceEditElements(props, device);
  const firmwareElement = createCurrentFirmwareElement(props, device);
  const historyElement = createDeviceHistoryElement(props, device);

  return (
    <div key={id} className="device-item box">
      <h2>{device?.name}</h2>
      <div className="main-data">
        <div>
          <label>Id: </label>
          <span>{id}</span>
        </div>
        <div>
          <label>Name: </label>
          <span>{device?.name}</span>
        </div>
        <div>
          <label>Hardware Version: </label>
          <span>{device?.hardwareVersion}</span>
        </div>
        {firmwareElement}
      </div>
      {historyElement}
      {editElements}
    </div>
  );
}

const createDeviceEditElements = (props: IProps, device: Device) =>
{
  const id = device?.id;
  return props?.editMode ? (
    <div className="edit-actions">
      <button
        className="round-button"
        title="Show History"
        onClick={(e) => {props?.onShowHistoryClick(id);}}
      >
        🕙
      </button>
      <button
        className="round-button"
        title="Attach Firmware"
        onClick={(e) => {props?.onAttachFirmwareClick(id);}}
      >
        🖇
      </button>
      <button
        className="round-button"
        title="Edit Device"
        onClick={(e) => {props?.onEditClick(id);}}
      >
        🗒
      </button>
      <button
        className="round-button"
        title="Remove Device"
        onClick={(e) => {props?.onRemoveClick(device);}}
      >
        🗑
      </button>
    </div>
  ) : null;
}

const createCurrentFirmwareElement = (props: IProps, device: Device) =>
{
  if(device?.currentFirmware?.id ? true : false)
  {
    const id = device?.id;
    const apiAction = props?.apiActionMap.get("device-download-firmware");
    let link = apiAction?.url;
    link = link ? `${link}/${(id ? id : -1).toString()}` : "";

    return (
      <div>
        <label>Current Firmware: </label>
        <span>{device?.currentFirmware?.name}</span>
        <a className="link" href={link}>Download Binary</a>
      </div> 
    )
  }
  
  return null;
}

const createDeviceHistoryElement = (props: IProps, device: Device) =>
{
  if((device?.deviceFirmwareList?.length ?? -1) > 0)
  {
    const dfList = device?.deviceFirmwareList;
    const listRowElements = createDeviceHistoryRowElements(props, dfList);

    return (
      <div className="item-list">
        <h3>Firmware Attached History</h3>
        <div className="item-list-content">
          <div className="item-list-row">
            <span>ID</span>
            <span>Name</span>
            <span>Association Date</span>
            <span>Binary</span>
          </div>
          {listRowElements}
        </div>
      </div>
    );
  }

  return null;
}

const createDeviceHistoryRowElements = (props: IProps, deviceFirmwareList?: DeviceFirmware[]) =>
{
  const elements: JSX.Element[] = [];
  const apiAction = props?.apiActionMap.get("firmware-download");
  const baseLink = apiAction?.url;

  deviceFirmwareList?.forEach((df: DeviceFirmware) =>
  {
    const id = df?.firmware?.id?.toString() ?? "N/A";
    const name = df?.firmware?.name ?? "N/A";
    const associationTime = df?.associationTime ?? "N/A";
    const link = baseLink ? `${baseLink}/${(id ? id : -1).toString()}` : "";
    elements.push((
      <div className="item-list-row">
        <span title={id}>{id}</span>
        <span title={name}>{name}</span>
        <span title={associationTime}>{associationTime}</span>
        <a className="link" href={link}>Download</a>
      </div>
    ));
  });
  return elements;
}

const createMessageElement = (message: string) =>
{
  if(message)
  {
    return (
      <div className="message-item box">
        <label>{message}</label>
      </div>
    );
  }

  return null;
}


interface IProps
{
  apiActionMap: Map<string, any>;
  editMode: boolean;
  deviceData: Device[];
  message: string;
  onAddClick(): void;
  onShowHistoryClick(id?: number): void;
  onAttachFirmwareClick(id?: number): void;
  onEditClick(id?: number): void;
  onRemoveClick(device: Device): void;
}
import Firmware from '../../model/Firmware';
import Search from '../Search/Search'

import "./FirmwareList.css"


export default function FirmwareListView(props: IProps)
{
  const addFirmwareButton = createAddFirmwareElement(props);
  const listElements = createFirmwareListElements(props);


  return (
    <div className="firmware-list">
      <div className="box">
        <h2>Firmware List</h2>
        <Search />
        <div className='edit-actions'>{addFirmwareButton}</div>
      </div>
      {listElements}
      {createMessageElement(props?.message)}
    </div>
  );
}


const createAddFirmwareElement = (props: IProps) =>
{
  return props?.editMode ? (
    <button
      className='round-button add-button'
      title="Add New Firmware"
      onClick={(e) => props?.onAddClick()}
    >
      ✎
    </button>
  ) : null;
}

const createFirmwareListElements = (props: IProps) =>
{
  const elements: JSX.Element[] = [];
  props?.firmwareData?.forEach((firmware: Firmware) =>
  {
    elements.push(createFirmwareElement(props, firmware));
  });
  return elements;
}

const createFirmwareElement = (props: IProps, firmware: Firmware) =>
{
  const id = firmware?.id;
  const editElements = createFirmwareEditElements(props, firmware);
  const apiAction = props?.apiActionMap?.get("firmware-download");
  let link = apiAction?.url;
  link = link ? `${link}/${(id ? id : -1).toString()}` : "";

  return (
    <div key={id} className="firmware-item box">
      <h2>{firmware?.name}</h2>
      <div className="main-data">
        <div>
          <label>Id: </label>
          <span>{id}</span>
        </div>
        <div>
          <label>Name: </label>
          <span>{firmware?.name}</span>
        </div>
        <div>
          <label>Binary: </label>
          <a className="link" href={link}>Download</a>
        </div>
      </div>
      {editElements}
    </div>
  );
}

const createFirmwareEditElements = (props: IProps, firmware: Firmware) =>
{
  const id = firmware?.id;
  return props?.editMode ? (
    <div className="edit-actions">
      <button
        className="round-button"
        title="Attach Firmware"
        onClick={(e) => {props?.onAttachToDevicesClick(id);}}
      >
        🖇
      </button>
      <button
        className="round-button"
        title="Edit Firmware"
        onClick={(e) => {props?.onEditClick(id);}}
      >
        🗒
      </button>
      <button
        className="round-button"
        title="Remove Firmware"
        onClick={(e) => {props?.onRemoveClick(firmware);}}
      >
        🗑
      </button>
    </div>
  ) : null;
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
  firmwareData: Firmware[];
  message: string;
  onAddClick(): void;
  onAttachToDevicesClick(id?: number): void;
  onEditClick(id?: number): void;
  onRemoveClick(firmware: Firmware): void;
}
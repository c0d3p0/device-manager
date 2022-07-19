import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import apiActionMap from "../../data/ApiActionMap";
import appService from "../../service/AppService";
import Device from "../../model/Device";
import Firmware from "../../model/Firmware";
import DeviceFirmwareFormView from "./DeviceFirmwareFormView";
import DeviceFirmware from "../../model/DeviceFirmware";


export default function DeviceFirmwareForm()
{
  const [state, dispatch] = useReducer(reducer, createEmptyState());
  const editMode = useSelector<any, boolean>((state) => state.editMode.value);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => handleFormAccess(), [editMode]);
  useEffect(() => fetchDevices(), [editMode, location]);
  useEffect(() => fetchFirmwares(), [editMode, location]);
  useEffect(() => prepareForm(), [state.deviceMap, state.firmwares]);


  const handleFormAccess = () => {
    if(!editMode) {
      const message = "You don't have permission to change any data!";
      dispatch({type: "message", value: message});
    } else {
      dispatch({type: "state", value: createEmptyState()});
    }
  }

  const fetchDevices = () =>
  {  
    if(editMode)
    {
      const apiAction = apiActionMap.get("device-find-all");
      const url = apiAction?.url;
      const method = apiAction?.method;
      const requestData = {url, method};
      appService.executeRequest<Device[]>(requestData).then((response) =>
      {
        let data = appService.convertData<Device>(response.data);
        let map = new Map<number, Device>();
        data.forEach((device: Device) => {
          if(device.id && device.id > -1)
            map.set(device.id, device);
        });
        dispatch({type: "deviceMap", value: map});
      }).catch((error) =>
      {
        let message = "Couldn't get the devices available!";
        dispatch({type: "message", value: message});
        console.log(message);
        console.log(error);
      });
    }
  }

  const fetchFirmwares = () =>
  {
    if(editMode)
    {
      let action = apiActionMap.get("firmware-find-all");
      const url = action?.url;
      const method = action?.method;
      const requestData = {url, method};
      appService.executeRequest<Firmware[]>(requestData).then((response) =>
      {
        let data = appService.convertData<Firmware>(response.data);
        dispatch({type: "firmwares", value: data});
      }).catch((error) =>
      {
        let message = "Couldn't get the firmwares available!";
        dispatch({type: "message", value: message});
        console.log(message);
        console.log(error);
      });
    }
  }

  const prepareForm = () =>
  {
    const urlParams = appService.getCurrentURLParameters();
    const select = urlParams[2];

    if(select === "device" || select === "firmware")
    {
      const type = select === "device" ? "deviceIds" : "firmwareId";
      const param = parseInt(urlParams[3]);
      const id = !isNaN(param) ? param : undefined;
      const value = type === "deviceIds" ? (id ? [id] : []) : urlParams[3];
      dispatch({type, value});
    }
  }

  const attachDevice = (id: string) =>
  {
    const nId = parseInt(id);

    if(nId > -1 && state.deviceIds.indexOf(nId) < 0)
    {
      let deviceIds = [...state.deviceIds];
      deviceIds.push(nId);
      dispatch({type: "deviceIds", value: deviceIds});
    }
  }
  
  const detachDevice = (id: number) =>
  {
    let filter = (filterId: number) => filterId !== id;
    let deviceIds = state?.deviceIds?.filter(filter);
    dispatch({type: "deviceIds", value: deviceIds});
  }

  const onSubmit = () =>
  {
    const {deviceIds, firmwareId} = state;
    const df = new DeviceFirmware(undefined, deviceIds, firmwareId, undefined);
    const validation = validateDeviceFirmware(df);

    if(validation.valid)
    {
      const apiAction = apiActionMap.get("device-firmware-save");
      const url = apiAction?.url;
      const method = apiAction?.method;
      const body = {device_ids: df.deviceIds, firmware_id: df.firmwareId};
      const requestData = {url, method, body};
      appService.executeRequest<DeviceFirmware[]>(requestData).then((response) =>
      {
        dispatch({type: "clear"});
        alert("Firmware attached to the selected devices!");
      }).catch((error) =>
      {
        let message = "Error sending the data to the system!";
        console.log(message);
        console.log(error);
        alert(message);
      });
    }
    else
    {
      console.log(validation.error);
      alert(validation.error);
    }
  }
  
  const onReturnClick = () =>
  {
    navigate(-1);
  }

  const updateState = (type: string, value: any) =>
  {
    dispatch({type, value});
  }

  const validateDeviceFirmware = (deviceFirmware: DeviceFirmware) =>
  {
    if(!deviceFirmware.firmwareId || deviceFirmware.firmwareId < 0)
      return {valid: false, error: "Please select at least one firmware!"};

    if(!deviceFirmware.deviceIds || deviceFirmware.deviceIds.length < 1)
      return {valid: false, error: "Please attach at least one device!"};
      
    return {valid: true, error: ""};
  }


  return (
    <DeviceFirmwareFormView
      editMode={editMode}
      state={state}
      attachDevice={attachDevice}
      detachDevice={detachDevice}
      onSubmit={onSubmit}
      onReturnClick={onReturnClick}
      updateState={updateState}
    />
  );
}


const createEmptyState = () =>
{
  return {
    deviceIds: new Array<number>(),
    firmwareId: -1,
    deviceMap: new Map<number, Device>(),
    firmwares: new Array<Firmware>(),
    message: ""
  } as IState;
}

const reducer = (state: any, action: any) =>
{
  if(action.type === "state")
    return action.value;
  else if(action.type === "clear")
    return { ...state, deviceIds: new Array<number>(), firmwareId: -1};
  else
    return { ...state, [action.type]: action.value };
}

interface IState {
  message: string;

  deviceIds: Array<number>;
  firmwareId: number;
  deviceMap: Map<number, Device>;
  firmwares: Array<Firmware>;
}


export type { IState };
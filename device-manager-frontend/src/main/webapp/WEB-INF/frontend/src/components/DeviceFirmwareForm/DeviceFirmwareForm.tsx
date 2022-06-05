import { useEffect, useReducer, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setAction } from "../../features/ApiAction";
import apiActionMap from "../../data/ApiActionMap";
import appService from "../../service/AppService";
import Device from "../../model/Device";
import Firmware from "../../model/Firmware";
import DeviceFirmwareFormView from "./DeviceFirmwareFormView";
import DeviceFirmware from "../../model/DeviceFirmware";


export default function DeviceFirmwareForm()
{
  const navigate = useNavigate();
  const globalDispatch = useDispatch();
  const [state, dispatch] = useReducer(reducer, createEmptyState());
  const apiActionData = useSelector((state: any) => state.apiAction.value);
  const editMode = useSelector((state: any) => state.editMode.value as boolean);
  const apiAction = apiActionMap.get(apiActionData.actionKey);
  const returnPath = apiAction ? "/" + apiAction.section : "/device";
  useEffect(() => {fetchDevices()}, [editMode]);
  useEffect(() => {fetchFirmwares()}, [editMode]);
  useEffect(() => {selectItem()}, [editMode]);


  const fetchDevices = () =>
  {  
    const deviceMap = state?.deviceMap;
  
    if(editMode && deviceMap?.size < 1)
    {
      const action = apiActionMap.get("device-find-all");
      const url = action?.url;
      const method = action?.method;
      appService.executeRequest<Device[]>(url, method, []).then((response) => {
        let data = appService.convertData<Device>(response.data);
        let map = new Map<number, Device>();
        data.forEach((device: Device) => {
          device.id ? map.set(device.id, device) : null;
        });
        dispatch({type: "deviceMap", value: map});
      }).
      catch((error) => {
        let message = "Couldn't get the devices available!";
        dispatch({type: "error", value: message});
        console.log(message);
        console.log(error);
      });
    }
  }

  const fetchFirmwares = () =>
  {
    let firmwares = state?.firmwares;
    let shouldFetch = editMode && !state?.error;
    
    if(shouldFetch && firmwares?.length < 1)
    {
      let action = apiActionMap.get("firmware-find-all");
      const url = action?.url;
      const method = action?.method;
      appService.executeRequest<Firmware[]>(url, method, []).then((response) => {
        let data = appService.convertData<Firmware>(response.data);
        dispatch({type: "firmwares", value: data});
      }).
      catch((error) => {
        let message = "Couldn't get the firmwares available!";
        dispatch({type: "error", value: message});
        console.log(message);
        console.log(error);
      });
    }
  }

  const selectItem = () =>
  {
    let apiAction = apiActionMap.get(apiActionData?.actionKey);
    let section = apiAction?.section;
  
    if(section === "device" || section === "firmware")
    {
      let type = section === "device" ? "deviceIds" : "firmwareId";
      let param = apiActionData?.params[0];
      let value = type === "deviceIds" ? [param] : param;
      dispatch({type, value});
    }
  }

  const attachDevice = (idText: string) =>
  {
    const id = parseInt(idText);

    if(id > -1 && state.deviceIds.indexOf(id) < 0)
    {
      let deviceIds = [...state.deviceIds];
      deviceIds.push(id);
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
    const action = apiActionMap.get("device-firmware-save");
    const url = action?.url;
    const method = action?.method;
    const df = new DeviceFirmware(undefined, deviceIds, firmwareId, undefined);
    const validation = validateDeviceFirmware(df);

    if(validation.valid)
    {
      const body = {device_ids: df.deviceIds, firmware_id: df.firmwareId};      
      appService.executeRequest<DeviceFirmware[]>(url, method, [], body).then((response) => {
        dispatch({type: "clear"});
        alert("Firmware attached to the selected devices!");
      }).
      catch((error) => {
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
    let actionKey = apiActionData?.previous?.actionKey;
    let params = apiActionData?.previous?.params;
    actionKey = actionKey ? actionKey : apiAction?.section;
    params = params ? params : [];
    globalDispatch(setAction({actionKey, params}));
    navigate(returnPath);
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
      return {valid: false, error: "Please attach at least 1 device"};
      
    return {valid: true, error: ""};
  }


  return (
    <DeviceFirmwareFormView
      editMode={editMode}
      apiAction={apiAction}
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
    error: null
  }
}

const reducer = (state: any, action: any) =>
{
  if(action.type === "clear")
    return { ...state, deviceIds: new Array<number>(), firmwareId: -1};
  else
    return { ...state, [action.type]: action.value };
}
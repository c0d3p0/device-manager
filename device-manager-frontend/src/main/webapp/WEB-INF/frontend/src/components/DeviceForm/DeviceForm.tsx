import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import apiActionMap from "../../data/ApiActionMap";
import appService from "../../service/AppService";
import Device from "../../model/Device";
import DeviceFormView from "./DeviceFormView";


export default function DeviceForm()
{
  const [state, dispatch] = useReducer(reducer, createEmptyState());
  const editMode = useSelector<any, boolean>((state) => state.editMode.value);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => {handleFormAccess()}, [editMode]);
  useEffect(() => {fetchData()}, [editMode, location]);


  const handleFormAccess = () => {
    if(!editMode) {
      const message = "You don't have permission to change any data!";
      dispatch({type: "message", value: message});
    } else {
      dispatch({type: "state", value: createEmptyState()});
    }
  }

  const fetchData = () =>
  {
    if(state.isEditing)
    {
      const urlParams = appService.getCurrentURLParameters();
      const apiAction = apiActionMap.get("device-find-by-id");
      const url = apiAction?.url;
      const method = apiAction?.method;
      const params = [urlParams[2] ? urlParams[2] : "-1"];
      const requestData = {url, method, params};
      appService.executeRequest<Device>(requestData).then((response) =>
      {
        const {id, name, hardwareVersion} = response.data;
        const isEditing = state.isEditing;
        const newState = {isEditing, message: "", id, name, hardwareVersion};
        dispatch({type: "state", value: newState});
      }).catch((error) =>
      {
        let message = "Couldn't get the device to update!";
        dispatch({type: "message", value: message});
        console.log(message);
        console.log(error);
      });
    }
  }

  const onSubmit = () =>
  {
    const {id, name, hardwareVersion} = state;
    const device = new Device(id, name, hardwareVersion);
    let validation = validateDevice(device);
  
    if(validation.valid)
    {
      const key = state.isEditing ? "device-update" : "device-save";
      const apiAction = apiActionMap.get(key);
      const url = apiAction?.url;
      const method = apiAction?.method;
      const params = state.isEditing ? [state.id?.toString() ?? "-1"] : undefined;
      const body = {name: device.name, hardware_version: device.hardwareVersion};
      const requestData = {url, method, params, body};
      appService.executeRequest<Device>(requestData).then((response) =>
      {
        alert(`Device ${state.isEditing ? "updated" : "added"} in the system!`);
        
        if(!state.isEditing)
          dispatch({type: "state", value: createEmptyState()});
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

  const validateDevice = (device: Device) =>
  {
    if(state.isEditing)
      return {valid: true, error: ""};

    if(!device?.name)
      return {valid: false, error: "Please type the device name!"};

    if(!device?.hardwareVersion)
      return {valid: false, error: "Please type the device hardware version!"};

    return {valid: true, error: ""};
  }


  return (
    <DeviceFormView
      editMode={editMode}
      state={state}
      onSubmit={onSubmit}
      onReturnClick={onReturnClick}
      updateState={updateState}
    />
  );
}


const createEmptyState = () => {
  const urlParams = appService.getCurrentURLParameters();
  const isEditing = urlParams[2] ? true : false;
  const message = isEditing ? "Please wait, loading the data..." : "";
  return {isEditing, message, id: undefined, name: "", hardwareVersion: ""};
}

const reducer = (state: any, action: any) =>
{
  if(action.type === "state")
    return action.value;
  else
    return { ...state, [action.type]: action.value };
}

interface IState {
  isEditing: boolean;
  message: string;

  id?: number;
  name?: string;
  hardwareVersion?: string;
}

export type { IState };
import { useEffect, useReducer } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import apiActionMap from "../../data/ApiActionMap";
import appService from "../../service/AppService";
import Firmware from "../../model/Firmware";
import FirmwareFormView from "./FirmwareFormView";


export default function FirmwareForm()
{
  const [state, dispatch] = useReducer(reducer, createEmptyState());
  const navigate = useNavigate();
  const location = useLocation();
  const editMode = useSelector<any, boolean>((state) => state.editMode.value);
  useEffect(() => handleFormAccess(), [editMode]);
  useEffect(() => fetchData(), [editMode, location]);


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
      const apiAction = apiActionMap.get("firmware-find-by-id");
      const url = apiAction?.url;
      const method = apiAction?.method;
      const params = [urlParams[2] ? urlParams[2] : "-1"];
      const requestData = {url, method, params};
      appService.executeRequest<Firmware>(requestData).then((response) =>
      {
        const {id, name, data} = response.data;
        const isEditing = state.isEditing;
        const newState = {isEditing, message: "", id, name, data};
        dispatch({type: "state", value: newState});
      }).catch((error) =>
      {
        let message = "Couldn't get the firmware to edit!";
        dispatch({type: "message", value: message});
        console.log(message);
        console.log(error);
      });
    }
  }

  const onReadBinaryClick = (file?: File | null) =>
  {
    const args = {errorCallback: onFileResult, successCallback: onFileResult, file};
    appService.readBinaryFile(args);
    dispatch({type: "readingBinary", value: true});
  }

  const onFileResult = (args: any) =>
  {
    if(!args.error)
    {
      let newState = {...state, data: args.data, readingBinary: false};
      dispatch({type: "state", value: newState});
    }
    else
    {
      let message = args.error;
      let newState = {...state, data: null, readingBinary: false, message};
      dispatch({type: "state", value: newState});
    }
  }

  const onSubmit = () =>
  {
    const {id, name, data} = state;
    const body = new Firmware(id, name, data);
    let validation = validateFirmware(body);
  
    if(validation.valid)
    {
      const key = state.isEditing ? "firmware-update" : "firmware-save";
      const apiAction = apiActionMap.get(key);
      const url = apiAction?.url;
      const method = apiAction?.method;
      const params = state.isEditing ? [state.id?.toString() ?? "-1"] : undefined;
      const requestData = {url, method, params, body};
      appService.executeRequest<Firmware>(requestData).then((response) =>
      {
        alert(`Firmware ${state.isEditing ? "updated" : "added"} in the system!`);
        
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

  const validateFirmware = (firmware: Firmware) =>
  {
    if(state.isEditing)
      return {valid: true, error: ""};

    if(!firmware?.name)
      return {valid: false, error: "Please type the firmware name!"};
  
    if(!firmware?.data)
      return {valid: false, error: "Please upload the firmware binary!"};
      
    return {valid: true, error: ""};
  }


  return (
    <FirmwareFormView
      editMode={editMode}
      state={state}
      onReadBinaryClick={onReadBinaryClick}
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
  const readBinaryFile = false;
  const id = undefined;
  return {isEditing, readBinaryFile, message, id, name: "", data: ""};
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
  readingBinary: boolean;
  message: string;

  id?: number;
  name?: string;
  data?: string;
}

export type { IState };


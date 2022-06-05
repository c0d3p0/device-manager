import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setAction } from "../../features/ApiAction";
import apiActionMap from "../../data/ApiActionMap";
import formTypeMap from "../../data/FormTypeMap";
import appService from "../../service/AppService";
import Device from "../../model/Device";
import DeviceFormView from "./DeviceFormView";


export default function DeviceForm()
{
  const navigate = useNavigate();
  const globalDispatch = useDispatch();
  const [state, dispatch] = useReducer(reducer, {name: "", hardwareVersion: ""});
  const apiActionData = useSelector((state: any) => state.apiAction.value);
  const editMode = useSelector((state: any) => state.editMode.value as boolean);
  const formType = formTypeMap.get(apiActionData.actionKey);
  const apiAction = apiActionMap.get(apiActionData.actionKey);
  const returnPath = apiAction ? "/" + apiAction.section : "/";
  const formUpdate = formType === "update";
  const title = formUpdate ? "Update Device" : "New Device";
  useEffect(() => {fetchData()}, []);
  

  const fetchData = () =>
  {
    if(formUpdate)
    {
      let action = apiActionMap.get("device-find-by-id");
      const url = action?.url;
      const method = action?.method;
      const params = apiActionData?.params;
      appService.executeRequest<Device>(url, method, params).then((response) => {
        dispatch({type: "state", value: response.data});
      }).
      catch((error) => {
        let message = "Couldn't get the device to edit!";
        dispatch({type: "error", value: message});
        console.log(message);
        console.log(error);
      });
    }
  }

  const onSubmit = () =>
  {
    const {id, name, hardwareVersion} = state;
    const url = apiAction?.url;
    const method = apiAction?.method;
    const params = apiActionData?.params;
    const device = new Device(id, name, hardwareVersion);
    let validation = validateDevice(device);
  
    if(validation.valid)
    {
      const body = {name: device.name, hardware_version: device.hardwareVersion};
      appService.executeRequest<Device>(url, method, params, body).then((response) => {
        let state =
        {
          name: formUpdate ? name : "",
          hardwareVersion: formUpdate ? hardwareVersion : "",
        };
        dispatch({type: "state", value: state});
        alert(`Device ${formUpdate ? "updated" : "added"} in the system!`);
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

  const validateDevice = (device: Device) =>
  {
    if(!device?.name)
      return {valid: false, error: "Please type the device name!"};
  
    if(!device?.hardwareVersion)
      return {valid: false, error: "Please type the device hardware version!"};
      
    return {valid: true, error: ""};
  }


  return (
    <DeviceFormView
      editMode={editMode}
      apiAction={apiAction}
      formType={formType}
      title={title}
      state={state}
      onSubmit={onSubmit}
      onReturnClick={onReturnClick}
      updateState={updateState}
    />
  );
}


const reducer = (state: any, action: any) =>
{
  if(action.type === "state")
    return action.value;
  else
    return { ...state, [action.type]: action.value };
}
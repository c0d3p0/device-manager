import { useEffect, useReducer } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setAction } from "../../features/ApiAction";
import apiActionMap from "../../data/ApiActionMap";
import formTypeMap from "../../data/FormTypeMap";
import appService from "../../service/AppService";
import Firmware from "../../model/Firmware";
import FirmwareFormView from "./FirmwareFormView";


export default function FirmwareForm()
{
  const navigate = useNavigate();
  const globalDispatch = useDispatch();
  const [state, dispatch] = useReducer(reducer, {name: "", data: ""});
  const apiActionData = useSelector((state: any) => state.apiAction.value);
  const editMode = useSelector((state: any) => state.editMode.value as boolean);
  const formType = formTypeMap.get(apiActionData.actionKey);
  const apiAction = apiActionMap.get(apiActionData.actionKey);
  const returnPath = apiAction ? "/" + apiAction.section : "/";
  const formUpdate = formType === "update";
  const title = formUpdate ? "Update Firmware" : "New Firmware";
  useEffect(() => {fetchData()}, []);


  const fetchData = () =>
  {
    if(formUpdate)
    {
      const action = apiActionMap.get("firmware-find-by-id");
      const url = action?.url;
      const method = action?.method;
      const params = apiActionData?.params;
      appService.executeRequest<Firmware>(url, method, params).then((response) => {
        dispatch({type: "name", value: response.data.name});
      }).
      catch((error) => {
        let message = "Couldn't get the firmware to edit!";
        dispatch({type: "error", value: message});
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
    const url = apiAction?.url;
    const method = apiAction?.method;
    const params = apiActionData?.params;
    const body = new Firmware(id, name, data);
    const validation = validateFirmware(body);
  
    if(validation.valid)
    {
      appService.executeRequest<Firmware>(url, method, params, body).then((response) => {
        let state =
        {
          name: formUpdate ? name : "",
          data: formUpdate ? data : "",
        };
        dispatch({type: "state", value: state});
        alert(`Firmware ${formUpdate ? "updated" : "added"} in the system!`);
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

  const validateFirmware = (firmware: Firmware) =>
  {
    if(!firmware?.name)
      return {valid: false, error: "Please type the firmware name!"};
  
    if(!formUpdate && !firmware?.data)
      return {valid: false, error: "Please upload the firmware binary!"};
      
    return {valid: true, error: ""};
  }


  return (
    <FirmwareFormView
      editMode={editMode}
      apiAction={apiAction}
      formType={formType}
      title={title}
      state={state}
      onReadBinaryClick={onReadBinaryClick}
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



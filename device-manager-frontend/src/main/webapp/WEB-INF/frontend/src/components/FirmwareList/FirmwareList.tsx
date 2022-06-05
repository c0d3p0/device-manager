import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setAction } from '../../features/ApiAction';
import appService from '../../service/AppService';
import apiActionMap from '../../data/ApiActionMap';
import Firmware from '../../model/Firmware';
import FirmwareListView from './FirmwareListView';



export default function FirmwareList()
{
  const [firmwareData, setFirmwareData] = useState([] as Firmware[]);
  const [message, setMessage] = useState("");
  const apiActionData = useSelector((state: any) => state.apiAction.value);
  const editMode = useSelector((state: any) => state.editMode.value as boolean);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {fetchData();}, [apiActionData]);


  const fetchData = () =>
  {
    const action = apiActionMap.get(apiActionData.actionKey);
    const url = action?.url;
    const method = action?.method;
    const params = apiActionData?.params;
    appService.executeRequest<Firmware[]>(url, method, params).then((response) => {
      let data = appService.convertData<Firmware>(response.data);
      setFirmwareData(data);
      setMessage(data.length < 1 ? "Firmware not found!" : "");
    }).
    catch((error) => {
      const m = error?.response?.status === 400 ?
          "Firmware not found!" : "An error happened requesting the data!";
      setFirmwareData([] as Firmware[]);
      setMessage(m);
      console.log(m);
      console.log(error);
    });
  }

  const onAddClick = () =>
  {
    const {actionKey, params} = apiActionData;
    const previous = {actionKey, params};
    dispatch(setAction({actionKey: "firmware-save", params: [], previous}));
    navigate("/firmware-form");
  }

  const onAttachToDevicesClick = (id?: number) =>
  {
    const {actionKey, params} = apiActionData;
    const k = "device-firmware-attach-devices";
    const previous = {actionKey, params};
    dispatch(setAction({actionKey: k, params: [id], previous}));
    navigate("/device-firmware-form");
  }

  const onEditClick = (id?: number) =>
  {
    const {actionKey, params} = apiActionData;
    const previous = {actionKey, params};
    dispatch(setAction({actionKey: "firmware-update", params: [id], previous}));
    navigate("/firmware-form");
  }
  
  const onRemoveClick = (firmware: Firmware) =>
  {
    let message = "Are you sure you want to remove the firmware ";
    message += (firmware?.name ? firmware.name : "UNKNOWN") + "!";
  
    if(confirm(message))
    {
      const action = apiActionMap.get("firmware-delete");
      const url = action?.url;
      const method = action?.method;
      appService.executeRequest<Firmware>(url, method, [firmware.id]).then((response) => {
        dispatch(setAction({actionKey: "firmware-find-all", params: []}));
        navigate("/" + (action?.section ? action.section : ""));
      }).
      catch((error) => {
        let message = "An error happened deleting the firmware!";
        setMessage(message);
        console.log(message);
        console.log(error);
      });
    }
  }

  return (
    <FirmwareListView
      apiActionMap={apiActionMap}
      editMode={editMode}
      firmwareData={firmwareData}
      message={message}
      onAddClick={onAddClick}
      onAttachToDevicesClick={onAttachToDevicesClick}
      onEditClick={onEditClick}
      onRemoveClick={onRemoveClick}
    />
  );
}
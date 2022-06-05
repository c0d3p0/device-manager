import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { setAction } from '../../features/ApiAction';
import appService from '../../service/AppService';
import apiActionMap from '../../data/ApiActionMap';
import Device from '../../model/Device';
import DeviceListView from './DeviceListView';


export default function DeviceList()
{
  const [deviceData, setDeviceData] = useState([] as Device[]);
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
    const params = apiActionData.params;
    appService.executeRequest<Device[]>(url, method, params).then((response) => {
      let data = appService.convertData<Device>(response.data);
      setDeviceData(data);
      setMessage(data.length < 1 ? "Device not found!" : "");
    }).
    catch((error) => {
      const m = error?.response?.status === 400 ?
          "Device not found!" : "An error happened requesting the data!";
      setDeviceData([] as Device[]);
      setMessage(m);
      console.log(m);
      console.log(error);
    });
  }

  const onAddClick = () =>
  {
    const {actionKey, params} = apiActionData;
    const previous = {actionKey, params};
    dispatch(setAction({actionKey: "device-save", params: [], previous}));
    navigate("/device-form");
  }

  const onShowHistoryClick = (id?: number) =>
  {
    const {actionKey, params} = apiActionData;
    const k = "device-history-find-by-id";
    const previous = {actionKey, params};
    dispatch(setAction({actionKey: k, params: [id], previous}));
    navigate((id ? id : -1) > -1 ? ("/device/history/" + id) : "/device");
  }

  const onAttachFirmwareClick = (id?: number) =>
  {
    const {actionKey, params} = apiActionData;
    const k = "device-firmware-attach-to-device";
    const previous = {actionKey, params};
    dispatch(setAction({actionKey: k, params: [id], previous}));
    navigate("/device-firmware-form");
  }

  const onEditClick = (id?: number) =>
  {
    const {actionKey, params} = apiActionData;
    const previous = {actionKey, params};
    dispatch(setAction({actionKey: "device-update", params: [id], previous}));
    navigate("/device-form");
  }

  const onRemoveClick = (device: Device) =>
  {
    let message = "Are you sure you want to remove the device ";
    message += device?.name + "!";
  
    if(confirm(message))
    {
      let action = apiActionMap.get("device-delete");
      const url = action?.url;
      const method = action?.method;
      appService.executeRequest<Device>(url, method, [device?.id]).then((response) => {
        dispatch(setAction({actionKey: "device-find-all", params: []}));
        navigate("/" + (action?.section ? action.section : ""));
      }).
      catch((error) => {
        let message = "An error happened deleting the device!";
        setMessage(message);
        console.log(message);
        console.log(error);
      });
    }
  }


  return (
    <DeviceListView
      apiActionMap={apiActionMap}
      editMode={editMode}
      deviceData={deviceData}
      message={message}
      onAddClick={onAddClick}
      onShowHistoryClick={onShowHistoryClick}
      onAttachFirmwareClick={onAttachFirmwareClick}
      onEditClick={onEditClick}
      onRemoveClick={onRemoveClick}
    />
  );
}







import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import appService from '../../service/AppService';
import apiActionMap from '../../data/ApiActionMap';
import Device from '../../model/Device';
import DeviceListView from './DeviceListView';


export default function DeviceList()
{
  const [devices, setDevices] = useState<Device[] | null>(null);
  const [message, setMessage] = useState("");
  const [refreshTime, setRefreshTime] = useState(Date.now());
  const editMode = useSelector<any, boolean>((state) => state.editMode.value);
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => fetchData(), [location, refreshTime]);


  const fetchData = () =>
  {
    const urlParams = appService.getCurrentURLParameters();
    const apiAction = getApiAction(urlParams);
    const url = apiAction?.url;
    const method = apiAction?.method;
    const params = urlParams[3] ? [urlParams[3]] : undefined;
    const requestData = {url, method, params};
    appService.executeRequest<Device[]>(requestData).then((response) =>
    {
      let data = appService.convertData<Device>(response.data);
      setDevices(data);
      setMessage(data.length < 1 ? "Not a single device found!" : "");
    }).catch((error) =>
    {
      const m = error?.response?.status === 400 ?
          "Not a single device found!" : "An error happened requesting the data!";
      setDevices([]);
      setMessage(m);
      console.log(m);
      console.log(error);
    });
  }

  const onAddClick = () =>
  {
    navigate("/device-form");
  }

  const onShowHistoryClick = (id?: number) =>
  {
    navigate(`/device/history/${id?.toString() ?? "-1"}`);
  }

  const onAttachFirmwareClick = (id?: number) =>
  {
    navigate(`/device-firmware-form/device/${id?.toString() ?? "-1"}`);
  }

  const onEditClick = (id?: number) =>
  {
    navigate(`/device-form/${id?.toString() ?? "-1"}`);
  }

  const onRemoveClick = (device: Device) =>
  {
    const t = device.name ? `the device ${device.name}!` : "this device!";
    let message = `Are you sure you want to remove ${t}`;
  
    if(confirm(message))
    {
      const apiAction = apiActionMap.get("device-delete");
      const url = apiAction?.url;
      const method = apiAction?.method;
      const params = [device.id?.toString() ?? "-1"];
      const requestData = {url, method, params};
      appService.executeRequest<Device>(requestData).then((response) =>
      {
        setRefreshTime(Date.now());
        setDevices(null);
        navigate("/device");
      }).catch((error) =>
      {
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
      devices={devices}
      message={message}
      onAddClick={onAddClick}
      onShowHistoryClick={onShowHistoryClick}
      onAttachFirmwareClick={onAttachFirmwareClick}
      onEditClick={onEditClick}
      onRemoveClick={onRemoveClick}
    />
  );
}


const getApiAction = (urlParams: string[]) => {
  const key1 = apiActionKeyMap.get(urlParams[2]);
  const key2 = apiActionKeyMap.entries().next().value[1];
  const apiAction = apiActionMap.get(key1 ?? "invalid");
  return apiAction ? apiAction : apiActionMap.get(key2);
}

const apiActionKeyMap = new Map<string, string>([
  ["", "device-find-all"],
  ["id", "device-find-by-id"],
  ["name", "device-find-by-name"],
  ["history", "device-history-find-by-id"]
]);




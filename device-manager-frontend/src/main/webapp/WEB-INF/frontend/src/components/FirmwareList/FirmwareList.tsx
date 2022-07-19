import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import appService from '../../service/AppService';
import apiActionMap from '../../data/ApiActionMap';
import Firmware from '../../model/Firmware';
import FirmwareListView from './FirmwareListView';



export default function FirmwareList()
{
  const [firmwares, setFirmwares] = useState<Firmware[] | null>(null);
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
    appService.executeRequest<Firmware[]>(requestData).then((response) =>
    {
      let data = appService.convertData<Firmware>(response.data);
      setFirmwares(data);
      setMessage(data.length < 1 ? "Firmware not found!" : "");
    }).catch((error) =>
    {
      const m = error?.response?.status === 400 ?
          "Firmware not found!" : "An error happened requesting the data!";
      setFirmwares([]);
      setMessage(m);
      console.log(m);
      console.log(error);
    });
  }

  const onAddClick = () =>
  {
    navigate("/firmware-form");
  }

  const onAttachToDevicesClick = (id?: number) =>
  {
    navigate(`/device-firmware-form/firmware/${id?.toString() ?? "-1"}`);
  }

  const onEditClick = (id?: number) =>
  {
    navigate(`/firmware-form/${id?.toString() ?? "-1"}`);
  }
  
  const onRemoveClick = (firmware: Firmware) =>
  {
    const t = firmware.name ? `the firmware ${firmware.name}!` : "this firmware!";
    let message = `Are you sure you want to remove ${t}`;
  
    if(confirm(message))
    {
      const apiAction = apiActionMap.get("firmware-delete");
      const url = apiAction?.url;
      const method = apiAction?.method;
      const params = [firmware.id?.toString() ?? "-1"];
      const requestData = {url, method, params};
      appService.executeRequest<Firmware>(requestData).then((response) =>
      {
        setRefreshTime(Date.now());
        setFirmwares(null);
        navigate("/firmware");
      }).catch((error) =>
      {
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
      firmwares={firmwares}
      message={message}
      onAddClick={onAddClick}
      onAttachToDevicesClick={onAttachToDevicesClick}
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
  ["", "firmware-find-all"],
  ["id", "firmware-find-by-id"],
  ["name", "firmware-find-by-name"]
]);
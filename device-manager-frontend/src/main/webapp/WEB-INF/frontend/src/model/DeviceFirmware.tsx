import Firmware from "./Firmware";


class DeviceFirmware
{
  constructor(id?: number, deviceIds?: number[],
      firmwareId?: number, associationTime?: string)
  {
    this.id = id;
    this.deviceIds = deviceIds;
    this.firmwareId = firmwareId;
    this.associationTime = associationTime;
  }

  id?: number;
  deviceId?: number;
  deviceIds?: number[];
  firmwareId?: number;
  firmware?: Firmware;
  associationTime?: string;
}


export default DeviceFirmware;
import Firmware from "./Firmware";
import DeviceFirmware from "./DeviceFirmware";


class Device
{
  constructor(id?: number, name?: string, hardwareVersion?: string)
  {
    this.id = id;
    this.name = name;
    this.hardwareVersion = hardwareVersion;
  }

  id?: number;
  name?: string;
  hardwareVersion?: string;
  deviceFirmwareList?: DeviceFirmware[];
  currentFirmware?: Firmware;
}


export default Device;
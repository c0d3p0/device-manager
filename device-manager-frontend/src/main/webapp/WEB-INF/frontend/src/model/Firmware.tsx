import Device from "./Device";


class Firmware
{
  constructor(id?: number, name?: string, data?: string)
  {
    this.id = id;
    this.name = name;
    this.data = data;
  }

  id?: number;
  name?: string;
  data?: string;
  deviceList?: Device[];
}


export default Firmware;
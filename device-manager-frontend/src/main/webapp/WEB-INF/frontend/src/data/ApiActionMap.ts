const baseUrl = "http://localhost:3000/frontend";

const apiActionMap = new Map<string, IAPIAction>([
  [
    "device",
    {
      section: "device",
      url: baseUrl + "/device/all",
      method: "GET"
    }
  ],
  [
    "device-find-all",
    {
      section: "device",
      url: baseUrl + "/device/all",
      method: "GET"
    }
  ],
  [
    "device-find-by-id",
    {
      section: "device",
      url: baseUrl + "/main/device/by-device-id",
      method: "GET"
    }
  ],
  [
    "device-history-find-by-id",
    {
      section: "device",
      url: baseUrl + "/main/device/history-by-device-id",
      method: "GET"
    }
  ],
  [
    "device-find-by-name",
    {
      section: "device",
      url: baseUrl + "/device/by-name",
      method: "GET"
    }
  ],
  [
    "device-download-firmware",
    {
      section: "device",
      url: baseUrl + "/main/device/download-firmware",
      method: "GET"
    }
  ],
  [
    "device-save",
    {
      section: "device",
      url: baseUrl + "/device",
      method: "POST"
    }
  ],
  [
    "device-update",
    {
      section: "device",
      url: baseUrl + "/device",
      method: "PATCH"
    }
  ],
  [
    "device-delete",
    {
      section: "device",
      url: baseUrl + "/main/device",
      method: "DELETE"
    }
  ],


  [
    "firmware",
    {
      section: "firmware",
      url: baseUrl + "/firmware/all",
      method: "GET"
    }
  ],
  [
    "firmware-find-all",
    {
      section: "firmware",
      url: baseUrl + "/firmware/all",
      method: "GET"
    }
  ],
  [
    "firmware-find-by-id",
    {
      section: "firmware",
      url: baseUrl + "/firmware/by-id",
      method: "GET"
    }
  ],
  [
    "firmware-find-by-name",
    {
      section: "firmware",
      url: baseUrl + "/firmware/by-name",
      method: "GET"
    }
  ],
  [
    "firmware-download",
    {
      section: "firmware",
      url: baseUrl + "/firmware/download",
      method: "GET"
    }
  ],
  [
    "firmware-save",
    {
      section: "firmware",
      url: baseUrl + "/firmware",
      method: "POST"
    }
  ],
  [
    "firmware-update",
    {
      section: "firmware",
      url: baseUrl + "/firmware",
      method: "PATCH"
    }
  ],
  [
    "firmware-delete",
    {
      section: "firmware",
      url: baseUrl + "/main/firmware",
      method: "DELETE"
    }
  ],



  [
    "device-firmware-save",
    {
      section: "device-firmware",
      url: baseUrl + "/main/device-firmware",
      method: "POST"
    }
  ],
  [
    "device-firmware-attach-to-device",
    {
      section: "device",
      url: baseUrl + "/device/by-id",
      method: "GET"
    }
  ],
  [
    "device-firmware-attach-devices",
    {
      section: "firmware",
      url: baseUrl + "/firmware/by-id",
      method: "GET"
    }
  ],
]);


interface IAPIAction {
  section: string;
  url: string;
  method: string;
}

export default apiActionMap;
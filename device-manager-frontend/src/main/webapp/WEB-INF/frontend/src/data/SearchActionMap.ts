const deviceSearchMap = new Map<string, any>([
  ["device-find-by-name", {id: 1, label: "By Name", path: "name"}],
  ["device-find-by-id", {id: 0, label: "By Id", path: "id"}]
]);

const firmwareSearchMap = new Map<string, any>([
  ["firmware-find-by-name", {id: 1, label: "By Name", path: "name"}],
  ["firmware-find-by-id", {id: 0, label: "By Id", path: "id"}]
]);

const searchActionMap = new Map<string, any>([
  ["device", deviceSearchMap],
  ["firmware", firmwareSearchMap]
]);


export default searchActionMap;
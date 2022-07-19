const navLinkMap = new Map<string, INavLinkData>([
  ["device", {label: "Device", path: "/device"}],
  ["firmware", {label: "Firmware", path: "/firmware"}],
  ["about", {label: "About", path: "/about"}]
]);


interface INavLinkData {
  label: string;
  path: string;
}

export default navLinkMap;


const searchMap = new Map<string, ISearchData[]>([
  [
    "device",
    [
      {key: "device-find-by-name", label: "By Name", path: "/name"},
      {key: "device-find-by-id", label: "By Id", path: "/id"}
    ]
  ],
  [
    "firmware",
    [
      {key: "firmware-find-by-name", label: "By Name", path: "/name"},
      {key: "firmware-find-by-id", label: "By Id", path: "/id"}
    ]
  ]
]);


interface ISearchData {
  key: string;
  label: string;
  path: string;
}


export type { ISearchData };
export default searchMap;
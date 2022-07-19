import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import searchActionMap, { ISearchData } from "../../data/SearchActionMap";
import appService from "../../service/AppService";
import SearchView from "./SearchView";


export default function Search()
{
  const [searchDataList, setSearchDataList] = useState<ISearchData[]>([]);
  const [search, setSearch] = useState("");
  const [searchType, setSearchType] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(() => prepareSearch(), [location]);


  const prepareSearch = () => {
    const key = getSection();
    const sdl = searchActionMap.get(key);
    const searchData = sdl?.filter((sd) => sd.key === searchType)[0];
    const newSearchType = searchData ? searchData.key : sdl?.[0]?.key
    setSearchDataList(sdl ?? []);
    setSearchType(newSearchType ?? "");
  }

  const onSearchClick = () =>
  {
    const params = search ? [search] : null;
    const searchData = searchDataList.filter((sd) => sd.key === searchType)[0];
    const validSearch = params && searchData ? true : false;
    const section = getSection();
    const type = validSearch ? searchData.path : "";
    const path = validSearch ? `/${section}${type}/${search}` : `/${section}`;
    navigate(path);
  }


  return (
    <SearchView
      searchDataList={searchDataList}
      search={search}
      searchType={searchType}
      setSearch={setSearch}
      setSearchType={setSearchType}
      onSearchClick={onSearchClick}
    />
  );
}


const getSection = () => {
  const urlParams = appService.getCurrentURLParameters();
  const aux = urlParams[1] ? urlParams[1].split("-")[0] : "device";
  return validSectionSet.has(aux) ? aux : "device";
}

const validSectionSet = new Set(["device", "firmware"]);
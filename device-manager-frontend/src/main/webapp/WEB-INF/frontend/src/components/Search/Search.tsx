import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setAction } from "../../features/ApiAction";
import apiActionMap from "../../data/ApiActionMap";
import searchActionMap from "../../data/SearchActionMap";
import SearchView from "./SearchView";


export default function Search()
{
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const apiActionData = useSelector((state: any) => state.apiAction.value);
  const apiAction = apiActionMap.get(apiActionData.actionKey);
  const searchMap = searchActionMap.get(apiAction?.section ? apiAction.section : "");
  const [apiActionKey, setApiActionKey] = useState(searchMap?.keys()?.next()?.value);


  const onSearchClick = () =>
  {
    const secion = apiAction?.section;
    const actionKey = search ? apiActionKey : secion;
    
    if(actionKey && secion)
    {
      const params = search ? [search] : [];
      const actionPath = search ? `/${searchMap?.get(apiActionKey)?.path ?? ""}` : "";
      const searchPath = search ? `/${search}` : "";      
      dispatch(setAction({actionKey: actionKey, params: params}));
      navigate(`/${secion}${actionPath}${searchPath}`);
    }
    else
      navigate("/");
  }


  return (
    <SearchView
      searchMap={searchMap}
      search={search}
      apiActionKey={apiActionKey}
      // apiActionData={apiActionData}
      // apiAction={apiAction}
      setSearch={setSearch}
      setApiActionKey={setApiActionKey}
      onSearchClick={onSearchClick}
    />
  );
}

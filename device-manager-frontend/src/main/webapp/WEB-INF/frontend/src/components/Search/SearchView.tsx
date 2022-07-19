import { ISearchData } from "../../data/SearchActionMap";

import "./Search.css"


export default function SearchView(props: IProps)
{
  return (
    <div className="search">
      <form onSubmit={(e) => {e.preventDefault(); props?.onSearchClick();}}>
        <input
          type="text"
          value={props?.search ? props.search : ""}
          placeholder="Search"
          onChange={(e) => {props?.setSearch(e.target.value)}}
        />
        <select onChange={(e) => {props?.setSearchType(e.target.value)}}>
          {createOptionElements(props)}
        </select>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

const createOptionElements = (props: IProps) =>
{
  return props.searchDataList.map((sd) =>
    <option key={sd.key} value={sd.key}>{sd.label}</option>
  );
}


interface IProps
{
  searchDataList: ISearchData[];
  search: string;
  searchType: string;
  setSearch(search: string): void;
  setSearchType(setApiActionKey: string): void;
  onSearchClick(): void;
}
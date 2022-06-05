import "./Search.css"


export default function SearchView(props: IProps)
{
  const optionElements = createOptionElements(props?.searchMap);


  return (
    <div className="search">
      <form onSubmit={(e) => {e.preventDefault(); props?.onSearchClick();}}>
        <input
          type="text"
          value={props?.search ? props.search : ""}
          placeholder="Search"
          onChange={(e) => {props?.setSearch(e.target.value)}}
        />
        <select onChange={(e) => {props?.setApiActionKey(e.target.value)}}>
          {optionElements}
        </select>
        <button type="submit">Search</button>
      </form>
    </div>
  );
}

const createOptionElements = (searchMap: Map<string, any>) =>
{
  const elements: JSX.Element[] = [];
  searchMap?.forEach((v: any, k: string) =>
  {
    elements.push(createOptionElement(v.id, k, v.label))
  });
  return elements
}

const createOptionElement = (key: number, value: string, text: string) =>
{
  return (
    <option key={key} value={value}>{text}</option>
  );
}


interface IProps
{
  searchMap: Map<string, any>;
  search: string;
  apiActionKey: string;
  setSearch(search: string): void;
  setApiActionKey(setApiActionKey: string): void;
  onSearchClick(): void;
}
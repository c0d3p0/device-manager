import NavLink from "../NavLink/NavLink";
import logo from "../../images/logo.png";

import "./Header.css"


export default function HeaderView(props: IProps)
{
  const {editMode, toggleMode} = props;
  const cssClass = editMode ? "app-mode edit-mode-on" : "app-mode";


  return (
    <header className="header">
      <img src={logo} />
      <button
        className={cssClass}
        title={editMode ? "Activate Search Mode" : "Activate Edit Mode"}
        onClick={(e) => toggleMode()}
      >
        {editMode ? "ᰄ" : "✎"}
      </button>
      <NavLink />
    </header>
  );
}


interface IProps
{
  editMode: boolean;
  toggleMode(): void;
}
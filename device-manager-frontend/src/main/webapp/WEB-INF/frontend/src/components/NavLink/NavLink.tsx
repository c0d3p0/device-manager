import { NavigateFunction, useNavigate } from "react-router-dom";
import navLinkMap from "../../data/NavLinkMap";

import "./NavLink.css";


export default function NavLink()
{ 
  const navigate = useNavigate();

  return (
    <nav className="nav-link">
      {createSectionsElements(navigate)}
    </nav>
  );
}


const createSectionsElements = (navigate: NavigateFunction) =>
{
  const elements: JSX.Element[] = [];
  navLinkMap.forEach((v, k) =>
  {
    elements.push(
      <button key={k} onClick={(e) => navigate(v.path)}>
        {v.label}
      </button>
    );
  });
  return elements;
}
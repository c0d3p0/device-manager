import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import { setAction } from "../../features/ApiAction";
import navLinkMap from "../../data/NavLinkMap";
import NavLinkView from "./NavLinkView";


export default function NavLink()
{
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSectionClick = (section: string, route: string) =>
  {
    dispatch(setAction({actionKey: section, params: []}));
    navigate(route);
  }


  return (
    <NavLinkView
      navLinkMap={navLinkMap}
      onSectionClick={onSectionClick}
    />
  );
}

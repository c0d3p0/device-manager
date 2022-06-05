import "./NavLink.css"


export default function NavLinkView(props: IProps)
{  
  return (
    <nav className="nav-link">
      {createSectionsElements(props)}
    </nav>
  );
}


const createSectionsElements = (props: IProps) =>
{
  const {navLinkMap} = props;
  const elements: JSX.Element[] = [];
  navLinkMap?.forEach((v: any, k: string) =>
  {
    const linkData = navLinkMap.get(k);
    let route = linkData ? linkData.path : "/";
    elements.push(createSectionElement(props, k, route, linkData?.label));
  });
  return elements;
}

const createSectionElement = (props: IProps,
    section: string, route: string, label?: string) =>
{
  return (
    <button
      key={section}
      onClick={(e) => {props.onSectionClick(section, route)}}
    >
      {label}
    </button>
  );
}

interface IProps
{
  navLinkMap: Map<string, any>;
  onSectionClick(section: string, route: string): void;
}
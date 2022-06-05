import "./InvalidUrl.css"


export default function InvalidUrl()
{
  return (
    <div className="invalid-url">
      <div className="box">
        <h2>Page Not Found</h2>
        <span>
          404, The page requested is not a valid one!
        </span>
      </div>
    </div>
  );
}
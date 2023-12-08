import { Link} from "react-router-dom";
import "../../dist/output.css";

export default function BottomBar() {
  

  return (
    <>
      <div className="navbar bg-dark-yellow">
          <div className="flex-1 prose max-w-full">
            <h3 className="text-black"> BruinEats © 2023</h3>
          </div>
          <a className="link text-black mx-4">
                <Link to="https://github.com/jameswang08/ucla-dining-app"> Project GitHub </Link>
          </a>
          <a className="link text-black mx-4">
                <Link to="https://menu.dining.ucla.edu/Menus"> UCLA Menu </Link>
          </a>
          <a className="link text-black mx-4">
                <Link to="https://menu.dining.ucla.edu/hours/"> UCLA Hours of Operation </Link>
          </a>
      </div>
    </>
  );
}

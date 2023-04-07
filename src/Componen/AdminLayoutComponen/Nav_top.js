import { useEffect, useState } from "react";
import Autentifkasi from "@/Utils/Autentifikasi";

const Nav_top = ({ setColMenu, colMenu }) => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  useEffect(() => {
    new Autentifkasi().getAdmin_info().then(value => {
      setName(value["nama"]);
      setUsername(value["username"]);
    })
  }, [])
  return (<>
    <nav className="navbar navbar-expand navbar-light bg-navbar topbar mb-4 static-top">
      <button onClick={() => {
        setColMenu(
          colMenu ? false : true
        );
      }} id="sidebarToggleTop" className="btn btn-link rounded-circle mr-3">
        <i className="fa fa-bars" />
      </button>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle" href="#" id="searchDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i className="fas fa-search fa-fw" />
          </a>
          <div className="dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in" aria-labelledby="searchDropdown">
            <form className="navbar-search">
              <div className="input-group">
                <input type="text" className="form-control bg-light border-1 small" placeholder="What do you want to look for?" aria-label="Search" aria-describedby="basic-addon2" style={{ borderColor: '#3f51b5' }} />
                <div className="input-group-append">
                  <button className="btn btn-primary" type="button">
                    <i className="fas fa-search fa-sm" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </li>

        <div className="topbar-divider d-none d-sm-block" />
        <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <img className="img-profile rounded-circle" src="/img/boy.png" style={{ maxWidth: 60 }} />
            <span className="ml-2 d-none d-lg-inline text-white small">{name}</span>
          </a>
        </li>
        <li className="nav-item dropdown no-arrow">
          <a className="nav-link dropdown-toggle" href="#" id="userDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <span className="ml-2 d-none d-lg-inline text-white small">Logout({username})</span>
          </a>
        </li>
      </ul>
    </nav>
  </>);
}

export default Nav_top;
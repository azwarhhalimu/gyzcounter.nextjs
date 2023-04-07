import { SessionManager } from "@/Utils/SessionManager";
import axios from "axios";
import qs from "query-string";
import { useEffect, useState } from "react";
import { path_admin } from "@/Utils/Config";
import Link from "next/link";
const Main_header = ({ _updateMenuCart, menu }) => {

  const [data, setData] = useState({});
  const [reset, setReset] = useState(0);
  const sessionManager = new SessionManager().getUser();
  useEffect(() => {
    if (sessionManager != null) {
      new Autentifkasi().createHeader().then((bearer) => {
        axios.post(baseUrl("user/get_jumlah_cart"),
          qs.stringify({
            "data": encryptAES(new SessionManager().getUser()["id_user"]),
          }),

          {
            headers: {
              "Authorization": bearer
            }
          }
        ).then((respon) => {
          setData(respon.data);
        })
      });
    }

  }, [_updateMenuCart]);


  const _logout = () => {
    const c = confirm("Apakah anda ingin logout");
    if (c) {
      sessionStorage.removeItem("data_login");
      alert("Anda telah logout");
      //navigasi('/login.html');
    }
  }
  return (
    <>
      <header
        className="header-area header-sticky"
        style={{
          borderBottom: "1px solid #dfdfdf",
          width: "100%",
          position: "fixed",
          zIndex: "999999",
        }}
      >
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                {/* ***** Logo Start ***** */}
                <Link href="/" className="logo">
                  <div style={{ color: "#F60000", fontSize: "20px" }}>Gyz Counter  </div>

                </Link>
                {/* ***** Logo End ***** */}
                {/* ***** Menu Start ***** */}
                <ul className="nav">
                  <li className="scroll-to-section">
                    <Link href="/" {...menu == "beranda" && { className: "active" }}>
                      Home
                    </Link>
                  </li>
                  <li className="scroll-to-section">
                    <Link href={"/" + path_admin + ""}>Administrator {menu}</Link>
                  </li>
                  {/* 
                      <li class="submenu">
                          <a href="javascript:;">Drop Down</a>
                          <ul>
                              <li><a href="#">Drop Down Page 1</a></li>
                              <li><a href="#">Drop Down Page 2</a></li>
                              <li><a href="#">Drop Down Page 3</a></li>
                          </ul>
                      </li>
                  */}
                  <li className="scroll-to-section">
                    <Link href={"/semua-produk.html"}>Semua Produk</Link>
                  </li>


                  {/* <li class=""><a rel="sponsored" href="https://templatemo.com" target="_blank">External URL</a></li> */}

                  <li className="scroll-to-section">
                    <input type="text" className="form-control" placeholder="Cari produk" />
                  </li>

                  {sessionManager == null ?
                    <>
                      <li className="scroll-to-section">
                        <Link {...menu == "semua_produk" && { className: "active" }} href={"/login.html"}>Login</Link>
                      </li>
                    </>
                    : <>
                      <li className="scroll-to-section">
                        <button onClick={() => {
                          //   navigasi("/shopping-cart.html");
                        }} className="btn" style={{ border: "1px solid #DFDFDF" }}>
                          <i className="fa fa-shopping-cart" />
                        </button>
                        <span style={{
                          left: "-5px",
                          top: "-13px",
                          color: "#FFF",
                          position: "relative",
                          padding: "3px 5px 3px 5px",
                          fontSize: "11px",
                          fontWeight: "bold",
                          background: "RED",
                          borderRadius: "5px"

                        }}>{data["jumlah_cart"]}</span>
                      </li>
                      <li style={{ paddingLeft: "0px" }} className="scroll-to-section">
                        <button onClick={() => {
                          navigasi("/user/transaksi.html");
                        }} className="btn" style={{ border: "1px solid #DFDFDF" }}>
                          <i className="fa fa-user" /> {new SessionManager().getUser()["nama"]}
                        </button>

                      </li>
                      <li className="scroll-to-section">
                        <button className="btn"
                          onClick={() => {
                            _logout();
                          }}
                        >Logout</button>
                      </li>
                    </>}

                </ul>
                <a className="menu-trigger">
                  <span>Menu</span>
                </a>
                {/* ***** Menu End ***** */}
              </nav>
            </div>
          </div>
        </div>
      </header>


    </>
  );
};

export default Main_header;

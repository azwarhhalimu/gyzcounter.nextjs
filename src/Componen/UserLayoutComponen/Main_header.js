import Autentifkasi from "@/Utils/Autentifikasi";
import { SessionManager } from "@/Utils/SessionManager";
import axios from "axios";
import qs from "query-string";
import { baseUrl } from "@/Utils/Config";
import { useEffect, useState } from "react";
import { encryptAES } from "@/Utils/enkripsi";
import { path_admin } from "@/Utils/Config";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
const Main_header = ({ _updateMenuCart, menu }) => {

  const url = typeof window !== "undefined" && window.location.pathname;
  const route = useRouter();
  const [data, setData] = useState({});
  const [reset, setReset] = useState(0);
  const sessionManager = new SessionManager().getUser();
  useEffect(() => {
    console.log(url);
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
      route.push('/login.html');
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
          zIndex: "10",
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
                    <Link href="/" {...url == "/" && { style: { color: "red" } }}>
                      Home
                    </Link>
                  </li>
                  <li className="scroll-to-section">
                    <Link href={"/admin"}>Administrator {menu}</Link>
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
                    <Link {...url == "/semua-produk.html" && {
                      style: {
                        color: "red"
                      }
                    }} href={"/semua-produk.html"}>Semua Produk</Link>
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
                        <>
                          { }
                          <button style={{ border: "1px solid #DFDFDF", color: url == "/shopping-cart.html" ? "red" : "null", paddingTop: "-20px" }} onClick={() => {
                            route.push("/shopping-cart.html");
                          }} className="btn">
                            <i style={{ marginTop: "6px" }} className="fa fa-shopping-cart" />
                          </button>
                        </>

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
                          route.push("/users/transaksi.html");
                        }} className="btn" style={{ border: "1px solid #DFDFDF", color: url.includes("/users") ? "red" : "null", }}>
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
      </header >


    </>
  );
};

export default Main_header;

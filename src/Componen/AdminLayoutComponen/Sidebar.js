import { useEffect, useState } from "react";
import Link from "next/link";
import { app_name } from "@/Utils/Config";
const Sidebar = (props) => {

  const url = window.location.pathname;

  const [uri, setUri] = useState("");
  useEffect(() => {
    setUri(url);
  }, [url]);

  return (
    <>
      <ul
        className={
          "navbar-nav sidebar " +
          (props.colMenu && " toggled ") +
          " sidebar-light accordion"
        }
        id="accordionSidebar"
      >
        <Link
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="/"
        >

          <div className="sidebar-brand-text mx-3">{app_name}</div>

        </Link>

        <li
          className={
            "nav-item" + " " + (uri == ("/admin") && " active " + " ")
          }
        >
          <Link
            href={"/admin/"}
            className="nav-link"

          >
            <i className="fas fa-fw fa-palette" />
            <span>Dashboard</span>
          </Link>
        </li>


        <hr className="sidebar-divider" />
        <div className="sidebar-heading">Features</div>


        <li
          className={
            "nav-item" + " " + (uri.includes("/produk") && " active " + " ")
          }
        >
          <Link
            href={"/admin/produk"}
            className="nav-link"

          >
            <i className="fas fa-fw fa-palette" />
            <span>Produk</span>
          </Link>
        </li>
        <li
          className={
            "nav-item" + " " + (uri.includes("/kategori") && " active " + " ")
          }
        >
          <Link
            href={"/admin/kategori"}
            className="nav-link"

          >
            <i className="fas fa-fw fa-palette" />
            <span>Kategori</span>
          </Link>
        </li>
        <li
          className={
            "nav-item" + " " + (uri.includes("/satuan") && " active " + " ")
          }
        >
          <Link
            href={"/admin/satuan"}
            className="nav-link"

          >
            <i className="fas fa-fw fa-palette" />
            <span>Satuan</span>
          </Link>
        </li>
        <li
          className={
            "nav-item" + " " + (uri.includes("/slide-show") && " active " + " ")
          }
        >
          <Link
            href={"/admin/slide-show"}
            className="nav-link"

          >
            <i className="fas fa-fw fa-palette" />
            <span>Slide Show</span>
          </Link>
        </li>
        <hr className="sidebar-divider" />
        <div className="sidebar-heading">Pembeli</div>
        <li
          className={
            "nav-item" + " " + (uri.includes("/home-builder") && " active " + " ")
          }
        >
          <Link
            href={"/admin/home-builder.html"}
            className="nav-link"

          >
            <i className="fas fa-fw fa-palette" />
            <span>Home builder</span>
          </Link>
        </li>
        <li
          className={
            "nav-item" + " " + (uri.includes("/pelanggan") && " active " + " ")
          }
        >
          <Link
            href={"/admin/pelanggan"}
            className="nav-link"

          >
            <i className="fas fa-fw fa-palette" />
            <span>Pelanggan</span>
          </Link>
        </li>

        <li
          className={
            "nav-item" + " " + (uri.includes("/transaksi") && " active " + " ")
          }
        >
          <Link
            href={"/admin/transaksi.html"}
            className="nav-link"

          >
            <i className="fas fa-fw fa-transaction" />
            <span>Trasaksi</span>
          </Link>
        </li>
        <hr className="sidebar-divider" />
        <li
          className={
            "nav-item" + " " + (uri.includes("/pengaturan") && " active " + " ")
          }
        >
          <Link
            href={"/admin/pengaturan.html"}
            className="nav-link"

          >
            <i className="fas fa-fw fa-cog" />
            <span>Pengaturan</span>
          </Link>
        </li>
      </ul>
      <div className="version" id="version-ruangadmin" >

      </div>

    </>
  );
};

export default Sidebar;

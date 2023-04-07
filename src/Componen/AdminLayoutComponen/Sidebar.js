import { useState } from "react";
import Link from "next/link";
import { app_name } from "@/Utils/Config";
const Sidebar = (props) => {
  useState(() => {
    console.log("realod");
  });

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
          <div className="sidebar-brand-icon">
            <img src="/img/logo/logo2.png" />
          </div>
          <div className="sidebar-brand-text mx-3">{app_name}</div>
        </Link>
        <li
          className={
            "nav-item" + " " + (props.menu == "dashboard" && " active " + " ")
          }
        >
          <Link
            href={"/admin/dashboard"}
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
            "nav-item" + " " + (props.menu == "produk" && " active " + " ")
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
            "nav-item" + " " + (props.menu == "kategori" && " active " + " ")
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
            "nav-item" + " " + (props.menu == "satuan" && " active " + " ")
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
            "nav-item" + " " + (props.menu == "slide_show" && " active " + " ")
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
            "nav-item" + " " + (props.menu == "home_builder" && " active " + " ")
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
            "nav-item" + " " + (props.menu == "pelanggan" && " active " + " ")
          }
        >
          <Link
            href={"/admin/pelanggan.html"}
            className="nav-link"

          >
            <i className="fas fa-fw fa-palette" />
            <span>Pelanggan</span>
          </Link>
        </li>

        <li
          className={
            "nav-item" + " " + (props.menu == "transaksi" && " active " + " ")
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
            "nav-item" + " " + (props.menu == "pengaturan" && " active " + " ")
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
      <div className="version" id="version-ruangadmin" />

    </>
  );
};

export default Sidebar;

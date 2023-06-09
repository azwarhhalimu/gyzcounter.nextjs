import { createContext, useContext, useEffect, useState } from "react";
import Height from "@/Utils/Height";
import Link from "next/link";
import Main_header from "./UserLayoutComponen/Main_header";
import { CKontext } from "./UserLayout";


const UsersLayout = ({ children }) => {

    const [id, setId] = useState("");
    useEffect(() => {
        const url = window.location.pathname.split("/");
        setId(url[2]);
    })
    const [updateMenuCart, setUpdateMenuCart] = useState(0);

    const [kontext, setKontext] = useState();

    const [menu, setMenu] = useState();
    return <CKontext.Provider value={{ kontext, setKontext }}>
        <div>
            <Main_header _updateMenuCart={updateMenuCart} menu={menu} />
            <Height height={100} />

            <div className="container">
                <div className="row">
                    <div id="admin-menu" className="col-lg-12" style={{ paddingTop: "10px" }} >
                        {/* <Link {...menu == "dashboard" && { "id": 'aktif-menu' }} to="/user/dashboard.html">Dashboard</Link>| */}
                        <Link {...id == "transaksi.html" && { id: 'aktif_menu' }} href="/users/transaksi.html">Transaksi</Link>|
                        <Link  {...id == "cart.html" && { id: 'aktif_menu' }} href="/users/cart.html">Keranjang Belanja Anda</Link>|
                        <Link  {...id == "setting.html" && { id: 'aktif_menu' }} href="/users/setting.html">Pengaturan</Link>

                    </div>
                </div>
            </div>
            <div style={{ marginTop: "10px", height: "1px", background: "#DFDFDF", width: "100%" }}></div>
            {children}
        </div>
    </CKontext.Provider>
}
export default UsersLayout;
"use client"
import { useEffect, useReducer, useState } from "react";
import Sidebar from "./AdminLayoutComponen/Sidebar";
import Link from "next/link";
import Nav_top from "./AdminLayoutComponen/Nav_top";
import Footer from "./AdminLayoutComponen/Footer";
import { useRouter } from "next/router";

const Admin_layout = ({ children }) => {
    const [menu, setMenu] = useState("");
    const [colMenu, setColMenu] = useState(false);

    const route = useRouter();
    const getUrl2 = window.location.pathname;
    const _cek = async () => {
        const getUrl = window.location.pathname;
        const c = sessionStorage.getItem("data_login_admin");
        console.log(c);
        if (!c) {

            if (getUrl != "/login-admin.html") {
                await sessionStorage.setItem('url_redirection', getUrl);
            }

            route.push("/login-admin.html");
            return;
        }

    }
    useEffect(() => {
        _cek();
    }, [getUrl2])
    return (<>
        <div style={{ fontSize: "16px" }}>
            <div id="page-top sidebar-toggled">
                <div id="wrapper">
                    {/* Sidebar */}
                    <Sidebar menu={menu} colMenu={colMenu} />
                    {/* Sidebar */}
                    <div id="content-wrapper" className="d-flex flex-column">
                        <div id="content">
                            {/* TopBar */}
                            <Nav_top setColMenu={setColMenu} colMenu={colMenu} />
                            {/* Topbar */}
                            {/* Container Fluid*/}

                            {children}

                            {/*-Container Fluid*/}
                        </div>
                        {/* Footer */}
                        <Footer />
                        {/* Footer */}
                    </div>
                </div>

                {/* Scroll to top */}
                <a className="scroll-to-top rounded" href="#page-top">
                    <i className="fas fa-angle-up" />
                </a>
            </div>
        </div>
    </>);
}

export default Admin_layout;
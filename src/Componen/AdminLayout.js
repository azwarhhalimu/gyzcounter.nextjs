import { useState } from "react";
import Sidebar from "./AdminLayoutComponen/Sidebar";
import Link from "next/link";
import Nav_top from "./AdminLayoutComponen/Nav_top";
import Footer from "./AdminLayoutComponen/Footer";

const Admin_layout = ({ children }) => {
    const [menu, setMenu] = useState("");
    const [colMenu, setColMenu] = useState(false);
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
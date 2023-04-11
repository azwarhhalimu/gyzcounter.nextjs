import { createContext, useState } from "react";
import { isMobile } from "react-device-detect";
import Footer from "./UserLayoutComponen/Footer";
import Main_header from "./UserLayoutComponen/Main_header";
import dynamic from "next/dynamic";

export const CKontext = createContext(null);
const UserLayout = ({ children }) => {
    const Main_header = dynamic(
        () => import("../Componen/UserLayoutComponen/Main_header"),
        { ssr: false }
    )
    const [updateMenuCart, setUpdateMenuCart] = useState(0);
    const [menu, setMenu] = useState("");

    return (
        <>

            <CKontext.Provider value={{ updateMenuCart, setUpdateMenuCart }}>
                {!isMobile && <Main_header _updateMenuCart={updateMenuCart} menu={menu} />}
                <div>

                    {children}

                </div>

                {!isMobile && <Footer />}

            </CKontext.Provider>



        </>
    );
}

export default UserLayout;
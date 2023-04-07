import { useState } from "react";
import { isMobile } from "react-device-detect";
import Footer from "./UserLayoutComponen/Footer";
import Main_header from "./UserLayoutComponen/Main_header";
const UserLayout = ({ children }) => {
    const [updateMenuCart, setUpdateMenuCart] = useState(0);
    const [menu, setMenu] = useState("");
    return (
        <>


            {!isMobile && <Main_header _updateMenuCart={updateMenuCart} menu={menu} />}
            {children}
            {!isMobile && <Footer />}


        </>
    );
}

export default UserLayout;
import { useEffect } from "react";
import { useOutletContext } from "react-router-dom";

const Set_menu = (menu) => {
    const [setMenu]=useOutletContext();
    useEffect(()=>{
        setMenu(menu)
    }
    
    ,[])
}
 
export default {Set_menu};
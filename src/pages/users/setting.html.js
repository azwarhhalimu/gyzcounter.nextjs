import { useEffect, useState } from "react";
import Height from "@/Utils/Height";
import Ubah_username from "./Ubah_username";
import Ubah_password from "./Ubah_password";

const Setting = () => {

    useEffect(() => {


    }, [])
    const [page, setPage] = useState("ubah_username");
    return <>
        <Height height={20} />
        <div className="container">
            <div className="row">
                <div className="col-lg-4" >
                    <button
                        onClick={() => {
                            setPage("ubah_username")
                        }}
                        className="btn btn-default">Ubah Username</button>
                    {" "}
                    <button
                        onClick={() => {
                            setPage("ubah_password")
                        }}
                        className="btn btn-default">Ubah Password</button>
                    <hr />
                    <div>
                        {page == "ubah_username" ?
                            <Ubah_username />
                            :
                            <Ubah_password />}
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Setting;
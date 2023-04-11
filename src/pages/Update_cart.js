import axios from "axios";
import { useState } from "react"
import Autentifkasi from "@/Utils/Autentifikasi";
import { baseUrl } from "@/Utils/Config";
import Height from "@/Utils/Height";
import qs from "query-string";
import { encryptAES } from "@/Utils/enkripsi";
import { isMobile } from "react-device-detect";

const Update_cart = ({ id_cart, jumlah, callBack, reset }) => {
    const [jml, setJml] = useState(jumlah);
    const _submit = (e) => {
        e.preventDefault();
        new Autentifkasi().createHeader().then((bearer) => {
            var data = {
                "id_cart": id_cart,
                "jumlah": jml,
            }
            axios.post(baseUrl("user/update_cart"),
                qs.stringify({
                    "data": encryptAES(data)
                }),
                {
                    headers: {
                        "Authorization": bearer
                    }
                }
            )
                .then((respon) => {
                    if (respon.data.status == "cart_update") {
                        callBack();
                        isMobile && reset();
                        window.alert("Updated");
                    }
                });
        });
    }
    return <><form onSubmit={_submit}>
        <input
            autoFocus={true}
            onChange={(e) => { setJml(e.target.value) }}
            type="number" value={jml} className="form-control" style={{
                textAlign: "center",
                width: "100px"
            }} />

        <Height height={10} />
        <button type="sumbmit" className="btn btn-sm btn-primary">Update</button>
        <button type="button" onClick={() => {
            callBack();
        }} className="btn btn-sm btn-link">Batal</button>

    </form></>
}

export default Update_cart
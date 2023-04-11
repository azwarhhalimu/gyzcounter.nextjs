import axios from "axios";
import { useState } from "react";
import Autentifkasi from "@/Utils/Autentifikasi";
import { baseUrl } from "@/Utils/Config";
import Height from "@/Utils/Height";
import qs from "query-string";
import { dencryptAES, encryptAES } from "@/Utils/enkripsi";
import { SessionManager } from "@/Utils/SessionManager";
import Loading_save from "@/Utils/Loading_save";

export default function Ubah_username() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const _submit = (e) => {
        e.preventDefault();
        setIsLoading(true);
        const data_user = new SessionManager().getUser();

        new Autentifkasi().createHeader().then(bearer => {
            const data = {
                "username": username,
                "username_lama": data_user["email"],
                "password": password
            };
            axios.post(baseUrl("user/update_username"),
                qs.stringify(
                    { "data": encryptAES(data) }
                ),
                {
                    headers: {
                        "Authorization": bearer
                    }
                }
            ).then(respon => {
                setIsLoading(false);
                if (respon.data.status == "username_changed") {


                    var callback = respon.data.callBackData;

                    window.sessionStorage.setItem("data_login", callback);
                    window.alert("Username berhasil di ganti");
                }
                else {
                    alert(respon.data.pesan);
                }
            })
        });
    }
    return <>
        <Height height={20} />
        <form onSubmit={_submit}>
            <div className="form-group">
                <label htmlFor="exampleInputEmail1">Username</label>
                <input
                    onChange={(e) => {
                        setUsername(e.target.value);
                    }}
                    required autoComplete="false" autoSave="false" className="form-control" type="email" placeholder="Masukkan username baru" />
            </div>

            <div className="form-group">
                <label htmlFor="exampleInputPassword1">Password Anda saat ini</label>
                <input
                    onChange={(e) => {
                        setPassword(e.target.value);
                    }}
                    required autoComplete="false" autoSave="false" type="password" className="form-control" placeholder="Masukkan password anda saat ini." />
            </div>

            {isLoading ? <Loading_save text={"Mengupdate"} /> : <button type="submit" className="btn btn-primary">Update Username</button>}
        </form>

    </>
}
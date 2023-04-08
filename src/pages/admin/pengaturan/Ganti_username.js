import { useState } from "react";
import Height from "@/Utils/Height";
import Autentifkasi from "@/Utils/Autentifikasi";
import axios from "axios";
import { baseUrl } from "@/Utils/Config";
import qs from "query-string";
import { dencryptAES } from "@/Utils/enkripsi";
import Head from "next/head";

export default function Ganti_username() {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const _updateUsername = async (e) => {


        e.preventDefault();
        const c = await new Autentifkasi().getAdmin_info();

        new Autentifkasi().createHeaderAdmin().then(bearer => {
            axios.post(baseUrl('admin/ganti_username'),
                qs.stringify({
                    "username": username,
                    "username_lama": c["username"],
                    "password": password
                }),

                {
                    headers: {
                        "Authorization": bearer
                    }
                }
            ).then(respon => {
                if (respon.data.status == "username_updated") {
                    window.sessionStorage.setItem("data_login_admin",
                        dencryptAES(respon.data.data));
                    alert(respon.data.pesan);

                }
                else {
                    alert(respon.data.pesan);
                }
            })


        })
    }
    return <>
        <Head>
            <title>Ganti Username</title>
        </Head>
        <div className="col-lg-5" style={{ margin: "auto" }}>
            <Height height={50} />
            {/* Form Basic */}
            <div className="card mb-4">
                <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                    <h6 className="m-0 font-weight-bold text-primary">Ganti Username</h6>
                </div>
                <div className="card-body">
                    <form onSubmit={_updateUsername}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Username Baru</label>
                            <input
                                onChange={(e) => {
                                    setUsername(e.target.value)
                                }}
                                required
                                type="text" className="form-control" placeholder="Masukkan username baru" />

                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Password anda saat ini</label>
                            <input type="password"
                                required
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                }}
                                className="form-control" placeholder="Masukkan username baru" />
                            <small id="emailHelp" className="form-text text-muted">Pastikan masukkan password dengan benar</small>
                        </div>

                        <button type="submit" className="btn btn-primary">Update Username</button>
                    </form>
                </div>
            </div>
        </div>

    </>
}
import { useState } from "react";
import Height from "@/Utils/Height";
import Autentifkasi from "@/Utils/Autentifikasi";
import axios from "axios";
import { baseUrl } from "@/Utils/Config";
import qs from "query-string";
import Head from "next/head";

export default function Ganti_password() {

    const [password, setPassword] = useState("");
    const [passwordLama, setPassworLama] = useState("");
    const _gantiPassword = async (e) => {
        e.preventDefault();
        var c = await new Autentifkasi().getAdmin_info();
        new Autentifkasi().createHeaderAdmin().then(bearer => {
            axios.post(baseUrl("admin/ganti_password"),
                qs.stringify({
                    "username": c["username"],
                    "password": password,
                    "password_lama": passwordLama,
                }),
                {
                    headers: {
                        "Authorization": bearer
                    }
                }
            )
                .then(respon => {
                    if (respon.data.status == "password_changed") {
                        window.alert(respon.data.pesan);

                    }
                    else {
                        window.alert(respon.data.pesan);
                    }
                })
        })
    }
    return <>
        <Head>
            <title>Ganti Password</title>
        </Head>
        <Height height={40} />
        <div className="row">

            <div className="col-lg-5" style={{ margin: "auto" }}>
                <div className="card mb-4">
                    <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                        <h6 className="m-0 font-weight-bold text-primary">Ganti Password</h6>
                    </div>
                    <div className="card-body">
                        <form onSubmit={_gantiPassword}>

                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password Baru</label>
                                <input
                                    required
                                    onChange={(e) => {
                                        setPassword(e.target.value);
                                    }}
                                    type="password" className="form-control" placeholder="Masukkan password baru anda" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="exampleInputPassword1">Password Anda Saat Ini</label>
                                <input
                                    required
                                    onChange={(e) => {
                                        setPassworLama(e.target.value);
                                    }}
                                    type="password" className="form-control" placeholder="Masukkan password anda saat ini" />
                            </div>


                            <button type="submit" className="btn btn-primary">Ganti Password</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </>
}
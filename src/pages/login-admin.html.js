import Autentifkasi from "@/Utils/Autentifikasi";
import axios from "axios";
import qs from 'query-string';
import { baseUrl } from "@/Utils/Config";
import { useState } from "react";
import { encryptAES } from "@/Utils/enkripsi";
import Link from "next/link";
import { useRouter } from "next/router";

const Login_admin = () => {
    const route = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");


    const _login = (e) => {

        const data = { "username": username, "password": password };
        e.preventDefault();

        new Autentifkasi().adminHeader().then((bearer) => {
            axios.post(baseUrl("auth/login_admin"),
                qs.stringify({
                    "data": encryptAES(data)
                }),
                {
                    headers: {
                        "Authorization": bearer
                    }
                }
            ).then((respon) => {
                if (respon.data.status == "login_success") {


                    window.sessionStorage.setItem("data_login_admin", respon.data.data);

                    window.alert("Login berhasil");

                    route.push("/" + "admin");
                }
                else {
                    window.alert("Username atau password tidak benar");
                }
            })

        })
    }
    return (<>
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-xl-5 col-lg-12 col-md-9">
                    <br />
                    <br />
                    <br />
                    <h5 align="center">GyzCounter</h5>
                    <div className="card shadow-sm my-5">
                        <div className="card-body p-0">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="login-form">
                                        <div className="text-center">
                                            <h1 className="h5 text-gray-900 mb-4">Login Administrator</h1>
                                        </div>
                                        <form onSubmit={_login} className="user">
                                            <div className="form-group">
                                                <input
                                                    onChange={(e) => {
                                                        setUsername(e.target.value);
                                                    }}
                                                    autoComplete={"off"}
                                                    type="text" required className="form-control" placeholder="Masukkan username anda" />
                                            </div>
                                            <div className="form-group">
                                                <input
                                                    onChange={(e) => {
                                                        setPassword(e.target.value);
                                                    }}
                                                    autoComplete={"off"}
                                                    type="password" required className="form-control" placeholder="Password" />
                                            </div>
                                            <div className="form-group">
                                                <div className="custom-control custom-checkbox small" style={{ lineHeight: '1.5rem' }}>
                                                    <input type="checkbox" className="custom-control-input" id="customCheck" />
                                                    <label className="custom-control-label" htmlFor="customCheck">Remember
                                                        Me</label>
                                                </div>
                                            </div>
                                            <div className="form-group">
                                                <button type="submit" className="btn btn-primary btn-block">Login</button>
                                            </div>


                                        </form>
                                        <center><Link href="/">Kembali Ke Home</Link></center>


                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>);

}

export default Login_admin;
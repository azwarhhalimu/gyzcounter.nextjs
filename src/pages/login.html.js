import { useState, useEffect } from "react";
import axios from "axios";
import { baseUrl } from "@/Utils/Config";
import Link from "next/link";
import Height from "@/Utils/Height";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/router";
import Head from "next/head";
import qs from "query-string";
import { encryptAES } from "@/Utils/enkripsi";
import Loading_save from "@/Utils/Loading_save";
const Login = () => {
    const route = useRouter();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const [loading, setLoading] = useState(false);

    useEffect(() => {

    }, [])

    const _login = (e) => {
        setLoading(true);
        e.preventDefault();
        axios.post(baseUrl("auth/login"),
            qs.stringify({
                "username": username,
                "password": password
            })
        ).then((respon) => {

            setLoading(false);
            if (respon.data.status == "login_ok") {

                window.sessionStorage.setItem("data_login", (respon.data.data));
                window.alert("Login berhasil");

            }
            else {
                window.alert("Login gagal");
            }
        });
    }
    return (

        <>
            <Head>
                <title>Login</title>
            </Head>
            <section className="section" style={{ marginTop: "0px", marginBottom: "0px" }} id="reservation">

                <div className="container">
                    <div className="row">
                        {!isMobile && <div className="col-lg-7 align-self-center">
                            <button onClick={() => {
                                route.push("/");
                            }} className="btn btn-primary">
                                <i className="fa fa-home" />{" "}
                                Back Home</button>
                            <Height height={40} />
                            <div className="left-text-content">
                                <div style={{ fontWeight: "bold", color: "#FFF", fontSize: "25px" }}>GyzCounterCv.com</div>
                                <Height height={20} />
                                <div className="section-heading">
                                    <h6>Silahkan login dahulu</h6>
                                    <h2></h2>
                                </div>
                                <p>Jika anda punya pertanyaan, janga ragu untuk hubungi kami pada kontak di bawa ini.</p>
                                <div className="row">
                                    <div className="col-lg-6">
                                        <div className="phone">
                                            <i className="fa fa-phone" />
                                            <h4>Phone Numbers</h4>
                                            <span><a href="#">080-090-0990</a><br /><a href="#">080-090-0880</a></span>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="message">
                                            <i className="fa fa-envelope" />
                                            <h4>Emails</h4>
                                            <span><a href="#">hello@company.com</a><br /><a href="#">info@company.com</a></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>}

                        <div className="col-lg-5">
                            {isMobile && <>
                                <button onClick={() => {
                                    route.push("/");
                                }} className="btn btn-primary">
                                    <i className="fa fa-home" />{" "}
                                    Back Home</button>
                            </>}
                            <div className="contact-form">
                                <form onSubmit={_login} id="contact" action method="post">
                                    <div className="row">
                                        <div className="col-lg-12">
                                            <h4>Login </h4>
                                        </div>
                                        <div className="col-lg-12 col-sm-12">
                                            <fieldset>
                                                <input
                                                    onChange={(e) => {
                                                        setUsername(e.target.value);
                                                    }}
                                                    name="name" type="text" id="name" placeholder="Username" required />
                                            </fieldset>
                                        </div>
                                        <div className="col-lg-12 col-sm-12">
                                            <fieldset>
                                                <input
                                                    onChange={(e) => {
                                                        setPassword(e.target.value);
                                                    }}
                                                    name="text" type="text" placeholder="Password" required />
                                            </fieldset>
                                        </div>

                                        <div className="col-lg-12">
                                            <div style={{ height: "10px" }} />

                                            {loading ? <center>
                                                <Loading_save text={"Mencoba login..."} />
                                            </center>
                                                :
                                                <button type="submit" id="form-submit" className="main-button-icon">Login Sekarang</button>
                                            }

                                            <br />
                                            <br />
                                            <center>Atau</center>

                                            <div style={{ height: "30px" }} />
                                            <button type="button" onClick={() => {
                                                _login();
                                            }} id="form-submit" style={{ background: "#FFF", color: "#1783FF", border: "1px solid #1783FF" }} className="btn-primary main-button-icoxn"><i className="fa fa-google" /> Login Dengan Google</button>
                                            <Height height={20} />
                                            <div>Belumn punya akun ?
                                                {" "}
                                                <Link href={"/daftar.html"}>Daftar Disini</Link>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <Height height={51.5} />
            </section>
        </>
    );
}

export default Login;
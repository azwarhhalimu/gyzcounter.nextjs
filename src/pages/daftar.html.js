
import Height from "@/Utils/Height";
import { useState } from "react";
import axios from "axios";
import qs from "query-string";
import { baseUrl } from "@/Utils/Config";
import { useRouter } from "next/router";

const Daftar = () => {

    const rotue = useRouter();
    const [nama, setNama] = useState();
    const [jenisKelamin, setJenisKelamin] = useState();
    const [email, setEmail] = useState();
    const [no_handphone, setNo_handphone] = useState();
    const [alamat, setAlamat] = useState();
    const [password, setPassword] = useState();

    const _submit = (e) => {
        e.preventDefault();
        axios.post(baseUrl("auth/daftar"), qs.stringify({
            "nama": nama,
            "jenis_kelamin": jenisKelamin,
            "email": email,
            "no_handphone": no_handphone,
            "alamat": alamat,
            "password": password
        })).then((respon) => {
            if (respon.data.status == "email_already") {
                window.alert("Email yang anda masukkan sudah di gunakan");
            }
            else if (respon.data.status == "no_handphone_already") {
                window.alert("Nomor Handphone yang anda masukkan sudah di gunakan");
            }
            else if (respon.data.status == "user_saved") {
                window.alert("Daftar Berhasil, Silahkan login kembali");
                navigasi("/login.html");


            }
        })
    }

    return <>
        <section className="section" style={{ marginTop: "0px" }} id="reservation">
            <div className="container">
                <div className="row">

                    <div className="col-sm-5" style={{ margin: "auto" }}>
                        <div style={{
                            paddingLeft: "30px",
                            paddingBottom: "20px"
                        }}>
                            <button
                                onClick={() => {
                                    rotue.back();
                                }}
                                className="btn btn-danger"><i className="fa fa-chevron-left" /> Kembali</button>
                        </div>
                        <div className="contact-form">
                            <form onSubmit={_submit} id="contact" action method="post">
                                <div className="row">

                                    <div className="col-lg-12">
                                        <h4>Daftar </h4>
                                    </div>
                                    <div className="col-lg-12 col-sm-12">
                                        <fieldset>

                                            <input name="name"
                                                onChange={(e) => {
                                                    setNama(e.target.value);
                                                }}
                                                type="text" id="name" placeholder="Nama Lengkap" required />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12 col-sm-12">
                                        <fieldset>
                                            <select onChange={(e) => {
                                                setJenisKelamin(e.target.value);
                                            }} className="">
                                                <option value="">--Pilih Jenis Kelamin--</option>
                                                <option value="laki-laki">Laki-laki</option>
                                                <option value="perempuan">Perempuan</option>
                                            </select>
                                        </fieldset>
                                    </div>

                                    <div className="col-lg-12 col-sm-12">
                                        <fieldset>
                                            <input

                                                onChange={(e) => {
                                                    setAlamat(e.target.value);
                                                }}
                                                name="name" type="text" id="name" placeholder="Alamat Anda" required />
                                        </fieldset>
                                    </div>
                                    <Height height={40} />
                                    <div className="col-lg-12 col-sm-12">
                                        <fieldset>
                                            <input
                                                onChange={(e) => {
                                                    setEmail(e.target.value);
                                                }}
                                                name="name" type="email" id="name" placeholder="Email" required />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12 col-sm-12">
                                        <fieldset>
                                            <input
                                                onChange={(e) => {
                                                    setNo_handphone(e.target.value);
                                                }}
                                                name="name" type="text" id="name" placeholder="Nomor Handphone" required />
                                        </fieldset>
                                    </div>
                                    <div className="col-lg-12 col-sm-12">
                                        <fieldset>
                                            <input
                                                onChange={(e) => {
                                                    setPassword(e.target.value);
                                                }}
                                                type="password" placeholder="Masukkan password anda" required />
                                        </fieldset>
                                    </div>

                                    <div className="col-lg-12">
                                        <div style={{ height: "10px" }} />

                                        <button type="submit" id="form-submit" className="main-button-icon">Daftar Sekarang</button>


                                    </div>

                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    </>
}
export default Daftar;
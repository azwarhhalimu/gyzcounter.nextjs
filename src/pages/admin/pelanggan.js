import axios from "axios";
import { useEffect, useState } from "react"
import Autentifkasi from "@/Utils/Autentifikasi";
import { baseUrl, path_admin, urlEncode } from "@/Utils/Config";
import { encryptAES } from "@/Utils/enkripsi";
import qs from "query-string";
import Loading_save from "@/Utils/Loading_save";
import { useRouter } from "next/router";

export default function Pelanggan() {
    const route = useRouter();
    const [data, setData] = useState([]);
    const [reload, setReload] = useState(0);
    const [ubah, setUbah] = useState("");
    const _getData = () => {
        new Autentifkasi().createHeaderAdmin().then(bearer => {
            axios.post(baseUrl("admin/get_pelanggan"),
                {},
                {
                    headers: {
                        "Authorization": bearer
                    }
                }
            ).then(respon => {
                setData(respon.data.data);
            });
        })
    }
    useEffect(() => {

        _getData();
    }, [reload]);
    const _chageStatus = (id, status) => {
        const confirm = window.confirm("Apakah anda ingin mengganti status user ini?");
        if (confirm) {
            setUbah(id);
            var datax = {
                "id_user": id,
                "status": status == 0 ? 1 : 0
            }
            new Autentifkasi().createHeaderAdmin().then(bearer => {
                axios.post(baseUrl("admin/ChangeStatusPelanggan"),

                    qs.stringify({
                        "data": encryptAES(datax)
                    }),

                    {
                        headers: {
                            "Authorization": bearer
                        }
                    }
                ).then((respon) => {
                    setUbah("");
                    if (respon.data.status == "status_berhasil_diganti") {
                        setReload(reload + 1);
                        window.alert("Status berhasil di ganti");

                    }
                })
            })
        }
    }
    return <>
        <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Data Pelanggan</h1>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="./">Dashboard</a></li>
                    {/* <li className="breadcrumb-item">Pages</li> */}
                    <li className="breadcrumb-item active" aria-current="page">Pelanggan</li>
                </ol>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <table className="table">
                        <thead>
                            <tr style={{ fontWeight: "bold" }}>
                                <td>No</td>
                                <td>Nama</td>
                                <td>Jenis Kelamin</td>
                                <td>Email/Username</td>
                                <td>Nomor Handphone</td>
                                <td>Alamat</td>
                                <td></td>

                            </tr>
                        </thead>
                        <tbody>
                            {data.map((list, index) => (
                                <tr key={index + "ba"} {...list["status_pelanggan"] == 1 && { style: { color: "red" } }}>
                                    <td>{index + 1}</td>
                                    <td>{list["nama"]}</td>
                                    <td>{list["jenis_kelamin"]}</td>
                                    <td>{list["email"]}</td>
                                    <td>{list["no_handphone"]}</td>
                                    <td>{list["alamat"]}</td>
                                    <td style={{ textAlign: "right" }}>
                                        <button onClick={() => {
                                            navigasi("/" + path_admin + "/" + list["id_user"] + "/transaksi/" + urlEncode(list["nama"]) + ".html", {
                                                state: {
                                                    "nama": list["nama"]
                                                }
                                            });
                                        }} className="btn">Transaksi</button>
                                        {ubah == list["id_user"] ? <Loading_save text={"Mengganti status"} /> : <button
                                            onClick={() => {
                                                _chageStatus(
                                                    list["id_user"], list['status_pelanggan']
                                                );
                                            }}
                                            className={list["status_pelanggan"] == 0 ? "btn btn-danger" : "btn btn-primary"}>{list["status_pelanggan"] == 0 ? "Non Aktifkan" : "Aktifkan"}</button>}

                                    </td>
                                </tr>
                            ))}

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    </>
}
import axios from "axios";
import Autentifkasi from "@/Utils/Autentifikasi";
import { baseUrl } from "@/Utils/Config";
import { encryptAES } from "@/Utils/enkripsi";
import { SessionManager } from "@/Utils/SessionManager";
import qs from "query-string";
import { useEffect, useState } from "react";
import Height from "@/Utils/Height";
import No_data from "@/Widget/No_data";

const Transaksi_user = () => {
    const [data, setData] = useState([]);
    const _getData = () => {
        new Autentifkasi().createHeader().then((bearer) => {
            axios.post(baseUrl("user/get_transaksi"),
                qs.stringify({
                    "data": encryptAES(new SessionManager().getUser()["id_user"]),
                }),
                {
                    headers: {
                        "Authorization": bearer
                    }
                }
            ).then((respon) => {
                setData(respon.data.data);
            })
        })
    }
    useEffect(() => {

        _getData();
    }, [])
    return <>
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    <Height height={20} />
                    <div className="card">
                        <div className="card-header">
                            <h4>Data Transaksi</h4>
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr style={{ fontWeight: "bold" }}>
                                        <td>No</td>
                                        <td>Kode Transaksi</td>
                                        <td>Nama</td>
                                        <td>Nomor Handphone</td>
                                        <td>Total


                                        </td>
                                        <td>Metedo Pengiriman</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((list, index) => (
                                        <tr key={index + "abcgit"}>
                                            <td>{index + 1}</td>
                                            <td>{list["id_transaksi"]}</td>
                                            <td>{list["nama"]}</td>
                                            <td>{list["no_handphone"]}</td>
                                            <td>{list["total"]}</td>
                                            <td>{list["metode_pengiriman"]}
                                                <div><span className="badge badge-success">{list["tanggal_transaksi"]}</span></div>
                                            </td>
                                        </tr>
                                    ))}

                                </tbody>

                            </table>
                            {data.length == 0 && <No_data title={"Oppszzz...."} text={"Data transaksi masih kosong"} />}
                        </div>
                    </div>


                </div>
            </div>
        </div>
    </>
}
export default Transaksi_user;
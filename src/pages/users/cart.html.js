import axios from "axios";
import { useEffect, useState } from "react";
import Autentifkasi from "@/Utils/Autentifikasi";
import { baseUrl } from "@/Utils/Config";
import { dencryptAES, encryptAES } from "@/Utils/enkripsi";
import { SessionManager } from "@/Utils/SessionManager";
import qs from "query-string";
import Height from "@/Utils/Height";
const Keranjang_belanja_user = () => {
    const [data, setData] = useState([]);
    const [total, setTotal] = useState("");
    useEffect(() => {
        _getData();
    }, [])
    const _getData = () => {
        new Autentifkasi().createHeader().then((bearer) => {
            axios.post(baseUrl("user/get_shopping_cart"), qs.stringify(

                {
                    "data": encryptAES(new SessionManager().getUser()["id_user"])
                }
            ), {
                headers: {
                    "Authorization": bearer
                }
            }).then((respon) => {
                setData(dencryptAES(respon.data.data));
                setTotal(respon.data.total);
            })
        })
    }
    return <>
        <Height height={50} />
        <div className="container">
            <div className="row">
                <div className="col-lg-12">

                    <div>
                        <h4>Keranjang Belanja Anda</h4>
                        <Height height={20} />
                    </div>
                    <div className="card">
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr style={{ fontWeight: "bold" }}>
                                        <td></td>
                                        <td>Nama Produk</td>
                                        <td>Jumlah</td>
                                        <td>Harga Satuan</td>
                                        <td>Sub Total</td>
                                        <td></td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((list, index) => (
                                        <tr>
                                            <td>{index + 1}</td>
                                            <td>{list["nama_produk"]}</td>
                                            <td>{list['jumlah']}</td>
                                            <td>{list["harga_satuan"]}</td>
                                            <td>{list["total"]}</td>
                                            <td></td>
                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                            <div style={{ textAlign: "right" }}>
                                Total : {total}
                            </div>
                            <Height height={20} />
                            <button onClick={() => {
                                navigasi("/selesaikan-transaksi.html");
                            }} className="btn btn-success">Bayar Sekarang</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Keranjang_belanja_user;
import axios from "axios";
import { useEffect, useState } from "react"
import Autentifkasi from "@/Utils/Autentifikasi";
import { baseUrl, path_admin } from "@/Utils/Config";
import qs from "query-string";
import Height from "@/Utils/Height";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Lihat_transaksi() {
    const route = useRouter();

    const [subTransaksi, setSubTransaksi] = useState([]);

    const [id, setId] = useState("");
    const [data, setData] = useState({});
    useEffect(() => {

        const url = window.location.pathname;
        _lihatTransaksi(url.split("/")[3].replace(".html", ""));
        setId(url.split("/")[3].replace(".html", ""));
    }, []);

    const _lihatTransaksi = (id) => {

        new Autentifkasi().createHeaderAdmin().then(bearer => {
            axios.post(baseUrl("admin/lihat_transaksi"),
                qs.stringify({
                    "id_transaksi": id
                }),
                {
                    headers: {
                        "Authorization": bearer
                    }
                }
            ).then(respon => {
                setData(respon.data);
                setSubTransaksi(respon.data.data);
            })
        })
    }
    return <>
        <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <button
                    onClick={() => {
                        route.back();
                    }}
                    className="btn btn-danger"><i className="fa fa-chevron-left" />Kembali</button>
                <h1 className="h3 mb-0 text-gray-800">Lihat Transaksi</h1>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link href={"/admin"}>Dashboard</Link></li>
                    <li className="breadcrumb-item">Transaksi</li>
                    <li className="breadcrumb-item active" aria-current="page">Lihat Transaksi</li>
                </ol>
            </div>

            <div className="card" style={{ minHeight: "20px" }}>
                <div className="card-header">
                    <h5>Data Transaksi #{id}</h5>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>

                            <tr>
                                <td>Nama</td>
                                <td>:</td>
                                <td>{data["nama"]}</td>
                            </tr>
                            <tr>
                                <td>Alamat</td>
                                <td>:</td>
                                <td>{data["alamat"]}</td>
                            </tr>
                            <tr>
                                <td>Nomor Handphone</td>
                                <td>:</td>
                                <td>{data['no_handphone']}</td>
                            </tr>
                            <tr>
                                <td>Total</td>
                                <td>:</td>
                                <td>{data["total"]}</td>
                            </tr>
                            <tr>
                                <td>Metode Pengiriman</td>
                                <td>:</td>
                                <td>{data["metode_pengiriman"]}</td>
                            </tr>
                            <tr>
                                <td>Menunggu Pembayaran</td>
                                <td>:</td>
                                <td>{data["status"]}</td>
                            </tr>
                        </thead>
                    </table>
                    <Height height={30} />
                    <table className="table">
                        <thead>
                            <tr>
                                <td>No</td>
                                <td>Nama Produk</td>
                                <td>Harga</td>
                                <td>Jumlah</td>
                                <td>Total</td>
                            </tr>
                        </thead>
                        <tbody>
                            {subTransaksi.map((list, index) => (
                                <tr key={index + "df"}>
                                    <td>{index + 1}</td>
                                    <td>{list["nama_produk"]}</td>
                                    <td>Rp. {list["harga"]}</td>
                                    <td>{list["jumlah"]}</td>
                                    <td>Rp. {list["total"]}</td>
                                </tr>
                            ))}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    </>
}
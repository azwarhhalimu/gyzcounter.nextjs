
import axios from "axios";
import { useEffect, useState } from "react";
import Autenfikasi from "@/Utils/Autentifikasi";
import { baseUrl, path_admin } from "@/Utils/Config";
import Link from "next/link";
import Head from "next/head";
export default function Transaksi() {

    const [data, setData] = useState([]);
    useEffect(() => {

        _getTransaksi();
    }, [])
    const _getTransaksi = () => {
        new Autenfikasi().createHeaderAdmin().then(berear => {
            axios.post(baseUrl("admin/get_transaksi"),
                {},
                {
                    headers: {
                        "Authorization": berear
                    }
                }
            ).then(respon => {
                setData(respon.data.data);
            })
        })
    }
    return <>
        <Head>
            <title>Transaksi Pengguna</title>
        </Head>
        <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Transaksi</h1>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="./">Home</a></li>
                    <li className="breadcrumb-item">Pages</li>
                    <li className="breadcrumb-item active" aria-current="page">Blank Page</li>
                </ol>
            </div>
            <div className="card" style={{ minHeight: "10px ,mn" }}>
                <div className="card-header">
                    <div style={{ fontWeight: "bold" }}>Data Transaksi Pelanggan</div>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr style={{ fontWeight: "bold" }}>
                                <td>No</td>
                                <td>Nama</td>
                                <td>Alamat</td>
                                <td>Total</td>
                                <td>Metode Pengiriman</td>
                                <td></td>
                            </tr>
                        </thead>
                        <thead>
                            {data.map((list, index) => (
                                <tr key={index + "9vkjfof"}>
                                    <td>{index + 1}</td>
                                    <td>{list["nama"]}</td>
                                    <td>{list["alamat"]}</td>
                                    <td>{list["total"]}</td>
                                    <td>{list["metode_pengiriman"]}</td>
                                    <td style={{ textAlign: "right" }}>
                                        <Link href={"/admin/transaksi/" + list["id_transaksi"] + ".html"} className="btn btn-primary">Lihat</Link>
                                    </td>
                                </tr>
                            ))}

                        </thead>
                    </table>
                </div>
            </div>
        </div>
    </>
}
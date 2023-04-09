import { useEffect, useState } from "react";
import Autentifkasi from "@/Utils/Autentifikasi";
import axios from "axios";
import { baseUrl, path_admin } from "@/Utils/Config";
import qs from 'query-string';
import { Router, useRouter } from "next/router";

export default function Transaksi_pengguna() {


    const route = useRouter();
    const [data, setData] = useState([]);

    const [id, setId] = useState("")
    useEffect(() => {
        const url = window.location.pathname.split("/")[3];
        setId(url);
        console.log(url);

        _lihat_transaksi_user(url);
    });
    const _lihat_transaksi_user = (id) => {
        new Autentifkasi().createHeaderAdmin().then(bearer => {
            axios.post(baseUrl("admin/lihat_transaksi_user"),
                qs.stringify({
                    "id_user": id
                }),
                {
                    headers: {
                        "Authorization": bearer
                    }
                }
            )
                .then(respon => {
                    setData(respon.data.data);
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
                <h1 className="h3 mb-0 text-gray-800">Data Transaksi Pengguan</h1>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="./">Home</a></li>
                    <li className="breadcrumb-item">{"fd"}</li>
                    <li className="breadcrumb-item active" aria-current="page">Blank Page</li>
                </ol>
            </div>
            <div className="col-lg-12">
                <div style={{ minHeight: "10px" }} className="card">
                    <div className="card-header">
                        <div>Transaksi Pengguna</div>
                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr style={{ fontWeight: "bold" }}>
                                    <td>No</td>
                                    <td>Nama</td>
                                    <td>Alamat</td>
                                    <td>Nomor Handphone</td>
                                    <td>Total</td>
                                    <td>Metode Pnegiriman </td>
                                    <td>Tanggal</td>
                                    <td></td>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((list, index) => (
                                    <tr>
                                        <td>{index + 1}</td>
                                        <td>{list["nama"]}</td>
                                        <td>{list["alamat"]}</td>
                                        <td>{list["no_handphone"]}</td>
                                        <td>Rp. {list["total"]}</td>
                                        <td>{list["metode_pengiriman"]} </td>
                                        <td>{list["tanggal_transaksi"]}</td>
                                        <td>
                                            <button className="btn" onClick={() => {
                                                route.push("/admin/transaksi/" + list["id_transaksi"] + ".html")
                                            }}>Lihat Transaksi</button>
                                        </td>
                                    </tr>
                                ))}

                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
}
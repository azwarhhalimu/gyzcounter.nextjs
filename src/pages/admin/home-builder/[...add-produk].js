import axios from "axios";
import { useState, useEffect } from "react";
import { baseUrl } from "@/Utils/Config";

import qs from "query-string"
import Autentifkasi from "@/Utils/Autentifikasi";
import Loading_save from "@/Utils/Loading_save";
import Height from "@/Utils/Height";
import { useRouter } from "next/router";
const Add_produk = () => {
    const route = useRouter();



    const [data, setData] = useState([]);
    const [dataAdd, setDataAdd] = useState([]);
    const [reload, setReload] = useState(0);
    const [loading, setLoading] = useState("");
    const [hapus, setHapus] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [id, setId] = useState("");


    useEffect(() => {
        const path = window.location.pathname.split("/")[3];
        setId(path);
        _getProduk(path);
        // console.log(path);

    }, [reload]);
    const _getProduk = (id) => {
        setIsLoading(true);
        new Autentifkasi().createHeaderAdmin().then(bearer => {
            axios.post(baseUrl("admin/get_add_produk"),
                qs.stringify({

                    "id_home_builder": id
                }),
                {
                    headers: {
                        "Authorization": bearer,
                    }
                }
            ).then((respon) => {
                setIsLoading(false);
                setData(respon.data.data);
                setDataAdd(respon.data.import_produk);
            })
        })
    }

    const _addProduk = (id_produk) => {
        setLoading(id_produk);
        new Autentifkasi().createHeaderAdmin().then(bearer => {
            axios.post(baseUrl("admin/add_produk"),
                qs.stringify({
                    "id_produk": id_produk,
                    'id_home_builder': id
                }),
                {
                    headers: {
                        "Authorization": bearer
                    }
                }
            ).then((respon) => {
                setLoading("")
                if (respon.data.status == "produk_added") {
                    window.alert("Produk berhasil di import");
                    setReload(reload + 1);
                }
            })
        })
    }

    const _hapus = (id) => {
        const confirm = window.confirm("Apakah anda ingin hapus data ini?");
        if (confirm) {
            setHapus(id);
            new Autentifkasi().createHeaderAdmin().then(bearer => {
                axios.post(baseUrl('admin/delete_item_home_builder'),
                    qs.stringify({
                        "id_add_produk": id
                    }),
                    {
                        headers: {
                            "Authorization": bearer
                        }
                    }
                ).then((respon) => {
                    setHapus(false)
                    if (respon.data.status == "item_deleted") {
                        alert("Data berhasil di hapus");
                        setReload(reload + 1);
                    }

                })
            })
        }
    }
    return <>
        <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <button
                    onClick={() => {
                        route.back();
                    }}
                    className="btn btn-danger"><i className="fa fa-chevron-left" /> Kembali</button>
                <h1 className="h3 mb-0 text-gray-800">Import Produk</h1>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="./">Home</a></li>
                    <li className="breadcrumb-item">Pages</li>
                    <li className="breadcrumb-item active" aria-current="page">Blank Page</li>
                </ol>
            </div>

            <div className="row">
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h5>Produk Yang Tersedia</h5>
                            <div>Name Home Builder : {route.query.title}</div>
                        </div>
                        <div className="card-body">
                            <table className="table">

                                {data.map((list, index) => (
                                    <tr key={index + "ca"}>
                                        <td>
                                            <img src={baseUrl("images/produk?w=50&s=" + list["foto"])} />
                                        </td><td>{list["nama_produk"]}</td>
                                        <td>
                                            {loading == list["id_produk"] ? <Loading_save text={"Add"} /> : <button
                                                onClick={() => {
                                                    _addProduk(list["id_produk"]);
                                                }}
                                                className="btn btn-danger"><i className="fa fa-chevron-right" /></button>}
                                        </td>
                                    </tr>
                                ))}

                            </table>
                            {
                                isLoading && <center>
                                    <Height height={40} />
                                    <Loading_save text={"Memuat data"} />
                                </center>
                            }
                        </div>
                    </div>
                </div>
                <div className="col-lg-6">
                    <div className="card">
                        <div className="card-header">
                            <h5>Produk Yang Di Import</h5>
                        </div>
                        <div className="card-body">
                            <table className="table">

                                {dataAdd.map((list, index) => (
                                    <tr key={index + "abc"}>
                                        <td>
                                            <img src={baseUrl("images/produk?w=50&s=" + list["foto"])} />
                                        </td><td>{list["nama_produk"]}</td>
                                        <td style={{ textAlign: "right" }}>
                                            {hapus == list["id_add_produk"] ? <Loading_save text={"Menghapus"} /> : <button
                                                onClick={() => {
                                                    _hapus(list["id_add_produk"]);
                                                }}
                                                className="btn btn-danger"><i className="fa fa-trash" /> Hapus</button>}
                                        </td>
                                    </tr>
                                ))}

                            </table>
                            {
                                isLoading && <center>
                                    <Height height={40} />
                                    <Loading_save text={"Memuat data"} />
                                </center>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Add_produk;
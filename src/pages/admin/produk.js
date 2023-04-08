import axios from "axios";
import { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { baseUrl, path_admin } from "@/Utils/Config";
import qs from "query-string";
import Loading from "@/Utils/Loading";
import Autentifkasi from "@/Utils/Autentifikasi";
import Loading_save from "@/Utils/Loading_save";
import { useRouter } from "next/router";
import Edit_produk from "./produk/Edit_produk";
import Head from "next/head";
import Link from "next/link";

const Produk = () => {

    const route = useRouter();
    const [reload, setReload] = useState(0);
    const [edit, setEdit] = useState("");
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [hapus, setHapus] = useState("");

    const [kategori, setKategori] = useState([]);
    useEffect(() => {

        _getKategori();
        _getProduk();

    }, [reload]);

    const _batal = () => {
        setEdit("");
    };
    const _callBack = () => {
        setReload(reload + 1);
    };
    const _hapus = (id) => {
        const c = window.confirm("Apakah anda ingin hapus data ini?");
        if (c) {
            setHapus(id);
            new Autentifkasi().createHeaderAdmin().then((bearer) => {
                axios
                    .post(
                        baseUrl("admin/delete_produk"),
                        qs.stringify({
                            id_produk: id,
                        }),

                        {
                            "headers": {
                                "Authorization": bearer
                            }


                        },
                    )
                    .then((respon) => {
                        setHapus("");
                        if (respon.data.status == "produk_deleted") {
                            window.alert("Produk berhasil di hapus");
                            setReload(reload + 1);
                        }
                    });
            })

        }
    };
    const _getKategori = () => {
        axios.post(baseUrl("public/kategori")).then(respon => {
            setKategori(respon.data.data);
        });
    }
    const _getProduk = () => {
        setIsLoading(true);
        new Autentifkasi().createHeaderAdmin().then((bearer) => {
            // console.log(bearer);

            axios
                .post(baseUrl("admin/get_produk"),
                    qs.stringify({
                        "data": "adf"
                    }),
                    {
                        headers: {
                            "Authorization": bearer
                        }
                    })
                .then((respon) => {
                    setIsLoading(false)
                    setData(respon.data.data);
                    // console.log(respon.data.data);
                });
        })
    };
    return (
        <>
            <Head>
                <title>Data Produk</title>
            </Head>
            <div className="container-fluid" id="container-wrapper">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Data Produk </h1>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="./">Dashboard</a>
                        </li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Produk
                        </li>
                    </ol>
                </div>
                <div className="card" style={{ background: "#DFDFDF00" }}>
                    <div className="card-header">

                        <h3>Data Produk</h3>
                        <div>
                            <button
                                onClick={() => {
                                    route.push("/admin/produk/tambah-produk.html");
                                }}
                                className="btn btn-outline btn-danger float-right"
                            >
                                Tambah
                            </button>
                        </div>
                        <ul className="nav nav-pills">
                            <li key={"4adfa"} className="nav-item">
                                <a style={{ fontSize: "15px" }} className="nav-link " aria-current="page" href="#">SEMUA</a>
                            </li>
                            {kategori.map((list, index) => (
                                <li key={index + "4adfa"} className="nav-item">
                                    <button style={{ fontSize: "15px" }} className="nav-link btn " aria-current="page" href="#">{list["nama_kategori"]}</button>
                                </li>
                            ))}
                        </ul>

                    </div>
                    <div className="card-body">
                        <table className="table">
                            <thead>
                                <tr style={{ fontWeight: "bold" }}>
                                    <td>No</td>
                                    <td>Nama Produk</td>
                                    <td>Kategori</td>
                                    <td>Harga</td>
                                    <td>Deskripsi</td>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((list, index) =>
                                    edit == list["id_produk"] ? (
                                        <Edit_produk
                                            id_produk={list["id_produk"]}
                                            _callBack={_callBack}
                                            nama_produk={list["nama_produk"]}
                                            harga={list["harga"]}
                                            satuan={list["satuan"]}
                                            kategori={list["kategori"]}
                                            harga_correct={list["harga_correct"]}
                                            deskripsi={list["deskripsi"]}
                                            _batal={_batal}
                                        />
                                    ) : (
                                        !isLoading && <>
                                            <tr key={index + "e23434"}>
                                                <td>{index + 1}</td>
                                                <td>{list["nama_produk"]}</td>
                                                <td>{list["l_kategori"]}</td>
                                                <td>
                                                    Rp.{" "}
                                                    <CurrencyFormat
                                                        thousandSeparator={true}
                                                        decimalSeparator={"."}
                                                        displayType="text"
                                                        value={list["harga"]}
                                                    />{" "}
                                                    / {list["l_satuan"]}
                                                </td>
                                                <td>{list["deskripsi"]}</td>
                                            </tr>
                                            <tr style={{ background: "#DFDFDF41" }}>
                                                <td style={{ textAlign: "right" }} colSpan={5}>

                                                    {list["foto"].map((foto, i) => (
                                                        <span style={{ margin: "3px" }}>
                                                            <img style={{ borderRadius: "3px", border: "2px solid #0722D3" }} src={baseUrl("images/produk?w=50&s=" + foto["id_foto_produk"])} />
                                                        </span>
                                                    ))}
                                                    Opsi Data :{" "}
                                                    <button
                                                        onClick={() => {
                                                            setEdit(list["id_produk"]);
                                                        }}
                                                        className="btn btn-success"
                                                    >
                                                        Edit
                                                    </button>{" "}
                                                    {hapus == list["id_produk"] ? <Loading_save text={"Hapus"} /> : <button
                                                        onClick={() => {
                                                            _hapus(list["id_produk"]);
                                                        }}
                                                        className="btn btn-danger"
                                                    >
                                                        Hapus
                                                    </button>}{" "}
                                                    <button
                                                        onClick={() => {
                                                            route.push(
                                                                {
                                                                    pathname:
                                                                        "/admin/produk/" + list["id_produk"] + "/upload-foto.html",
                                                                    query: {
                                                                        "nama_produk": list["nama_produk"]
                                                                    }
                                                                }, "/admin/produk/" + list["id_produk"] + "/upload-foto.html",
                                                            );
                                                        }}
                                                        className="btn btn-primary"
                                                    >
                                                        Foto Produk
                                                    </button>
                                                </td>
                                            </tr >
                                        </>
                                    ),
                                )}
                                {isLoading && <Loading baris={10} kolom={6} />}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div >
        </>
    );
};

export default Produk;
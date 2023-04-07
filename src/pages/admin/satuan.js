import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl, path_admin, token } from "@/Utils/Config";
import qs from "query-string";
import Edit_satuan from "./satuan/Edit_satuan";
import Autentifkasi from "@/Utils/Autentifikasi";
import Loading_save from "@/Utils/Loading_save";
import Loading from "@/Utils/Loading";
import { useRouter } from "next/router";
import Head from "next/head";

const Satuan = () => {

    const route = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [reload, setRealod] = useState(0);
    const [edit, setEdit] = useState("");
    const [hapus, setHapus] = useState("");
    useEffect(() => {

        _getSatuan();
    }, [reload]);

    const _reset = () => {
        setEdit("");
        setRealod(reload + 1);
    };
    const _batal = () => {
        setEdit("");
    };
    const _getSatuan = () => {
        setIsLoading(true);
        new Autentifkasi().createHeaderAdmin().then(bearer => {
            axios
                .post(
                    baseUrl("admin/get_satuan"),
                    {},
                    {
                        headers: {
                            "Authorization": bearer
                        }
                    }
                )
                .then((respon) => {
                    setIsLoading(false)
                    setData(respon.data.data);
                });
        })
    };
    const _hapus = (id_satuan) => {
        const confirm = window.confirm("Apakah anda ingin hapus data ini?");
        if (confirm) {
            setHapus(id_satuan);
            new Autentifkasi().createHeaderAdmin().then(bearer => {
                axios
                    .post(
                        baseUrl("admin/delete_satuan"),
                        qs.stringify({
                            id_satuan: id_satuan,
                        }),
                        {
                            headers: {
                                "Authorization": bearer
                            }
                        }
                    )
                    .then((respon) => {
                        setHapus(false);
                        if (respon.data.status == "satuan_deleted") {
                            alert("Satuan berhasil di dihapus");
                            setRealod(reload + 1);
                        }
                    });
            })
        }
    };

    return (

        <>
            <Head>
                <title>Data Satuan</title>
            </Head>
            <div className="container-fluid" id="container-wrapper">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <h1 className="h3 mb-0 text-gray-800">Satuan</h1>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="./">Home</a>
                        </li>
                        <li className="breadcrumb-item">Pages</li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Satuan
                        </li>
                    </ol>
                </div>
                <div className="col-lg-9" style={{ margin: "auto" }}>
                    <div className="card">
                        <div className="card-header">
                            <button
                                onClick={() => {
                                    route.push("/admin/satuan/tambah-satuan.html");
                                }}
                                className="btn btn-primary float-right"
                            >
                                Tambah Satuan
                            </button>
                            <h3>Satuan</h3>
                        </div>
                        <div className="card-body">
                            <table className="table">
                                <thead>
                                    <tr
                                        style={{
                                            fontWeight: "bold",
                                        }}
                                    >
                                        <td>No</td>
                                        <td>Id Satuan</td>
                                        <td>Nama Satuan</td>
                                        <td>Aksi</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((list, index) =>
                                        edit == list["id_satuan"] ? (
                                            <Edit_satuan
                                                _batal={_batal}
                                                _reset={_reset}
                                                id_satuan={list["id_satuan"]}
                                                nama_satuan={list["nama_satuan"]}
                                            />
                                        ) : (
                                            !isLoading && <tr>
                                                <td>{index + 1}</td>
                                                <td>{list["id_satuan"]}</td>
                                                <td>{list["nama_satuan"]}</td>
                                                <td
                                                    style={{
                                                        textAlign: "right",
                                                    }}
                                                >
                                                    {hapus === list["id_satuan"] ? <Loading_save text={"Menghapus"} /> : <button
                                                        onClick={() => {
                                                            _hapus(list["id_satuan"]);
                                                        }}
                                                        className="btn btn-danger"
                                                    >
                                                        Hapus
                                                    </button>}{" "}
                                                    <button
                                                        onClick={() => {
                                                            setEdit(list["id_satuan"]);
                                                        }}
                                                        className="btn btn-warning"
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ),
                                    )}
                                    {isLoading && <Loading baris={8} kolom={4} />}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Satuan;
import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "@/Utils/Config";
import qs from "query-string";
import Edit_kategori from "./kategori/Edit_kategori";
import Loading from "@/Utils/Loading";
import Autentifkasi from "@/Utils/Autentifikasi";
import Loading_save from "@/Utils/Loading_save";
import { useRouter } from "next/router";
import Head from "next/head";
const Kategori = () => {

    const route = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const [data, setData] = useState([]);
    const [reload, setRealod] = useState(0);
    const [edit, setEdit] = useState("");

    const [loading, setLoading] = useState(false);
    const [hapus, setHapus] = useState("");

    const [nama_kategori, setNama_kategori] = useState("");
    useEffect(() => {

        _getKategori();
    }, [reload]);

    const _getKategori = () => {
        setIsLoading(true);
        new Autentifkasi().createHeaderAdmin().then(bearer => {
            axios
                .post(
                    baseUrl("admin/get_kategori"),
                    {},
                    {
                        headers: {
                            Authorization: bearer,
                        },
                    },
                )
                .then((respon) => {
                    setIsLoading(false);
                    setData(respon.data.data);
                });
        })
    };
    const _hapus = (id) => {
        const confirm = window.confirm("Apakah anda ingin hapus data ini?");

        if (confirm) {
            setHapus(id);
            const formData = new FormData();
            formData.append("id_kategori", id);
            new Autentifkasi().createHeaderAdmin().then(bearer => {
                axios
                    .post(baseUrl("admin/delete_kategori"), formData, {
                        headers: {
                            Authorization: bearer,
                        },
                    })
                    .then((respon) => {
                        setHapus("");
                        if (respon.data.status == "kategori_deleted") {
                            window.alert("Data terhapus");

                        }
                        setRealod(reload + 1);
                    });
            })
        }
    };
    const _edit = (id_kategori, nama_kategori) => {
        setEdit(id_kategori);
        setLoading(false);
    };
    const _batal = () => {
        setEdit("");
    };
    const _update_nama_kategori = (value) => {
        setNama_kategori(value);
        // console.log(value);

    };
    const _submit = (e) => {
        e.preventDefault();

        const confirm = window.confirm("Apakah anda ingin ubah data ini?");
        if (confirm) {
            setLoading(true);
            new Autentifkasi().createHeaderAdmin().then(bearer => {
                axios
                    .post(
                        baseUrl("admin/update_kategori"),
                        qs.stringify({
                            nama_kategori: nama_kategori,
                            id_kategori: edit,
                        }),
                        {
                            headers: {
                                "Authorization": bearer,
                            },
                        },
                    )
                    .then((respon) => {
                        setLoading(false);
                        if (respon.data.status == "kategori_updated") {

                            alert("Data berhasil di update");
                            setEdit("");
                            setRealod(reload + 1);
                        }
                    });
            })
        }
    };
    return (
        <>
            <Head>
                <title>Data Kategori</title>
            </Head>
            <div
                className="col-lg-10"
                style={{
                    margin: "auto",
                }}
            >
                <div className="card">
                    <div className="card-header">
                        <h3>Data Kategori</h3>
                        <button
                            onClick={() => {
                                route.push(
                                    "/admin/kategori/tambah-kategori.html",
                                );
                            }}
                            className="btn btn-success float-right"
                        >
                            Tambah Kategori
                        </button>
                    </div>
                    <div className="card-body">
                        <form onSubmit={_submit}>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <td>No</td>
                                        <td>Id Kategori</td>
                                        <td>Nama Kategori</td>
                                        <td>Opsi</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.map((list, index) =>
                                        edit == list["id_kategori"] ? (
                                            <Edit_kategori
                                                key={index + 492}
                                                loading={loading}
                                                nama_kategori={list["nama_kategori"]}
                                                id_kategori={list["id_kategori"]}
                                                _batal={_batal}
                                                _update_nama_kategori={_update_nama_kategori}
                                            />
                                        ) : (
                                            !isLoading && <tr key={index + 9382}>
                                                <td>{index + 1}</td>
                                                <td>{list["id_kategori"]}</td>
                                                <td>{list["nama_kategori"]}</td>
                                                <td style={{ textAlign: "right" }}>
                                                    {hapus == list["id_kategori"] ? <Loading_save text={"hapus"} /> : <button
                                                        onClick={() => {
                                                            _hapus(list["id_kategori"]);
                                                        }}
                                                        className="btn btn-danger"
                                                    >
                                                        Hapus
                                                    </button>}{" "}
                                                    <button
                                                        onClick={() => {
                                                            _edit(list["id_kategori"], list["nama_kategori"]);
                                                        }}
                                                        className="btn btn-primary"
                                                    >
                                                        Edit
                                                    </button>
                                                </td>
                                            </tr>
                                        ),
                                    )}
                                    {isLoading && <Loading kolom={4} baris={8} />}
                                </tbody>
                            </table>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Kategori;

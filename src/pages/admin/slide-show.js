import axios from "axios";
import { useEffect, useState } from "react";
import Autentifkasi from "@/Utils/Autentifikasi";
import { baseUrl, path_admin } from "@/Utils/Config";
import { encryptAES } from "@/Utils/enkripsi";
import Loading from "@/Utils/Loading";
import qs from "query-string";
import Height from "@/Utils/Height";
import Loading_save from "@/Utils/Loading_save";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
const Slide_show = () => {
    const route = useRouter();

    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState([]);
    const [reload, setReload] = useState(0);
    const [hapus, setHapus] = useState("");
    useEffect(() => {
        _getData();
    }, [reload]);

    const _getData = () => {
        setIsLoading(true);
        new Autentifkasi().createHeaderAdmin().then((bearer) => {
            axios.post(baseUrl("admin/get_slide_show"),
                {},
                {
                    headers: {
                        "Authorization": bearer
                    }
                }
            )
                .then((respon) => {
                    setIsLoading(false);
                    setData(respon.data.data);
                })
        })
    }

    const _hapus = (id) => {
        const confirm = window.confirm("Apakah anda ingin hapus data ini?");
        if (confirm) {

            setHapus(id);
            new Autentifkasi().createHeaderAdmin().then(bearer => {
                axios.post(baseUrl("admin/delete_slide_show"),
                    qs.stringify({
                        "data": encryptAES(id)
                    }),
                    {
                        headers: {
                            "Authorization": bearer
                        }
                    }
                ).then(respon => {
                    setHapus("");
                    if (respon.data.status == "slide_show_deleted") {
                        alert("Data berhasil di hapus");
                        setReload(reload + 11);
                    }
                })
            })
        }
    }
    return <>
        <Head>
            <title>Slide Show</title>
        </Head>
        <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Slide Show</h1>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link href={"/admin"}>Dashboard</Link></li>

                    <li className="breadcrumb-item active" aria-current="page">Slide Show</li>
                </ol>
            </div>
            <div className="card">
                <div className="card-header">
                    <button
                        onClick={() => {
                            route.push("/admin/slide-show/tambah-slide-show.html")
                        }}
                        className="btn btn-danger float-right">Tambah Baru</button>
                    <div>Data Slide Show</div>
                </div>
                <div className="card-body">
                    <table className="table">
                        <thead>
                            <tr>
                                <td>No</td>
                                <td>Thumb</td>
                                <td>Title</td>
                                <td>Sub_title</td>
                                <td>Deskripsi</td>
                                <td>Aksi</td>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((list, index) => (
                                <tr>
                                    <td>{index + 1}</td>
                                    <td
                                    ><img src={baseUrl("images/slide_show?w=100&s=" + list["id_slide_show"])} />
                                    </td>
                                    <td>{list["title"]}</td>
                                    <td>{list["sub_title"]}</td>
                                    <td>{list["deskripsi"]}</td>
                                    <td>
                                        {hapus === list["id_slide_show"] ? <Loading_save text={"Menghapus"} /> : <button onClick={() => {
                                            _hapus(list["id_slide_show"]);
                                        }} className="btn btn-danger">Hapus</button>}
                                    </td>
                                </tr>
                            ))}
                            {isLoading && <Loading kolom={6} baris={8} />}
                        </tbody>
                    </table>
                    {!isLoading && (data.length == 0) && <>
                        <Height height={50} />
                        <center style={{ color: "red" }}>
                            <div><i className="fa fa-warning" style={{ fontSize: "40px" }} /></div>
                            <div style={{ fontWeight: "500" }}>Opsszz</div>
                            <div >Data masih kosong</div>
                        </center>
                    </>}
                </div>
            </div>
        </div >
    </>
}
export default Slide_show;
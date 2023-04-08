import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl } from "@/Utils/Config";
import Height from "@/Utils/Height";
import qs from "query-string";
import Autentifkasi from "@/Utils/Autentifikasi";
import Loading_save from "@/Utils/Loading_save";
import { useRouter } from "next/router";


const Add_item_home_builder = () => {
    const route = useRouter();

    const [title, setTitle] = useState();

    const [subtile, setSubtitle] = useState();
    const [loading, setLoading] = useState(false);


    useEffect(() => {


    }, []);

    const _saveHomeBuilder = (e) => {

        setLoading(true);
        e.preventDefault();
        new Autentifkasi().createHeaderAdmin().then(bearer => {
            axios.post(baseUrl("admin/save_home_builder"),
                qs.stringify({
                    'title': title,
                    'sub_title': subtile,
                }),
                {
                    headers: {
                        "Authorization": bearer
                    }
                }
            ).then((respon) => {
                setLoading(false)
                if (respon.data.status == "home_builder_saved") {
                    window.alert("Home Bulder berhasil di simpan");
                    route.back();
                }
            });
        })
    }
    return <>

        <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <button
                    onClick={() => {
                        route.back();
                    }}
                    className="btn btn-danger"><i className="fa fa-chevron-left" /> Kembali</button>
                <h1 className="h3 mb-0 text-gray-800">Tambah Item Home Builder</h1>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="./">Home</a></li>
                    <li className="breadcrumb-item">Home Builder</li>
                    <li className="breadcrumb-item active" aria-current="page">Tambah Home Item Home Builder</li>
                </ol>
            </div>
            <div className="row">
                <div className="col-lg-5" style={{ margin: "auto" }}>
                    <div className="card">
                        <div className="card-header">
                            <h5>Tambah Item Home Builder</h5>
                        </div>
                        <div className="card-body">
                            <form onSubmit={_saveHomeBuilder}>
                                <div>
                                    <label>Title</label>
                                    <input
                                        onChange={(e) => {
                                            setTitle(e.target.value)
                                        }}
                                        required
                                        placeholder="Masukkan judul" type="text" className="form-control" />
                                </div>
                                <Height height={20} />
                                <div>
                                    <label>Sub Title</label>
                                    <textarea
                                        required
                                        onChange={(e) => {
                                            setSubtitle(e.target.value)
                                        }}
                                        placeholder="Masukkan sub judul" type="text" className="form-control" />
                                </div>
                                <Height height={10} />
                                {loading ? <Loading_save text={"Menyimpan"} /> : <button className="btn btn-success">Simpan</button>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div></>
}
export default Add_item_home_builder;
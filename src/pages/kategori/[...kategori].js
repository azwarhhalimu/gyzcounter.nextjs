import { baseUrl } from "@/Utils/Config";
import Height from "@/Utils/Height";
import Link from "next/link";
import { Url_encoded } from "@/Utils/Url_encoded";
import axios from "axios";
import { useEffect, useState } from "react";
import qs from "query-string"
import Loading_save from "@/Utils/Loading_save";
import No_data from "@/Widget/No_data";
import { useRouter } from "next/router";

const Kategori = () => {
    const [aktif, setAktif] = useState("");

    const router = useRouter();
    const [name, setName] = useState("");
    const [data, setData] = useState([]);
    const [id, setId] = useState("");
    const [loading, setLoading] = useState(false);
    const [load, setLoad] = useState(false);

    const url = typeof window !== "undefined" && window.location.pathname;
    useEffect(() => {

        const data_url = window.location.pathname;
        setId(data_url);
        _getMenuKategori();

    }, [])
    useEffect(() => {
        const data_url = window.location.pathname.split("/")[2];
        setId(data_url);
        _getData(data_url);
    }, [url])


    const [kategori, setkategori] = useState([]);
    const _getData = (id) => {
        setLoad(true)
        axios.post(baseUrl("public/list_produk_kategori"),
            qs.stringify({
                "id_kategori": id
            })
        )
            .then(respon => {
                setLoad(false);
                setName(respon.data.kategori);
                setData(respon.data.data);
            })
    }
    const _getMenuKategori = () => {
        setLoading(true);
        axios.post(baseUrl("public/kategori"))
            .then(respon => {

                setLoading(false);
                setkategori(respon.data.data)
            })
    }
    return (<>
        <Height height={150} />

        <div className="container" style={{ minHeight: "55vh" }}>
            <div className="row">
                <div className="col-lg-4">

                    <div>
                        <div style={{ fontWeight: "600", }}>Kategori</div>
                        <Height height={10} />
                        {loading ? <Loading_save text={"Memangmbil data..."} /> : <ul className="list-group" style={{ borderRadius: "0px" }}>

                            {kategori.map((list, index) => (
                                <li key={index + 100} style={{ padding: "5px 10px 5px 10px" }} className="list-group-item d-flex justify-content-between align-items-center">
                                    <Link {...id == list['id_kategori'] && { className: "menu-aktif" }} href={"/kategori/" + list["id_kategori"] + "/" + Url_encoded((list["nama_kategori"]).toLowerCase()) + ".html"} style={{ fontSize: "15px", color: id == list["id_kategori"] ? "red" : "#333" }}>
                                        {list.nama_kategori} {id == list["id_kategori"] && <span style={{ fontWeight: "bold", color: "red" }}>***</span>}
                                    </Link>
                                    <span className="badge badge-primary badge-pill">{list["count"]}</span>
                                </li>
                            ))}

                        </ul>}
                    </div>
                </div>
                <div className="col-lg-8">
                    <h3>{name}</h3>
                    <div className="row">
                        {load ? <div style={{ textAlign: "center", width: "100%" }}>
                            <Height height={100} />
                            <Loading_save text={"Mengambil data kategori..."} />
                        </div> : <>
                            {data.map((list, index) => (
                                <div key={index + 'fdjkf'} className="col-sm-3 " {...(index > 3) && {
                                    style: {
                                        marginTop: "20px"
                                    }
                                }}>
                                    <Link href={"/produk/" + list["id_produk"] + "/" + Url_encoded(list["nama_produk"]) + ".html"} style={{ color: "#333333" }}>
                                        <div className="list-data" style={{
                                            padding: "2px",
                                            border: "1px solid #dfdfdf",
                                            borderRadius: "10px"

                                        }}>
                                            <img style={{ width: "100%", borderRadius: "10px" }} src={baseUrl("images/produk?w=250&s=" + list["foto"])} />
                                            <Height height={5} />
                                            <div style={{ padding: "5px" }}>
                                                <div style={{ lineHeight: "100%", fontSize: "14px", fontWeight: "500", height: "40px" }}>
                                                    {list["nama_produk"]}
                                                </div>
                                                <div style={{ fontSize: "13px" }}>
                                                    Rp. {list["harga"]}
                                                </div>
                                            </div>
                                        </div>
                                    </Link>

                                </div >
                            ))}
                        </>}
                    </div>

                    {data.length == 0 && <No_data title={"Opsss"} text={"Data kategori ini masih kosong"} />}
                </div>
            </div>
        </div >
    </>);
}

export default Kategori;
import { baseUrl, urlEncode } from "@/Utils/Config";
import Height from "@/Utils/Height";
import axios from "axios";
import Link from "next/link";
import { Url_encoded } from "@/Utils/Url_encoded";
import qs from "query-string";
import { useEffect, useState } from "react";
import { isMobile } from "react-device-detect";
import No_data from "@/Widget/No_data";

const Lihat_kategori = () => {

    const url = typeof window !== "undefined" && window.location.pathname;
    const [name, setName] = useState("");
    const [kategori, setKategori] = useState([]);
    const [data, setData] = useState([]);
    const _getKategori = () => {
        axios.post(baseUrl("public/kategori"))
            .then(respon => {
                setKategori(respon.data.data);
            })
    }
    function _getProdukByKategori(id) {
        axios.post(baseUrl("public/list_produk_kategori"),
            qs.stringify({
                "id_kategori": id
            })
        )
            .then(respon => {
                setName(respon.data.kategori);
                setData(respon.data.data);
            })
    }
    useEffect(() => {
        const idKategori = window.location.pathname.split("/")[2];
        console.log(idKategori);

        _getKategori();
        _getProdukByKategori(idKategori);
    }, [])

    useEffect(() => {
        const idKategori = window.location.pathname.split("/")[2];
        console.log(idKategori);
        _getProdukByKategori(idKategori);
    }, [url])
    return (<>

        <Height height={150} />
        <div className="container">
            <div className="row">
                <div className="col-lg-4">
                    <div>
                        <div style={{ fontWeight: "bold", }}>Kategori</div>
                        <ul class="list-group" style={{ borderRadius: "0px" }}>

                            {kategori.map((list, index) => (
                                <li key={index + 100} style={{ padding: "5px 10px 5px 10px", margin: "5px" }} class="list-group-item d-flex justify-content-between align-items-center">
                                    <Link href={"/kategori/" + list["id_kategori"] + "/" + urlEncode((list["nama_kategori"]).toLowerCase()) + ".html"} style={{ fontSize: "15px", color: "#333" }}>
                                        {list["id_kategori"] == url.split("/")[2] && <span style={{ color: "red" }}>***</span>}  {list.nama_kategori} {list["id_kategori"] == url.split("/")[2] && <span style={{ color: "red" }}>***</span>}
                                    </Link>
                                    <span class="badge badge-primary badge-pill">{list["count"]}</span>
                                </li>
                            ))}

                        </ul>
                    </div>
                </div>
                <div className="col-lg-8">
                    <div style={{ fontWeight: "bold" }}>{name}</div>
                    <div className="row">
                        {data.map((list, index) => (
                            isMobile ? <>
                                <div className="col-sm-4 grid" style={{ marginTop: "25px" }}>
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

                                </div>
                            </> : <>
                                <div className="col-sm-3 " {...(index > 3) && {
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

                                </div ></>
                        ))}
                    </div>
                    {data.length == 0 && <No_data
                        title={"Opps Data Kosong"}
                        text={"Data pada kategori ini tidak tersedia"} />}
                </div>
            </div>
        </div >
    </>);
}

export default Lihat_kategori;
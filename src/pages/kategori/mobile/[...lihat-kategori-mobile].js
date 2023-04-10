import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl, urlEncode } from "@/Utils/Config";
import Height from "@/Utils/Height";
import Link from "next/link";
import { Url_encoded } from "@/Utils/Url_encoded";
import qs from "query-string";
import No_data from "@/Widget/No_data";
import Loading from "@/Utils/Loading";
import AppBar from "@/Widget/Mobile_komponen/AppBar";
import { isMobile } from "react-device-detect";
import { useRouter } from "next/router";
export default function Lihat_kategori_mobile() {
    const id = "";
    const router = useRouter();
    const [kategori, setKategori] = useState([]);
    const [namaKategori, setNamaKategori] = useState("");
    const [produk, setProduk] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        _getProduk();
    }, [])
    useEffect(() => {
        _getProduk();
        _getKategori();
    }, [])
    const _getKategori = () => {
        axios.post(baseUrl("public/kategori"))
            .then((respon) => {
                setKategori(respon.data.data);
            })
    }
    const _getProduk = () => {
        setIsLoading(true);
        axios.post(baseUrl("public/list_produk_kategori"),
            qs.stringify({
                "id_kategori": "id"
            })
        )
            .then((respon) => {
                setIsLoading(false);
                setProduk(respon.data.data);
                setNamaKategori(respon.data.kategori);
            })
    }
    return <>
        <AppBar title={"lihat kategori"} leadingButton={true} url={"back"} />
        <Height height={120} />
        <div className="container">
            <div className="row">
                {!isMobile && <>
                    <div className="col-lg-4">
                        <div>
                            <div style={{ fontWeight: "400", }}>Kategori</div>
                            <ul class="list-group" style={{ borderRadius: "0px" }}>

                                {kategori.map((list, index) => (
                                    <li style={{ padding: "5px 10px 5px 10px" }} class="list-group-item d-flex justify-content-between align-items-center">
                                        <Link href={""} {...list["id_kategori"] == id && { className: "menu-aktif" }} to={"/" + list["id_kategori"] + "/kategori/" + Url_encoded((list["nama_kategori"]).toLowerCase()) + ".html"}
                                            style={{ fontSize: "15px", color: "#333" }}>
                                            {list.nama_kategori}
                                        </Link>
                                        <span class="badge badge-primary badge-pill">{list["count"]}</span>
                                    </li>
                                ))}

                            </ul>
                        </div>
                    </div>
                </>}
                <div className="col-lg-8">
                    <div style={{ fontWeight: "500" }}>Kategori {namaKategori}</div>
                    <div className="row">
                        {produk.map((list, index) => (
                            <div  {...isMobile && { style: { width: "50%" } }} {...index > 3 && { style: { marginTop: "20px" } }} className="col-lg-3">
                                <div onClick={() => {
                                    router.push("/produk/" + list["id_produk"] + "/" + urlEncode(list["nama_produk"]) + ".html")
                                }} className="list-data" style={{ padding: "1px", border: "1px solid #dfdfdf", borderRadius: "5px" }}>
                                    <div>
                                        <img style={{ width: "100%", borderRadius: "5px" }} src={baseUrl("images/produk?w=300&s=" + list["foto"])} />
                                    </div>
                                    <div style={{ padding: "10px" }}>

                                        <div style={{ fontSize: "14px", color: "BLUE", fontWeight: "500", height: "60px" }}>{list["nama_produk"]}</div>
                                        <div style={{ fontSize: "12px" }}>Rp{list["harga"]}</div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {isLoading ? <Loading /> : <>{produk.length == 0 && <>
                        <No_data />
                    </>}</>}
                </div>
            </div>
        </div>
    </>

}
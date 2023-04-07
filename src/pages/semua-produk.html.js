import { useState, useEffect } from "react";
import Height from "@/Utils/Height";
import { isMobile } from "react-device-detect";
import { baseUrl } from "@/Utils/Config";
import axios from "axios";
import Loading_mobile from "@/Utils/Loading_mobile";
import { Url_encoded } from "@/Utils/Url_encoded";

import Link from "next/link";
const Semua_produk = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const _getAll = () => {
        setLoading(true);
        axios.post(baseUrl("public/semua_produk"))
            .then(respon => {
                setData(respon.data.data);
                setLoading(false);
            })
    }
    useEffect(() => {
        _getAll();
    }, [])
    return (<>

        {loading && <Loading_mobile />}
        <Height height={isMobile ? 40 : 150} />
        <div className="container">
            <div className="row">
                <div className="col-lg-12">
                    {!isMobile && <nav>
                        <div class="nav nav-tabs" id="nav-tab" role="tablist">
                            <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Semua Data</button>
                        </div>
                    </nav>}
                    <Height height={10} />
                    <div className="row">
                        {data.map((list, index) => (
                            isMobile ? <>
                                <div className="col-sm-2 grid" style={{ marginTop: "25px" }}>
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
                                <div className="col-sm-2 " {...(index > 5) && {
                                    style: {
                                        marginTop: "25px"
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

                                </div></>
                        ))}
                    </div>
                </div>
            </div>
        </div >
    </>);
}

export default Semua_produk;
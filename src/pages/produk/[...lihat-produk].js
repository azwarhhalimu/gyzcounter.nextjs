
import { baseUrl } from "@/Utils/Config";
import axios from "axios";
import qs from "query-string";
import CurrencyFormat from "react-currency-format";
import { useRouter } from "next/router";
import { urlEncode } from "@/Utils/Config";
import { isMobile } from "react-device-detect";
import { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { encryptAES } from "@/Utils/enkripsi";
import { Navigation, FreeMode, Pagination } from "swiper";
import { SessionManager } from "@/Utils/SessionManager";
import Autentifkasi from "@/Utils/Autentifikasi";
import Link from "next/link";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AppBar from "@/Widget/Mobile_komponen/AppBar";
import Head from "next/head";
import { CKontext } from "@/Componen/UserLayout";
function Lihat_produk({ users, cdat }) {


    const { updateMenuCart, setUpdateMenuCart } = useContext(CKontext);
    const [jumlah, setJumlah] = useState(0);
    const [isAdd, setIsAdd] = useState(false);
    const [reload, setReload] = useState(0);
    const [swiper, setSwiper] = useState(null);
    const [sp, setSp] = useState(null);


    const [loading, setLoading] = useState(false);
    const [id, setId] = useState("");

    const [data, setData] = useState({});
    const [fotoProduk, setFotoProduk] = useState([]);
    const [produkLainnya, setProdukLainnya] = useState([]);



    const route = useRouter();
    const triger = typeof window !== "undefined" && window.location.pathname;
    useEffect(() => {

        const host = window.location.pathname;
        const baseUrl = host.split('/');
        const getId = baseUrl[2];
        setId(getId);
        _getData(getId);


    }, [triger]);




    const _getData = (uri_id) => {
        setLoading(true);
        axios.post(baseUrl("public/lihat_produk"),
            qs.stringify({
                "id_produk": uri_id
            })).then((respon) => {
                setData(respon.data);
                setFotoProduk(respon.data.foto_produk);
                setProdukLainnya(respon.data.produk_lainnya);

                setLoading(false);
            })
    }


    const _lihatProduk = (id_produk) => {
        window.scrollTo(0, 0);
        setId(id_produk);
        _getData();
        setReload(reload + 1);


    }
    const _addCart = async () => {

        // const data = {
        //   "id_user": a["id_user"],
        //   "id_produk": id,
        //   "jumlah": jumlah
        // };
        var s = new SessionManager();
        if (s.getUser() == null) {
            window.alert("Oppss.\nAnda harus login dulu");
            window.sessionStorage.setItem("url_redirect_user", window.location.pathname);
            route.push("/login.html");

            return;
        }
        var auth = new Autentifkasi();


        auth.createHeader().then((bearer) => {
            const id_user = new SessionManager().getUser()["id_user"]
            const data = {
                "id_user": id_user,
                "id_produk": id,
                "jumlah": jumlah,
            };
            // console.log(id_user);

            axios.post(baseUrl("user/add_cart"),
                qs.stringify({
                    "data": encryptAES(data),
                }),
                {
                    headers: {
                        "Authorization": bearer
                    }
                }
            ).then((respon) => {
                setUpdateMenuCart(updateMenuCart + 1);

                if (respon.data.status == "cart_add") {

                    window.alert("Keranjang berhasil di tambahkan");
                }
                else if (respon.data.status == "cart_update") {
                    window.alert("Keranjang berhasil di diupdate");

                }
                setJumlah(0);
                setIsAdd(false);
            });
        });
    }
    const _beli_sekarang = () => {
        var s = new SessionManager();
        if (s.getUser() == null) {
            window.alert("Oppss.\nAnda harus login dulu");
            route.push("/login.html");
        }
        new Autentifkasi().createHeader().then((bearer) => {
            const data = {
                "id_produk": id,
                "id_user": new SessionManager().getUser()["id_user"],
            }
            axios.post(baseUrl("user/beli_langsung"),
                qs.stringify({
                    "data": encryptAES(data)
                }),
                {
                    headers: {
                        "Authorization": bearer
                    }
                }
            )
                .then((respon) => {
                    if (respon.data.status == "cart_added") {

                        setUpdateMenuCart(updateMenuCart + 1);
                        window.alert("Data berahasil ditambahkan");

                    }
                });
        })
    }

    return <>


        {isMobile && <AppBar title={""} leadingButton={true} />}
        <Head>
            <title>{users.title}</title>
            <meta property="og:title" content={users.title} />
            <meta property="og:image" itemprop="image" content={baseUrl("images/produk?w=400&s=" + users.foto)}></meta>
            <meta property="og:description" content={users.subtilte} />
        </Head>
        <div className="section" id="about">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-xs-12">
                        <div className="left-text-content">

                            <div className="section-heading">

                                {!isMobile && <button className="btn" onClick={() => {
                                    route.push("/");
                                }}><i className="fa fa-chevron-left" /> Kembali</button>}
                                <h2>{data["nama_produk"]}</h2>
                                <div style={{ fontWeight: "bold", color: "#1783FF" }}>Harga Rp. <CurrencyFormat thousandSeparator={true}
                                    decimalSeparator={"."} displayType="text" value={data.harga} />  Per Unit</div>
                                <br />
                            </div>

                            <br />
                            <div dangerouslySetInnerHTML={{ __html: data["deskripsi"] }}></div>

                            <div className="row">
                                <div className="col-lg-6">
                                    {!isAdd ?
                                        <button
                                            onClick={() => {
                                                setIsAdd(!isAdd ? true : false);

                                            }}
                                            style={{
                                                border: "1px solid #F13E38", color: "#F13E38"
                                            }} className="btn btn-block">Tambahkan Ke Keranjang</button> :
                                        <table border={0}>
                                            <tr>
                                                <td>Jumlah</td>
                                                <td>{" "}</td>
                                                <td>
                                                    <select onChange={(e) => {
                                                        setJumlah(e.target.value);
                                                    }} className="form-control">
                                                        <option>--Pilih Jumlah--</option>
                                                        {
                                                            [...Array(10)].map((data, index) => (
                                                                <option key={index + 1032} value={index + 1}>{index + 1}</option>
                                                            ))
                                                        }
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td colSpan={3}>
                                                    <button type="button" onClick={() => {
                                                        setJumlah(0)
                                                        setIsAdd(false);
                                                    }} className="btn btn-danger">Batal</button>
                                                    {" "}
                                                    <button onClick={() => {
                                                        setJumlah(0);
                                                        _addCart();
                                                    }} className="btn btn-primary">Tambahkan</button>
                                                </td>
                                            </tr>
                                        </table>}

                                </div>
                                <div className="col-lg-6">
                                    <button
                                        onClick={() => {
                                            _beli_sekarang();
                                        }}
                                        className="btn btn-block" style={{ background: "#F13E38", color: "#fff" }}>Beli Sekarang</button>
                                </div>
                            </div>

                            <br />
                            <br />
                            <div className="row">
                                {
                                    fotoProduk.map((list, index) => (
                                        <div onClick={() => {
                                            setSwiper(index);
                                            sp.slideTo(index);
                                        }} key={index + 5} style={{ margin: "5px", cursor: "pointer" }}>
                                            <div style={{ borderRadius: "3px", border: swiper == index ? "3px solid blue" : "3px solid #DFDFDF" }}>
                                                <img src={baseUrl("images/produk?w=100&s=" + list["id_foto_produk"]).replace("amp;", "")} alt />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-xs-12">
                        <div className="right-content">
                            <div className="thumb">

                                <Swiper
                                    onSlideChange={(swipercore) => {
                                        setSwiper(swipercore.activeIndex);

                                    }}
                                    onSwiper={(swiper) => {
                                        setSp(swiper)
                                    }}
                                    navigation={true} modules={[Navigation]} className="mySwiper">
                                    {fotoProduk.map((list, index) => (
                                        <SwiperSlide key={index + 10}>
                                            <img style={{ borderRadius: "10px" }} src={baseUrl("images/produk?w=700&s=" + list["id_foto_produk"])} alt />
                                        </SwiperSlide>
                                    ))}

                                </Swiper>

                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <br />
                <div style={{
                    fontWeight: "bold"
                }}>Produk Kategori Lainnya</div>

                <br />
                <Swiper

                    slidesPerView={"auto"}
                    spaceBetween={isMobile ? 15 : 20}
                    freeMode={true}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[FreeMode, Pagination]}
                    className="mySwiper"
                >
                    {
                        produkLainnya.map((list, index) => (
                            <SwiperSlide style={{ width: isMobile ? "30%" : "150px" }} id="link" key={index + 120}>
                                <Link href={"/produk/" + list["id_produk"] + "/" + urlEncode(list["nama_produk"]) + ".html"} onClick={() => {
                                    setId(list["id_produk"])
                                }} style={{ color: "#333", textDecoration: "none", textDecorationColor: "#000" }} to={"/produk/" + list["id_produk"] + "/" + urlEncode(list["nama_produk"]) + ".html?f=read_product"}>
                                    <div>
                                        <img style={{ borderRadius: "5px" }} src={baseUrl("images/produk?w=240&s=" + list["foto"])} />
                                        <div style={{ height: "10px" }} />
                                        <div style={{ fontWeight: "bold", fontSize: "13px" }}>{list["nama_produk"]}</div>
                                        <div style={{ fontSize: "12px" }}>Rp. <CurrencyFormat
                                            thousandSeparator={true}
                                            decimalSeparator={"."}
                                            displayType="text" value={list["harga"]} /></div>
                                    </div>
                                    <div style={{ color: "#808080" }}>{list["kategori"]}</div>
                                </Link>

                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>

        </div>
    </>

}

export default Lihat_produk;



export async function getServerSideProps(context) {
    // calling an external API to fetch data


    const cdat = context.query;

    let users;
    await axios.post(baseUrl("public/get_meta_lihat_produk"),
        qs.stringify({
            "id_produk": cdat["lihat-produk"][0],
        })
    )
        .then((respon) => {
            users = respon.data;
        })
    // this returning data can be accessed from the component using the prop name
    return { props: { users, cdat } };
}
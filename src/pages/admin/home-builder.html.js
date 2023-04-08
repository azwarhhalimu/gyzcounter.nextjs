import axios from "axios";
import { useEffect, useState } from "react";
import { baseUrl, path_admin } from "@/Utils/Config";

import { Swiper, SwiperSlide } from "swiper/react";
import qs from "query-string";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";


// import required modules
import { Pagination } from "swiper";
import Height from "@/Utils/Height";
import Item_list from "@/Widget/Item_list";
import Item_slide from "@/Widget/Item_slide";
import Autentifkasi from "@/Utils/Autentifikasi";
import Loading_save from "@/Utils/Loading_save";
import { useRouter } from "next/router";
import Head from "next/head";



const Home_builder = () => {
    const route = useRouter();

    const [reload, setReload] = useState(0);

    const [data, setData] = useState([]);
    const [home_builder_sidebar, setHome_builder_sidebar] = useState([]);
    const [hapus, setHapus] = useState("");
    useEffect(() => {

        _gethome_builer();
        _getHome_builder_sidebar();
    }, [reload])

    const _gethome_builer = () => {
        new Autentifkasi().createHeaderAdmin().then(bearer => {
            axios.post(baseUrl("admin/get_home_builder"), {},
                {
                    headers: {
                        "Authorization": bearer
                    }
                }
            ).then((respon) => {
                setData(respon.data.data);
            });
        })
    }
    const _getHome_builder_sidebar = () => {
        new Autentifkasi().createHeaderAdmin().then(bearer => {
            axios.post(baseUrl("admin/get_home_builder_sidebar"), {},
                {
                    headers: {
                        "Authorization": bearer
                    }
                }
            ).then((respon) => {
                setHome_builder_sidebar(respon.data.data);
            });
        })

    }
    const _hapus_item = (id) => {

        const alert = window.confirm("Apakah anda ingin hapus data ini?");
        if (alert) {
            setHapus(id);
            new Autentifkasi().createHeaderAdmin().then(bearer => {
                axios.post(baseUrl("admin/delete_item_home_builder"),
                    qs.stringify({
                        "id_add_produk": id,
                    }),
                    {
                        headers: {
                            "Authorization": bearer
                        }
                    }
                ).then((respon) => {
                    setHapus("");
                    if (respon.data.status == "item_deleted") {
                        window.alert("Data berhasil di hapus");
                        setReload(reload + 2);
                    }
                })
            })
        }
    }
    const _hapus_home_builder = (id, target) => {

        const confirm = window.confirm("Menghapus data ini akan menghapus seluruh item pada item builder.\nApakah anda yakin akan menghapus data ini?")
        if (confirm) {
            setHapus(id);
            new Autentifkasi().createHeaderAdmin().then(bearer => {
                axios.post(baseUrl("admin/delete_home_builder"),
                    qs.stringify({
                        "target": target,
                        'id_home_builder': id
                    }),
                    {
                        headers: {
                            "Authorization": bearer
                        }
                    }
                ).then((respon) => {
                    setHapus("");
                    if (respon.data.status == "data_terhapus") {
                        window.alert("Data terhapus");
                        setReload(reload + 1);
                    }
                });
            })
        }
    }
    return <>
        <Head>
            <title>Home Builder</title>
        </Head>
        <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Home builder</h1>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="./">Home</a></li>
                    <li className="breadcrumb-item">Pages</li>
                    <li className="breadcrumb-item active" aria-current="page">Blank Page</li>
                </ol>
            </div>
            <div className="row">
                <div className="col-lg-3">
                    <button
                        className="btn btn-success"
                        onClick={() => {
                            route.push("/admin/home-builder/add-home-builder-sidebar.html");
                        }}
                    >Add Item</button>
                    <Height height={20} />

                    {home_builder_sidebar.map((list, index) => (
                        <div key={index + "dcs"} style={{ border: "1px dashed blue", marginTop: "10px", padding: "5px" }}>
                            {list["tipe"] != "BANNER" &&
                                <button passHref onClick={() => {
                                    route.push({
                                        pathname: "/admin/" + "/home-builder/" + list["id_home_builder_sidebar"] + "/add-produk.html",
                                        query: {
                                            "title": list["title"]
                                        }

                                    },
                                        "/admin/" + "/home-builder/" + list["id_home_builder_sidebar"] + "/add-produk.html"
                                    )
                                }} className="btn"> + Add</button>}
                            <button
                                onClick={() => {
                                    _hapus_home_builder(list["id_home_builder_sidebar"], "left")
                                }}
                                className="btn btn-danger btn-sm"><i className="fa fa-close" /> Hapus</button>
                            <span className="badge badge-danger pull-right">{list["tipe"]}</span>
                            <div style={{ fontWeight: "bold" }}>{list["title"]}</div>
                            <div>{list["sub_title"]}</div>
                            {list["tipe"] == "BANNER" && <img
                                style={{ width: "100%" }}
                                src={baseUrl("images/banner?w=300&s=" + list["id_home_builder_sidebar"])} />}
                            <hr />
                            {list["tipe"] == "LIST" ? <Item_list hapus={_hapus_item} list={list.data_produk} /> : <Item_slide getHapus={hapus} hapus={_hapus_item} list={list.data_produk} />}


                        </div>
                    ))}

                </div>
                <div className="col-lg-9">
                    <div className="contanier">
                        <button
                            onClick={() => {
                                route.push("/admin/home-builder/add-item-home-builder.html");

                            }}
                            className="btn btn-success">Add Item</button>
                        <hr />
                        {data.map((list, index) => (

                            <div key={index + "jfklaj"} style={{ border: "1px solid #DFDFDF", marginBottom: "10px", padding: "10px" }}>
                                <div className="pull-right">
                                    {hapus == list['id_home_builder'] ? <Loading_save text={"Menghapus"} /> : <button
                                        onClick={() => {
                                            _hapus_home_builder(list['id_home_builder'], "main")
                                        }}
                                        className="btn btn-danger"><i className="fa fa-trash" />Hapus</button>}
                                    {" "}
                                    <button

                                        onClick={() => {
                                            route.push({
                                                pathname: "/admin/home-builder/" + list["id_home_builder"] + "/add-produk.html",
                                                query: {
                                                    "home_builder": list["title"]

                                                }
                                            });
                                        }}
                                        className="btn btn-primary"> <i className="fa fa-plus" /> Add Produk</button>
                                </div>
                                <div style={{ fontWeight: "bold" }}>{list["title"]}</div>
                                <div style={{ opacity: "0.6;" }}>{list["sub_title"]}</div>
                                <Swiper
                                    slidesPerView={"auto"}
                                    centeredSlides={false}
                                    spaceBetween={30}
                                    grabCursor={false}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    {
                                        list.data_produk.map((produk, i) => (
                                            <SwiperSlide style={{
                                                border: "1px solid #DFDFDF",
                                                width: "190px",

                                            }} key={i + "dfso"}>
                                                <div style={{ width: "100%", background: "#DFDFDF" }}>
                                                    <img style={{ width: "100%" }} src={baseUrl("images/produk?s=" + produk["foto"]) + "&w=200"} />
                                                </div>

                                                <div style={{ padding: "10px" }}>
                                                    <div style={{ fontWeight: "bold", height: "65px" }}>{produk["nama_produk"]}</div>
                                                    <div>Rp. {produk["harga"]}</div>
                                                    <div>
                                                        {hapus == produk["id_add_produk"] ? <Loading_save text={"Deleted"} /> : <button onClick={() => {
                                                            _hapus_item(produk["id_add_produk"]);
                                                        }} className="btn"><i className="fa fa-trash" />Delete </button>}
                                                    </div>

                                                </div>

                                            </SwiperSlide>
                                        ))
                                    }

                                </Swiper>

                            </div>
                        ))}
                        {data.length == 0 && <center>
                            <div><i className="fa fa-info-circle" style={{ fontSize: "50px" }} /></div>
                            <div>Item Builder Masih kosong</div>
                        </center>}
                    </div>
                </div>
            </div>
        </div >
    </>
}
export default Home_builder;
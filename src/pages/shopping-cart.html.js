
import Autentifkasi from '@/Utils/Autentifikasi';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { baseUrl, random } from '@/Utils/Config';
import { SessionManager } from '@/Utils/SessionManager';
import qs from "query-string";
import { dencryptAES, encryptAES } from '@/Utils/enkripsi';
import Height from '@/Utils/Height';
import Update_cart from './Update_cart.js';
import { isMobile } from 'react-device-detect';
import Nav_bottom from '@/Widget/Mobile_komponen/Nav_bottom';
import AppBar from '@/Widget/Mobile_komponen/AppBar';
import Loading_mobile from '@/Utils/Loading_mobile';
import { useRouter } from 'next/router';
import { CKontext } from '@/Componen/UserLayout';
const Shopping_cart = () => {
    const route = useRouter();

    const [data, setData] = useState([]);

    const [edit, setEdit] = useState();
    const [total, setTotal] = useState(0);
    const [loading, setLoading] = useState(false);
    const { updateMenuCart, setUpdateMenuCart } = useContext(CKontext);
    useEffect(() => {

        var c = new SessionManager().getUser();
        if (c == null) {
            window.alert("Anda harus login dulu");
            route.push("/login.html");
        }
        _getCart();
        document.title = "Keranjang Belanja";
    }, [])
    const _getCart = async () => {
        setLoading(true);
        var auth = new Autentifkasi();
        auth.createHeader().then((bearer) => {
            axios.post(baseUrl("user/get_shopping_cart"),

                qs.stringify({
                    "data": encryptAES(new SessionManager().getUser()["id_user"]),
                }),
                {
                    headers: {
                        "Authorization": bearer
                    }
                }
            ).then((respon) => {
                setData(dencryptAES(respon.data.data));
                setTotal(respon.data.total);
                setLoading(false)
            });
        })
    }
    const _callBack = () => {

        setEdit("");
        _getCart();

    }
    const _hapus = (id) => {
        const confir = window.confirm("Apakah andai ingin hapus data ini?");
        if (confir) {
            new Autentifkasi().createHeader().then((bearer) => {
                axios.post(baseUrl("user/delete_cart"),
                    qs.stringify({
                        "data": encryptAES(id),
                    }),

                    {
                        headers: {
                            "Authorization": bearer
                        }
                    }
                )
                    .then((respon) => {
                        if (respon.data.status == "cart_deleted") {
                            window.alert("Cart berhasil di hpaus");
                            _callBack();
                            setUpdateMenuCart(random);

                        }
                    });
            })
        }
    }
    return (
        <>
            {loading && <Loading_mobile />}
            {isMobile && <AppBar leadingButton={true} title={"Keranjang Belanja"} />}
            <section className="section" id="about">
                <div className="container">
                    <div className="row">
                        <div className="card" style={{ width: "100%", margin: "10px" }}>
                            <div className='card-header'>
                                <div style={{ fontWeight: "bold" }}> Keranjang Belanja</div>
                            </div>
                            <div className='card-body'>
                                {isMobile ? <></> :
                                    <>
                                        <table className='table'>
                                            <thead>
                                                <tr style={{ borderTop: "none", fontWeight: "bold" }}>
                                                    <td></td>
                                                    <td>Nama Produk</td>
                                                    <td>Jumlah </td>
                                                    <td>Harga Satuan</td>
                                                    <td>Harga Total</td>
                                                    <td>Hapus</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {data.map((list, index) => (
                                                    <tr>
                                                        <td>
                                                            <img style={{ width: "60px", borderRadius: "5px", border: "2px solid #DFDFDF" }} src={baseUrl("images/produk?w=70&s=" + list["foto"])} />
                                                        </td>
                                                        <td>{list["nama_produk"]}

                                                        </td>
                                                        <td>
                                                            {edit == list["id_cart"] ? <Update_cart
                                                                callBack={_callBack}
                                                                id_cart={list["id_cart"]} jumlah={list["jumlah"]} /> : <>
                                                                {list["jumlah"]}
                                                                <button className='btn '
                                                                    onClick={() => {
                                                                        setEdit(list["id_cart"]);
                                                                    }}
                                                                    style={{ fontSize: "12px" }}><i className='fa fa-edit' />Ubah</button>

                                                            </>}
                                                        </td>
                                                        <td>Rp. {list["harga_satuan"]}</td>
                                                        <td>Rp. {list["total"]}</td>
                                                        <td>
                                                            <button onClick={() => {
                                                                _hapus(list["id_cart"])
                                                            }} className='btn btn-danger'>
                                                                <i className='fa fa-close' />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </>}

                                <hr />
                                <div style={{ textAlign: "right", fontWeight: "bold" }}>
                                    Total Pembayaran: Rp. {total}
                                </div>
                                <hr />
                                <div style={{ textAlign: "right" }}>
                                    <Height height={30} />

                                    <button onClick={() => {
                                        navigasi("/");
                                    }} className='btn'><i className='fa fa-arrow-left' /> Kembali Berbelanja</button>
                                    {" "}
                                    <button onClick={() => {
                                        navigasi("/selesaikan-transaksi.html")
                                    }} className='btn btn-primary'>Selesaikan Belanjaan</button>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </section>
            {isMobile && <Nav_bottom selected={3} />}
        </>
    );
};
export default Shopping_cart;
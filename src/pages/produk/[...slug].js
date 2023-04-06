import { baseUrl } from "@/Utils/Config";
import Height from "@/Utils/Height";
import axios from "axios";
import Head from "next/head";
import qs from "query-string";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const Lihat_produk = () => {


    const [jumlah, setJumlah] = useState(0);
    const [isAdd, setIsAdd] = useState(false);
    const [reload, setReload] = useState(0);
    const [swiper, setSwiper] = useState(null);
    const [sp, setSp] = useState(null);

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        _getData();
    }, [reload]);


    const [id, setId] = useState(0);
    const [data, setData] = useState({});
    const [fotoProduk, setFotoProduk] = useState([]);
    const [produkLainnya, setProdukLainnya] = useState([]);
    const _getData = () => {
        setLoading(true);
        axios.post(baseUrl("public/lihat_produk"),
            qs.stringify({
                "id_produk": id
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
            navigasi("/login.html");
        }
        var auth = new Autentifkasi();


        auth.createHeader().then((bearer) => {
            const id_user = new SessionManager().getUser()["id_user"]
            const data = {
                "id_user": id_user,
                "id_produk": id,
                "jumlah": jumlah,
            };
            console.log(id_user);

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
                setUpdateMenuCart(random);
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
            //   navigasi("/login.html");
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
                        setUpdateMenuCart(random);
                        window.alert("Data berahasil ditambahkan");
                        //     navigasi("/shopping-cart.html")
                    }
                });
        })
    }
    return (
        <div>
            <div>Sawar halimu</div>
            <p>df</p>
        </div>


    );
}

export default Lihat_produk;
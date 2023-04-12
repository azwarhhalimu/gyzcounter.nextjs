import axios from "axios"
import { useEffect, useState } from "react"
import Autentifkasi from "@/Utils/Autentifikasi"
import { baseUrl } from "@/Utils/Config"
import { dencryptAES, encryptAES } from "@/Utils/enkripsi"
import Height from "@/Utils/Height"
import { SessionManager } from "@/Utils/SessionManager"
import qs from "query-string";
import { useRouter } from "next/router"
const Selesaikan_transaksi = () => {
    const route = useRouter();
    const [nama, setNama] = useState();
    const [alamat, setAlamat] = useState();
    const [no_handphone, setNo_handphone] = useState();
    const [pPengiriman, setPpengiriman] = useState(0);





    const [data, setData] = useState([]);
    const [total, setTotal] = useState();

    const _getCart = () => {
        new Autentifkasi().createHeader().then((bearer) => {
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
            })
        })
    }
    useEffect(() => {
        _getCart();
        if (data.length == 0) {
            alert("Keranjang belanja anda masih kosong. Silahkan tambahkan data belanja anda")
            route.push("/");
            return;
        }
    }, [])
    const _submit = (e) => {
        e.preventDefault();
        if (pPengiriman == 0) {
            window.alert("Pilih dulu metode pengiriman");
        }
        else {
            const data = {
                "id_user": new SessionManager().getUser()["id_user"],
                "nama": nama,
                "alamat": alamat,
                "no_handphone": no_handphone,
                "metode_pengiriman": pPengiriman == 1 ? "ambil_sendiri" : "diantarkan"
            };
            new Autentifkasi().createHeader().then((bearer) => {
                axios.post(baseUrl("user/save_transaction"),
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
                        if (respon.data.status == "cart_tersimpan") {
                            window.alert("Transaksi Berhasil Tersimpan");
                            route.push("/" + respon.data.id_transaksi + "/transaksi-sukses.html");
                        }
                    })
            })
        }
    }
    return <>
        {data.length == 0 ? <div>Cart Masih ksong</div> : <section className="section" id="about">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7">
                        <div style={{ fontWeight: "bold" }}>Rincian Pesanan Anda</div>
                        <div style={{ opacity: "0.6" }}>
                            Silahkan periksa kembali pesanan anda agar tidak terjadi kesalahan

                        </div>
                        <Height height={10} />
                        <div style={{ border: "1px solid #DFDFDF", padding: "15px", borderRadius: "3px" }}>
                            <table cellPadding={"5px"} style={{ width: "100%" }}>
                                {data.map((list, index) => (
                                    <tr>
                                        <td>
                                            <img style={{ borderRadius: "4px", border: "1px solid #DFDFDF", padding: "5px", width: "60px" }} src={baseUrl("images/produk?w=40&s=" + list["foto"])} />
                                        </td>
                                        <td width={"20px"}></td>
                                        <td>
                                            <div style={{ fontWeight: "bold" }}> {list["nama_produk"]}</div>
                                            <div style={{ opacity: "0.5" }}> Rp. {list["harga_satuan"]}</div>
                                        </td>
                                        <td>
                                            <div style={{ textAlign: "right", opacity: "0.5" }}>
                                                x{list['jumlah']}
                                            </div>
                                            <div style={{ textAlign: "right" }}>
                                                Rp. {list['total']}
                                            </div>
                                        </td>
                                    </tr>
                                ))}

                            </table>
                        </div>

                        <Height height={20} />
                        <div style={{ fontWeight: "bold" }}> Metode Pickup</div>
                        <Height height={10} />
                        <div>
                            <div onClick={() => {
                                setPpengiriman(1);
                            }} style={{ border: "1px solid #DFDFDF", borderRadius: "5px", cursor: "pointer", background: pPengiriman == 1 ? "#E6E6E6" : "#FFF" }} className="card-body">
                                <table>
                                    <tr>
                                        <td width={"50px"}>
                                            <img className="img img-responsive" style={{ width: "100%", opacity: "0.5" }} src="/ambil_sendiri.svg" />
                                        </td>
                                        <td width={"20px"}></td>
                                        <td>
                                            <div style={{ fontWeight: "bold" }}>Ambil Sendiri</div>
                                            <div style={{ opacity: "0.5" }}>Barang yang anda pesan, dapat di ambil sendiri sesuai dengan waktu dan tempat yang disepakati</div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <Height height={"10px"} />
                            <div
                                onClick={() => {
                                    setPpengiriman(2);
                                }}
                                style={{ border: "1px solid #DFDFDF", borderRadius: "5px", cursor: "pointer", background: pPengiriman == 2 ? "#E6E6E6" : "#FFF" }} className="card-body">
                                <table>
                                    <tr>
                                        <td width={"50px"}>
                                            <img className="img img-responsive" style={{ width: "100%", opacity: "0.5" }} src="/delivery.svg" />
                                        </td>
                                        <td width={"20px"}></td>
                                        <td>
                                            <div style={{ fontWeight: "bold" }}>Di Antarkan</div>
                                            <div style={{ opacity: "0.5" }}>Barang yang anda pesan, akan kami antarkan sesuai kesepakatan. </div>
                                        </td>
                                        <td width={"50px"}>
                                            <span className="badge badge-success">Free</span>
                                        </td>
                                    </tr>
                                </table>
                            </div>

                        </div>

                    </div>
                    <div className="col-lg-5">
                        <div style={{ fontWeight: "bold" }}>Informasi Pembelian</div>

                        <div>
                            <Height height={"20"} />
                            <br />
                            <form onSubmit={_submit}>
                                <div>
                                    <label>
                                        Nama Lengkap
                                    </label>
                                    <input
                                        onChange={(e) => {
                                            setNama(e.target.value);
                                        }}
                                        required className="form-control" type={"text"} placeholder="Nama lengkap" />
                                </div>
                                <br />
                                <div>
                                    <label>
                                        Nomor Handphone
                                    </label>
                                    <input
                                        onChange={(e) => {
                                            setNo_handphone(e.target.value);
                                        }}
                                        required className="form-control" type={"text"} placeholder="Nomor handphone anda" />
                                </div>
                                <br />
                                <div>
                                    <label>
                                        Alamat
                                    </label>
                                    <textarea
                                        onChange={(e) => {
                                            setAlamat(e.target.value);
                                        }}
                                        required className="form-control" type={"text"} placeholder="Alamat Lengkap anda" ></textarea>
                                </div>

                                <table className="table">
                                    <tr>
                                        <td>Total Belanja</td>
                                        <td style={{ textAlign: "right" }}>{total}</td>
                                    </tr>
                                </table>
                                <button type="submit" className="btn btn-danger btn-block">Bayar Sekarang</button>

                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>}
    </>
}
export default Selesaikan_transaksi;
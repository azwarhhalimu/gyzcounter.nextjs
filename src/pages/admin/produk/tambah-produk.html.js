import axios from "axios";
import { useEffect, useState } from "react";
import CurrencyInput from "react-currency-input-field";
import { baseUrl, path_admin, token } from "@/Utils/Config";
import qs from "query-string";
import Autentifkasi from "@/Utils/Autentifikasi";
import Loading_save from "@/Utils/Loading_save";
import { useRouter } from "next/router";
const Tambah_produk = () => {
    const route = useRouter();
    const [kategori, setKategori] = useState([]);
    const [satuan, setSatuan] = useState([]);

    const [harga, setHarga] = useState("0");
    const [namaProduk, setNamaProduk] = useState("");
    const [pSatuan, setPSatuan] = useState("");
    const [pKategori, setPKategori] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [hargaCorrect, setHargaCorrect] = useState("0");

    const [loading, setLoading] = useState(false);
    const [cHarga, setCHarga] = useState(false);

    useEffect(() => {
        _getKategori();
        _getSatuan();
    }, []);

    const _getSatuan = () => {
        new Autentifkasi().createHeaderAdmin().then((bearer) => {
            axios
                .post(baseUrl("admin/get_satuan"),
                    qs.stringify({
                        "data": "adf"
                    }),
                    {
                        headers: {
                            "Authorization": bearer
                        }
                    }
                )
                .then((respon) => {
                    setSatuan(respon.data.data);
                });
        })
    };
    const _getKategori = () => {
        new Autentifkasi().createHeaderAdmin().then((bearer) => {
            axios
                .post(baseUrl("admin/get_kategori"),
                    qs.stringify({
                        "data": "adf"
                    }),
                    {
                        headers: {
                            "Authorization": bearer
                        }
                    }
                )
                .then((respon) => {
                    setKategori(respon.data.data);
                });
        })
    };

    const _simpan = (e) => {
        e.preventDefault();
        setLoading(true);
        new Autentifkasi().createHeaderAdmin().then((bearer) => {
            axios
                .post(
                    baseUrl("admin/save_produk"),
                    qs.stringify({
                        nama_produk: namaProduk,
                        kategori: pKategori,
                        satuan: pSatuan,
                        harga: harga,
                        harga_correct: hargaCorrect,
                        deskripsi: deskripsi,
                    }),
                    {
                        headers: {
                            "Authorization": bearer
                        }
                    }
                )
                .then((respon) => {
                    setLoading(false);

                    if (respon.data.status == "produk_saved") {
                        // console.log(respon.data);
                        const id_produk = respon.data["id_produk"];
                        window.alert("Produk tersimpan");
                        route.push(
                            {
                                pathname: "/admin/"
                                    +
                                    "produk/" + id_produk + "/upload-foto.html",
                                query: {
                                    "nama_prdouk": respon.data["nama_produk"]
                                }
                            },

                            "/admin/produk/" + id_produk + "/upload-foto.html"
                        );
                    }
                });
        })
    };

    return (
        <>
            <div className="container-fluid" id="container-wrapper">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <button
                        onClick={() => {
                            route.back();
                        }}
                        className="btn btn-danger"
                    >
                        <i className="fa fa-chevron-left" />
                        Kembali
                    </button>
                    <h1 className="h3 mb-0 text-gray-800">Tambah Produk Baru</h1>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="./">Home</a>
                        </li>
                        <li className="breadcrumb-item">Pages</li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Blank Page
                        </li>
                    </ol>
                </div>
                <div className="col-lg-7" style={{ margin: "auto" }}>
                    <div className="card">
                        <div className="card-header">
                            <div style={{ fontWeight: "bold" }}>Produk Baru</div>
                        </div>
                        <div className="card-body">
                            <form onSubmit={_simpan}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Pilih Kategori</label>
                                    <select
                                        onChange={(e) => {
                                            setPKategori(e.target.value);
                                        }}
                                        required
                                        className="form-control"
                                    >
                                        <option value={""}>Pilih Kategori</option>
                                        {kategori.map((list, index) => (
                                            <option key={index} value={list["id_kategori"]}>
                                                {list["nama_kategori"]}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Nama Produk</label>
                                    <input
                                        type="text"
                                        onChange={(e) => {
                                            setNamaProduk(e.target.value);
                                        }}
                                        required
                                        className="form-control"
                                        id="exampleInputEmail1"
                                        aria-describedby="emailHelp"
                                        placeholder="Masukkan nama produk"
                                    />
                                    <small id="emailHelp" className="form-text text-muted">
                                        contoh Oppo F 30
                                    </small>
                                </div>
                                <div className="row" style={{ paddingLeft: "14px" }}>
                                    <div col-lg-6>
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">
                                                Masukkan harga produk
                                            </label>
                                            <CurrencyInput
                                                prefix="Rp. "
                                                className="form-control"
                                                id="input-example"
                                                name="input-name"
                                                decimalSeparator=","
                                                groupSeparator="."
                                                placeholder="Masukkan harga"
                                                defaultValue={0}
                                                decimalsLimit={0}
                                                required
                                                onValueChange={(value) => {
                                                    setHarga(value);
                                                }}
                                            />

                                            <small id="emailHelp" className="form-text text-muted">
                                                Tidak perlu menuliskan nilai Rp
                                            </small>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Pilih Satuan</label>
                                            <select
                                                onChange={(e) => {
                                                    setPSatuan(e.target.value);
                                                }}
                                                className="form-control"
                                            >
                                                <option value={""}>Pilih Satuan</option>
                                                {satuan.map((list, index) => (
                                                    <option key={index + "sef"} value={list["id_satuan"]}>
                                                        {list["nama_satuan"]}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    </div>
                                    <label>
                                        <input
                                            type={"checkbox"}
                                            value="Ok"
                                            checked={cHarga}
                                            onChange={(e) => {
                                                setCHarga(cHarga ? false : true);
                                            }}
                                        />{" "}
                                        Tambahkan Harga Correct
                                    </label>
                                </div>
                                {cHarga && (
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">
                                            Tambahkan Harga Correct{" "}
                                        </label>
                                        <CurrencyInput
                                            prefix="Rp. "
                                            className="form-control"
                                            id="input-example"
                                            name="input-name"
                                            decimalSeparator=","
                                            groupSeparator="."
                                            placeholder="Masukkan harga correct"
                                            defaultValue={0}
                                            decimalsLimit={0}
                                            required
                                            onValueChange={(value) => {
                                                setHargaCorrect(value);
                                            }}
                                        />
                                        <small id="emailHelp" className="form-text text-muted">
                                            Masukkan harga correct lebih besar dari harga jual
                                        </small>
                                    </div>
                                )}
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Deskripsi</label>
                                    <textarea
                                        placeholder="Spek, warna"
                                        onChange={(e) => {
                                            setDeskripsi(e.target.value);
                                        }}
                                        className="form-control"
                                    ></textarea>
                                    <small id="emailHelp" className="form-text text-muted">
                                        Masukkan deskripsi dari produk anda
                                    </small>
                                </div>

                                {loading ? <Loading_save text={"menyimpan"} />
                                    :
                                    <button type="submit" className="btn btn-primary">
                                        Simpan
                                    </button>}
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Tambah_produk;
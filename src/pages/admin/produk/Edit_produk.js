import { useEffect, useState } from "react";
import { baseUrl, } from "@/Utils/Config";
import axios from "axios";
import qs from "query-string";
import CurrencyInput from "react-currency-input-field";
import Autentifkasi from "@/Utils/Autentifikasi";
import Loading_save from "@/Utils/Loading_save";
const Edit_produk = (props) => {
    const [kategori, setKategori] = useState([]);
    const [satuan, setSatuan] = useState([]);

    const [nama_produk, setNamaProduk] = useState(props.nama_produk);
    const [harga, setHarga] = useState(props.harga);
    const [harga_correct, setHargaCorrect] = useState(props.harga_correct);
    const [pSatuan, setPSatuan] = useState(props.satuan);
    const [pKategori, setPKategori] = useState(props.kategori);
    const [deskripsi, setDeskripsi] = useState(props.deskripsi);
    const [loading, setLaoding] = useState(false);
    useEffect(() => {
        _getKategori();
        _getSatuan();
    }, []);

    const _getSatuan = () => {
        new Autentifkasi().createHeaderAdmin().then((bearer) => {
            axios
                .post(baseUrl("admin/get_satuan"),
                    qs.stringify({ "data": "az" }),
                    {
                        headers: {
                            "Authorization": bearer
                        }
                    })
                .then((respon) => {
                    setSatuan(respon.data.data);
                });
        })
    };
    const _getKategori = () => {
        new Autentifkasi().createHeaderAdmin().then((bearer) => {
            axios
                .post(baseUrl("admin/get_kategori"),
                    qs.stringify({ "data": "azwar" }),
                    {
                        headers: {
                            "Authorization": bearer
                        }
                    })
                .then((respon) => {
                    setKategori(respon.data.data);
                });
        })
    };
    const _update = () => {
        const confirm = window.confirm("Apakah anda ingin update data ini?");
        if (confirm) {
            setLaoding(true);
            new Autentifkasi().createHeaderAdmin().then((bearer) => {
                axios
                    .post(
                        baseUrl("admin/update_produk"),
                        qs.stringify({
                            id_produk: props.id_produk,
                            nama_produk: nama_produk,
                            kategori: pKategori,
                            harga: harga,
                            harga_correct: harga_correct,
                            satuan: pSatuan,
                            deskripsi: deskripsi,
                        }),
                        {
                            headers: {
                                "Authorization": bearer
                            }
                        }
                    )
                    .then((respon) => {
                        setLaoding(false);
                        if (respon.data.status == "produk_updated") {
                            alert("Produk berhasil di update");
                            props._batal();
                            props._callBack();
                        }
                    });
            })
        }
    };
    return (
        <>
            <tr style={{ background: "#2B80F02C" }}>
                <td colSpan={1}></td>
                <td>
                    <label>Nama Produk</label>
                    <input
                        type={"text"}
                        onChange={(e) => {
                            setNamaProduk(e.target.value);
                        }}
                        value={nama_produk}
                        placeholder="Nama Produk"
                        className={"form-control"}
                    />
                </td>
                <td>
                    <label>Kategori</label>
                    <select
                        value={pKategori}
                        onChange={(e) => {
                            setPKategori(e.target.value);
                        }}
                        className="form-control"
                    >
                        <option value={""}>Kategori</option>
                        {kategori.map((list, index) => (
                            <option
                                key={index + "443"}
                                {...(pKategori == list["id_kategori"] && " selected ")}
                                value={list["id_kategori"]}
                            >
                                {list["nama_kategori"]}
                            </option>
                        ))}
                    </select>

                    <labe>Satuan</labe>
                    <select
                        value={pSatuan}
                        onChange={(e) => {
                            setPSatuan(e.target.value);
                        }}
                        className="form-control"
                    >
                        <option value={""}>Satuan</option>
                        {satuan.map((list, index) => (
                            <option
                                key={index + "fad"}
                                {...(pSatuan == list["id_satuan"] && " selected ")}
                                value={list["id_satuan"]}
                            >
                                {list["nama_satuan"]}
                            </option>
                        ))}
                    </select>
                </td>
                <td>
                    <label>Harga</label>
                    <CurrencyInput
                        prefix="Rp. "
                        className="form-control"
                        id="input-example"
                        name="input-name"
                        value={harga}
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
                    <label>Harga Corect</label>
                    <CurrencyInput
                        prefix="Rp. "
                        className="form-control"
                        id="input-example"
                        name="input-name"
                        value={harga_correct}
                        decimalSeparator=","
                        groupSeparator="."
                        placeholder="Masukkan harga"
                        defaultValue={0}
                        decimalsLimit={0}
                        required
                        onValueChange={(value) => {
                            setHargaCorrect(value);
                        }}
                    />
                </td>
                <td>
                    <label>Deskripsi</label>
                    <textarea
                        value={deskripsi}
                        onChange={(e) => {
                            setDeskripsi(e.target.value);
                        }}
                        type={"text"}
                        placeholder="Masukkan harga"
                        className={"form-control"}
                    ></textarea>
                </td>
            </tr>
            <tr style={{ background: "#2B80F02C" }}>
                <td
                    colSpan={5}
                    style={{
                        textAlign: "right",
                    }}
                >
                    <button
                        onClick={() => {
                            props._batal();
                        }}
                        className="btn btn-danger"
                    >
                        Batal
                    </button>{" "}
                    {loading ? <Loading_save text={"Updeting"} /> : <button
                        onClick={() => {
                            _update();
                        }}
                        className="btn btn-primary"
                    >
                        Update Data
                    </button>}
                </td>
            </tr>
        </>
    );
};

export default Edit_produk;
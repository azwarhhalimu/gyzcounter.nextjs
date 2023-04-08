import { useEffect, useRef } from "react";

import { useState } from "react";
import "cropperjs/dist/cropper.css";
import { Cropper } from "react-cropper";
import axios from "axios";
import { baseUrl, path_admin, } from "@/Utils/Config";
import qs from "query-string";
import Loading from "@/Utils/Loading";
import Autentifkasi from "@/Utils/Autentifikasi";
import Loading_save from "@/Utils/Loading_save";
import { useRouter } from "next/router";
const Upload_foto = () => {
    const route = useRouter();
    const _pilihFile = useRef(null);
    const _btnSubmit = useRef(null);
    //state coropper

    const [isLoading, setIsLoading] = useState(false);
    const [src, setSrc] = useState();
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [x, setX] = useState();
    const [img, setImg] = useState();
    const [y, setY] = useState();

    const [isCrop, setIsCrop] = useState(false);
    const [data, setData] = useState([]);
    const [reload, setReload] = useState(1);
    const [loading, setLoading] = useState(false);
    const [hapus, setHapus] = useState("");
    const [id, setId] = useState("");

    useEffect(() => {
        const url = window.location.pathname;

        setId(url.split("/")[3]);

        _getFoto_produk(url.split("/")[3]);
    }, [reload]);
    const _getFoto_produk = (id) => {
        new Autentifkasi().createHeaderAdmin().then((bearer) => {
            setIsLoading(true);
            axios
                .post(
                    baseUrl("admin/get_foto_produk"),
                    qs.stringify({
                        id_produk: id,
                    }),
                    {
                        headers: {
                            Authorization: bearer,
                        },
                    },
                )
                .then((respon) => {
                    setIsLoading(false);
                    setData(respon.data.data);
                    // console.log(respon.data);
                });
        })
    };
    //uplaod foto
    const _upload = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();
        formData.append("id_produk", id);
        formData.append("x", x);
        formData.append("y", y);
        formData.append("width", width);
        formData.append("height", height);
        formData.append("foto", img);

        new Autentifkasi().createHeaderAdmin().then((bearer) => {
            axios
                .post(baseUrl("admin/upload_foto_produk"), formData, {
                    headers: {
                        "Authorization": bearer,
                    },
                })
                .then((respon) => {
                    setLoading(false);
                    if (respon.data.status == "upload_success") {
                        setReload(reload + 1);
                        window.alert("Upload Sukses");
                        setIsCrop(false);
                    }
                });
        })
    };

    const _setFeature = (id_produkx) => {
        new Autentifkasi().createHeaderAdmin().then((bearer) => {
            axios
                .post(
                    baseUrl("admin/set_feature_foto_produk"),
                    qs.stringify({
                        id_foto_produk: id_produkx,
                        id_produk: id,
                    }),
                    {
                        headers: {
                            Authorization: bearer,
                        },
                    },
                )
                .then((respon) => {
                    if (respon.data.status == "set_success") {
                        setReload(reload + 1);
                    }
                });
        })
    };
    const _hapus = (id) => {
        const c = window.confirm("Apakah anda ingin hapus foto ini?");
        if (c) {
            setHapus(id);
            new Autentifkasi().createHeaderAdmin().then((bearer) => {
                axios
                    .post(
                        baseUrl("admin/delete_foto_produk"),
                        qs.stringify({
                            id_foto_produk: id,
                        }),
                        {
                            headers: {
                                Authorization: bearer,
                            },
                        },
                    )
                    .then((respon) => {
                        setHapus(false);
                        if (respon.data.status == "foto_deleted") {
                            alert("Foto berhasil di hapus");
                            setReload(reload + 1);
                        }
                    });
            })
        }
    };
    return (
        <>
            <div className="container-fluid" id="container-wrapper">
                <div className="d-sm-flex align-items-center justify-content-between mb-4">
                    <button
                        onClick={() => {
                            route.push("/admin/produk");
                        }}
                        className="btn btn-danger"
                    >
                        <i className="fa fa-chevron-left" />
                        Keluar
                    </button>
                    <h1 className="h3 mb-0 text-gray-800">
                        Upload Foto <b>{route.query.nama_produk}</b>
                    </h1>
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">
                            <a href="./">Home</a>
                        </li>
                        <li className="breadcrumb-item">Pages</li>
                        <li className="breadcrumb-item active" aria-current="page">
                            Upload
                        </li>
                    </ol>
                </div>
                <div className="col-lg-7" style={{ margin: "auto" }}>
                    <div className="card">
                        <div className="card-body">
                            <div
                                style={{
                                    textAlign: "center",
                                    border: "1px dashed #DFDFDF",
                                    padding: "20px",
                                    borderRadius: "5px",
                                }}
                            >
                                <form
                                    onSubmit={_upload}
                                    style={{
                                        display: "none",
                                    }}
                                >
                                    <input
                                        required
                                        onChange={(event) => {
                                            event.preventDefault();
                                            let files;
                                            if (event.target) {
                                                files = event.target.files;
                                            }
                                            const reader = new FileReader();
                                            reader.onload = () => {
                                                setSrc(reader.result);
                                            };
                                            reader.readAsDataURL(files[0]);

                                            setImg(files[0]);
                                            setIsCrop(true);
                                        }}
                                        accept="image/png, image/jpg"
                                        ref={_pilihFile}
                                        type={"file"}
                                    />
                                    <button ref={_btnSubmit} type="submit">
                                        kirim
                                    </button>
                                </form>
                                {!isCrop && (
                                    <div>
                                        <button
                                            onClick={() => {
                                                _pilihFile.current.click();
                                            }}
                                            style={{
                                                border: "0px solid #DFDFDF",
                                                background: "#DFDFDF00",
                                            }}
                                        >
                                            <img
                                                src="/upload.png"
                                                style={{
                                                    width: "87px",
                                                }}
                                            />
                                        </button>

                                        <br />
                                        <div>Tekan gambar di atas untuk pilih gambar foto</div>
                                        <div style={{ color: "#0024F1C2" }}>
                                            Dengan format jpg, jpeg, atau png
                                        </div>
                                    </div>
                                )}

                                {isCrop && (
                                    <>
                                        <div style={{ fontWeight: "bold" }}>Crop Foto</div>
                                        <Cropper
                                            style={{
                                                height: 400,
                                                width: "100%",
                                                margin: "auto",
                                                borderRadius: "10px",
                                            }}
                                            // zoomTo={0.5}
                                            // initialAspectRatio={1}
                                            // preview=".img-preview"
                                            src={src}
                                            modal={true}
                                            viewMode={1}
                                            aspectRatio={1 / 1}
                                            minCropBoxHeight={10}
                                            minCropBoxWidth={10}
                                            background={false}
                                            responsive={true}
                                            autoCropArea={1}
                                            crop={(event) => {
                                                setWidth(event.detail.width.toFixed(2));
                                                setHeight(event.detail.height.toFixed(2));
                                                setY(event.detail.y.toFixed(2));
                                                setX(event.detail.x.toFixed(2));
                                            }}
                                            checkOrientation={true} // https://github.com/fengyuanchen/cropperjs/issues/671
                                            onInitialized={(instance) => {
                                                // setCropper(instance);
                                            }}
                                            guides={true}
                                        />
                                        <br />
                                    </>
                                )}

                                {isCrop && (
                                    <>
                                        <div style={{ opacity: "0.7" }}>
                                            Tekan tombol simpan untuk menyimpan foto produk
                                        </div>
                                        <br />
                                        {loading ? <Loading_save text={"Uploading"} /> : <button
                                            onClick={() => {
                                                _btnSubmit?.current.click();
                                            }}
                                            style={{ width: "150px" }}
                                            className="btn btn-primary"
                                        >
                                            Simpan
                                        </button>}{" "}
                                        <button
                                            onClick={() => {
                                                setIsCrop(false);
                                            }}
                                            className="btn btn-danger"
                                        >
                                            Batal
                                        </button>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                    <br />
                    {data.length > 0 && (
                        <div className="card">
                            <div className="card-body">
                                <table className="table">
                                    <thead>
                                        <tr
                                            style={{
                                                fontWeight: "bold",
                                            }}
                                        >
                                            <td></td>
                                            <td>Foto</td>
                                            <td>Kode Foto</td>
                                            <td></td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {data.map((list, index) => (
                                            !isLoading && <tr>
                                                <td>
                                                    {list["feature_default"] == "1" ? (
                                                        <button
                                                            onClick={() => {
                                                                _setFeature(list["id_foto_produk"]);
                                                            }}
                                                            className="btn btn-danger"
                                                        >
                                                            Batalkan
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => {
                                                                _setFeature(list["id_foto_produk"]);
                                                            }}
                                                            className="btn btn-success"
                                                        >
                                                            Set Feature
                                                        </button>
                                                    )}
                                                </td>
                                                <td>
                                                    <img
                                                        style={{
                                                            borderRadius: "4px",
                                                            border: "3px solid #DFDFDF",
                                                            width: "60px",
                                                        }}
                                                        src={baseUrl(
                                                            "images/produk?w=130&s=" + list["id_foto_produk"],
                                                        )}
                                                    />
                                                </td>
                                                <td>{list["id_foto_produk"]}</td>
                                                <td style={{ textAlign: "right" }}>
                                                    {hapus == list["id_foto_produk"] ? <Loading_save text={"Hapus"} /> : <button
                                                        onClick={() => {
                                                            _hapus(list["id_foto_produk"]);
                                                        }}
                                                        className="btn btn-danger"
                                                    >
                                                        Hapus
                                                    </button>}
                                                </td>
                                            </tr>
                                        ))}
                                        {isLoading && <Loading baris={10} kolom={4} />}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Upload_foto;
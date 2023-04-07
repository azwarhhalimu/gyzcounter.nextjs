
import { baseUrl, path_admin } from "@/Utils/Config";
import { useState } from "react";

import "cropperjs/dist/cropper.css";
import { Cropper } from "react-cropper";
import axios from "axios";
import Autentifkasi from "@/Utils/Autentifikasi";
import { encryptAES } from "@/Utils/enkripsi";
import Loading_save from "@/Utils/Loading_save";
import { useRouter } from "next/router";
import Link from "next/link";
const Tambah_slide_show = () => {

    const route = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [src, setSrc] = useState();
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [x, setX] = useState();
    const [img, setImg] = useState();
    const [y, setY] = useState();
    const [isCrop, setIsCrop] = useState(false);

    const [title, setTitle] = useState("");
    const [subTitle, setSubTitle] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [loading, setLoading] = useState(false);
    const _submit = (e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData();

        formData.append("x", x);
        formData.append("y", y);
        formData.append("width", width);
        formData.append("height", height);
        formData.append("foto", img);

        const data = {
            "title": title,
            "sub_title": subTitle,
            "deskripsi": deskripsi
        };
        formData.append("data", encryptAES(data));



        new Autentifkasi().createHeaderAdmin().then((bearer) => {
            axios.post(baseUrl("admin/save_slide_show"),
                formData,
                {
                    headers: {
                        "Authorization": bearer
                    }
                }
            ).then((respon) => {
                setLoading(false);
                if (respon.data.status == "data_saved") {
                    window.alert("Data slide berhasil di simpan");
                    route.back();
                }
            })
        });


    }
    return <>
        <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <button className="btn btn-danger" onClick={() => {
                    route.back();
                }}><i className="fa fa-chevron-left" />Kembali</button>
                <h1 className="h3 mb-0 text-gray-800">Tambah Slide Show</h1>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link href={"/admin/"}>Dashboard</Link></li>
                    <li className="breadcrumb-item"><Link href={"/admin/slide-show"}>Slide Show</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Tambah Slide Show</li>
                </ol>
            </div>
            <div className="row">
                <div className="col-lg-5" style={{ margin: "auto" }}>
                    <div className="card" style={{ minHeight: "0px" }}>
                        <div class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                            <h6 class="m-0 font-weight-bold text-primary">Tambah Slide Show</h6>
                        </div>
                        <div className="card-body">
                            <form onSubmit={_submit}>

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
                                            aspectRatio={20 / 7}
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
                                <div className="form-group">
                                    <div className="custom-file">
                                        <input
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
                                            required type="file" className="custom-file-input" id="customFile" />
                                        <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label>Judul Slide Show</label>
                                    <input onChange={(e) => {
                                        setTitle(e.target.value)
                                    }} required type="text" className="form-control" placeholder="Judul Slide Show" />

                                </div>
                                <div className="form-group">
                                    <label>Sub Judul Slide Show</label>
                                    <input
                                        onChange={(e) => {
                                            setSubTitle(e.target.value)
                                        }}
                                        required type="text" className="form-control" placeholder="Sub Judul Slide Show" />

                                </div>
                                <div className="form-group">
                                    <label>Deskripsi</label>
                                    <textarea required onChange={(e) => {
                                        setDeskripsi(e.target.value)
                                    }} className="form-control" placeholder="Deskripsi" />
                                </div>



                                {loading ? <Loading_save text={"Menyimpan"} /> : <button type="submit" className="btn btn-primary">Simpan</button>}
                            </form>

                        </div>
                    </div>
                </div>
            </div>

        </div></>
}
export default Tambah_slide_show;
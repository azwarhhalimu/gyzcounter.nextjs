import axios from "axios";
import { useState } from "react";
import { baseUrl } from "@/Utils/Config";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import Loading_save from "@/Utils/Loading_save";
import Autentifkasi from "@/Utils/Autentifikasi";
import { useRouter } from "next/router";

const Add_home_builder_sidebar = () => {
    const route = useRouter();
    const [title, setTitle] = useState();
    const [subTitle, setSubTitle] = useState();
    const [type, setType] = useState();
    const [url, setUrl] = useState("");

    const [loading, setLoading] = useState(false);

    //cropper
    const [src, setSrc] = useState();
    const [width, setWidth] = useState();
    const [height, setHeight] = useState();
    const [x, setX] = useState();
    const [img, setImg] = useState();
    const [y, setY] = useState();


    const _submit = (e) => {
        e.preventDefault();
        setLoading(true);
        const form = new FormData();
        form.append("title", title);
        form.append("sub_title", subTitle);
        form.append("tipe", type);
        form.append("link", url);
        form.append("foto", img);
        form.append("x", x);
        form.append("y", y);
        form.append("width", width);
        form.append("height", height);


        new Autentifkasi().createHeaderAdmin().then(bearer => {
            axios.post(baseUrl("admin/save_home_builder_sidebar"),
                form,
                {
                    headers: {
                        "Content-Type": "mulpart/form-data",
                        "Authorization": bearer
                    },
                }

            ).then((respon) => {
                setLoading(false);
                if (respon.data.status == "data_saved") {
                    window.alert("Sidebar builder berhasil disimpan");
                    route.back();
                }
            });
        })
    }
    return <>
        <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <button className="btn btn-danger" onClick={() => {
                    route.back();
                }}><i className="fa fa-chevron-left" /> Kembali</button>
                <h1 className="h3 mb-0 text-gray-800">Add Home Builder Sidebar</h1>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><a href="./">Admin</a></li>
                    <li className="breadcrumb-item">Home Builder</li>
                    <li className="breadcrumb-item active" aria-current="page">Home Builder Sidebar</li>
                </ol>
            </div>
            <div className="container">
                <div className="row">
                    <div className="col-lg-7" style={{ margin: "auto" }}>
                        <div className="card mb-4">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Form Basic</h6>
                            </div>
                            <div className="card-body">
                                <form onSubmit={_submit}>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Tipe</label>
                                        <select onChange={(e) => {
                                            setType(e.target.value)
                                        }} required className="form-control">
                                            <option value="">Pilih Tipe</option>
                                            <option value="SLIDE">SLIDE</option>
                                            <option value="BANNER">BANNER</option>
                                            <option value="LIST">LIST PRODUK</option>
                                        </select>
                                    </div>

                                    {type == "BANNER" && <>

                                        {img != null && <Cropper
                                            style={{ height: 400, width: "100%" }}
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
                                            checkOrientation={false} // https://github.com/fengyuanchen/cropperjs/issues/671
                                            onInitialized={(instance) => {
                                                // setCropper(instance);
                                            }}
                                            guides={true}
                                        />}
                                        <div className="form-group">
                                            <div className="custom-file">
                                                <input accept=""
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
                                                    }}
                                                    type="file" className="custom-file-input" id="customFile" />
                                                <label className="custom-file-label" htmlFor="customFile">Choose file</label>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <label htmlFor="exampleInputEmail1">Url</label>
                                            <input
                                                onChange={(e) => {
                                                    setUrl(e.target.value);
                                                }}
                                                accept="image/*"
                                                required type="url" className="form-control" placeholder="masukkan judul" />
                                            <small id="emailHelp" className="form-text text-muted">Masukkan url tujuan</small>
                                        </div>

                                    </>}
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Judul</label>
                                        <input
                                            onChange={(e) => {
                                                setTitle(e.target.value);
                                            }}
                                            required type="text" className="form-control" placeholder="masukkan judul" />
                                        <small id="emailHelp" className="form-text text-muted">Judul konten</small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="exampleInputEmail1">Sub Judul</label>
                                        <textarea
                                            onChange={(e) => {
                                                setSubTitle(e.target.value);
                                            }}
                                            required className="form-control" placeholder="Masukkan sub judul" />
                                        <small id="emailHelp" className="form-text text-muted">Judul konten</small>
                                    </div>
                                    {loading ? <Loading_save text={"Menyimapn"} /> : <button type="submit" className="btn btn-primary">Save</button>}
                                </form>
                            </div>
                        </div>

                    </div>

                </div>
            </div>
        </div>
    </>
}
export default Add_home_builder_sidebar;
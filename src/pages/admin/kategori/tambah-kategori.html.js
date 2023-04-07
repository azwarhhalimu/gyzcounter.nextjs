import axios from "axios";
import { baseUrl, path_admin } from "@/Utils/Config";
import qs from "query-string";
import { useState } from "react";
import Autentifkasi from "@/Utils/Autentifikasi";
import Loading_save from "@/Utils/Loading_save";
import { useRouter } from "next/router";

const Tambah_kategori = () => {
  const route = useRouter();
  const [nama_kategori, setNama_kategori] = useState();
  const [isLoading, setIsLoading] = useState(false);


  const _submit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    new Autentifkasi().createHeaderAdmin().then(bearer => {
      axios.post(baseUrl("admin/save_kategori"),
        qs.stringify(
          {
            "nama_kategori": nama_kategori
          }
        ),
        {
          headers: {
            "Authorization": bearer
          }
        }


      ).then((respon) => {
        if (respon.data.status == "kategori_saved") {
          alert("Data kategori berhasil di simpan")
          route.push("/admin/kategori");
        }
        else {
          alert("Data kategori gagal disimpan");
        }
        setIsLoading(false);
      })
    })
  }
  return (
    <>
      <div className="container-fluid" id="container-wrapper">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <button
            onClick={() => {
              route.back();
            }} className="btn btn-danger">
            <i className="fa fa-chevron-left" />
            Kembali</button>
          <h1 className="h3 mb-0 text-gray-800">Tambah Kategori</h1>
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
        <div className="col-lg-6" style={{ margin: "auto" }}>
          <div className="card">
            <div className="card-header">

              <h3>Tambah Kategori</h3>
            </div>
            <div className="card-body">
              <div>
                <form onSubmit={_submit}>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Nama Kategori</label>
                    <input
                      type="text"
                      required
                      onChange={(e) => {
                        setNama_kategori(e.target.value);
                      }}
                      className="form-control"
                      id="exampleInputEmail1"
                      aria-describedby="emailHelp"
                      placeholder="Masukka nama kategori"
                    />
                    <small id="emailHelp" className="form-text text-muted">
                      Masukkan nama kategori
                    </small>
                  </div>


                  {isLoading ? <Loading_save text={"menyimpan kategori"} /> : <button type="submit" className="btn btn-primary">
                    Simpan
                  </button>}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div >
    </>
  );
};

export default Tambah_kategori;

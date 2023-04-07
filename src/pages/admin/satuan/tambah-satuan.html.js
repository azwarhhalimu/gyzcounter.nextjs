import axios from "axios";

import { baseUrl } from "@/Utils/Config";
import qs from "query-string";
import { useState } from "react";
import Autentifkasi from "@/Utils/Autentifikasi";
import Loading_save from "@/Utils/Loading_save";
import { useRouter } from "next/router";
import Head from "next/head";

const Tambah_satuan = () => {
  const route = useRouter();
  const [namaSatuan, setNamaSatuan] = useState();

  const [loading, setSetLoading] = useState(false);


  const _submit = (e) => {
    e.preventDefault();
    setSetLoading(true);
    new Autentifkasi().createHeaderAdmin().then(bearer => {
      axios
        .post(
          baseUrl("admin/save_satuan"),

          qs.stringify({
            nama_satuan: namaSatuan,
          }),
          {
            headers: {
              "Authorization": bearer
            }
          }
        )
        .then((respon) => {
          setSetLoading(false);
          if (respon.data.status === "satuan_saved") {
            alert("Data satuan berhasil disimpan");
            route.back();
          }
        });
    })
  };
  return (
    <>
      <Head>
        <title>Tambah Satuan</title>
      </Head>
      <div className="container-fluid" id="container-wrapper">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <button
            onClick={() => {
              route.back();
            }}
            className="btn btn-danger"
          >
            <i className="fa fa-chevron-left" /> Kembali
          </button>
          <h1 className="h3 mb-0 text-gray-800">Tambah Satuan</h1>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="./">Dashboarda</a>
            </li>
            <li className="breadcrumb-item">Satuan</li>
            <li className="breadcrumb-item active" aria-current="page">
              Tambah Satuan
            </li>
          </ol>
        </div>
        <div className="col-lg-6" style={{ margin: "auto" }}>
          <div className="card">
            <div className="card-header">
              <h3>Tambah Satuan</h3>
            </div>
            <div className="card-body">
              <form onSubmit={_submit}>
                <div className="form-group">
                  <label>Nama Satuan</label>
                  <input
                    onChange={(e) => {
                      setNamaSatuan(e.target.value);
                    }}
                    type="text"
                    className="form-control"
                    aria-describedby="emailHelp"
                    placeholder="Masukkan nama satuan"
                  />
                  <small id="emailHelp" className="form-text text-muted">
                    Masukkan nama satuan
                  </small>
                </div>

                {loading ? <Loading_save text={"Menyimpan"} /> : <button type="submit" className="btn btn-primary">
                  Simpan Satuan
                </button>}
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tambah_satuan;

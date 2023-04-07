import axios from "axios";
import { useRef, useState } from "react";
import { baseUrl } from "@/Utils/Config";
import qs from "query-string";
import { token } from "@/Utils/Config";
import Loading_save from "@/Utils/Loading_save";
import Autentifkasi from "@/Utils/Autentifikasi";
const Edit_satuan = (props) => {

  const [namaSatuan, setNamaSatuan] = useState(props.nama_satuan);
  const [loading, setLoading] = useState(false);
  const _update = async (e) => {
    e.preventDefault();
    setLoading(true)
    new Autentifkasi().createHeaderAdmin().then(bearer => {
      axios
        .post(
          baseUrl("admin/update_satuan"),
          qs.stringify({
            id_satuan: props.id_satuan,
            nama_satuan: namaSatuan,
          }),
          {
            headers: {
              Authorization: bearer,
            },
          },
        )
        .then(async (respon) => {
          await setLoading(false);
          if (respon.data.status == "satuan_updated") {
            if (!loading)
              window.alert("Status berhasil di update");
            props._reset();
          }
        });
    })
  };
  const _submit = useRef(null);
  return (
    <>
      <tr
        style={{
          background: "#F4F4F475",
        }}
      >
        <td colSpan={2} style={{ fontWeight: "bold" }}>
          Edit Satuan
        </td>
        <td>
          <form onSubmit={_update}>
            <input
              required
              onChange={(e) => {
                setNamaSatuan(e.target.value);
              }}
              value={namaSatuan}
              placeholder="Masukkan nama satuan"
              type="text"
              className="form-control"
            />
            <button
              style={{ display: "none" }}
              type="submit"
              ref={_submit}
            ></button>
          </form>
        </td>
        <td style={{ textAlign: "right" }}>
          {loading ? <Loading_save text={"Update"} /> : <button
            onClick={() => {
              _submit.current.click();
            }}
            className="btn btn-success"
          >
            Update
          </button>}{" "}
          <button
            onClick={() => {
              props._batal();
            }}
            className="btn btn-danger"
          >
            Batal
          </button>
        </td>
      </tr>
    </>
  );
};

export default Edit_satuan;

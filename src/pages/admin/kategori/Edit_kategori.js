import { useState } from "react";
import Loading_save from "@/Utils/Loading_save";

const Edit_kategori = (props) => {
  const [nama_kategori, setNama_kategori] = useState(props.nama_kategori);
  const [loading, setLoading] = useState(false);

  return (
    <>
      <tr>

        <td colSpan={2}>Edit</td>

        <td>

          <input
            type="text"
            autoFocus={true}
            required
            onChange={(e) => {
              setNama_kategori(e.target.value);
              props._update_nama_kategori(e.target.value);
            }}
            value={nama_kategori}
            className="form-control"
          />
        </td>
        <td style={{ textAlign: "right" }}>
          {props.loading ? <Loading_save text={"update"} /> : <button

            type="submit" className="btn btn-success">
            Update
          </button>}
          {" "}
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

export default Edit_kategori;

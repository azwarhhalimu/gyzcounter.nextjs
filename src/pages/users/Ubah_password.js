import { baseUrl } from "@/Utils/Config";
import axios from "axios";
import { useState } from "react"
import qs from 'query-string';
import { SessionManager } from "@/Utils/SessionManager";
import { encryptAES } from "@/Utils/enkripsi";

export default function Ubah_password() {
    const [passwordLama, setPasswordLama] = useState("");
    const [passwordBaru, setPasswordBaru] = useState("");
    function _ubahPassword(e) {
        e.preventDefault();
        const data = {
            "username": new SessionManager().getUser["username"],
            "password_lama": passwordLama,
            "password_baru": passwordBaru
        }
        axios.post(baseUrl("user/ubah_password"),
            qs.stringify({
                "data": encryptAES(data)
            })
        ).then(respon => {
            alert(respon.data);
        })
    }
    return <>
        <div className="card">

            <div className="card-header">
                <div style={{ fontWeight: "bold" }}>Ubah Password</div>
            </div>
            <div className="card-body">
                <form onSubmit={_ubahPassword}>
                    <div className="form-group">
                        <label>Password Baru</label>
                        <input tyep='password'
                            required
                            onChange={(e) => {
                                setPasswordBaru(e.target.value);

                            }}
                            placeholder="Masukkan password baru anda"
                            className="form-control" />
                    </div>
                    <div className="form-group">
                        <label>Password Lama</label>
                        <input tyep='password'
                            required
                            onChange={() => {
                                setPasswordBaru(e.target.value);
                            }}
                            placeholder="Masukkan password lama anda"
                            className="form-control" />
                    </div>
                    <buttton type="submit" className="btn btn-danger">Update Password</buttton>
                </form>
            </div>
        </div>
    </>
}
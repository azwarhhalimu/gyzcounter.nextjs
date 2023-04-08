
import Aplikasi_logo from "./pengaturan/Aplikasi_logo";
import Ganti_username from "./pengaturan/Ganti_username";
import Ganti_password from "./pengaturan/Ganti_password";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Pengaturan() {

    useEffect(() => {

    }, [])
    const menu = [
        {
            "id": 0,
            "name": "Aplikasi Logo",
            "target": <Aplikasi_logo />

        },
        {
            "id": 1,
            "name": "Ganti Username",
            "target": <Ganti_username />

        },
        {
            "id": 2,
            "name": "Ganti Password",
            "target": <Ganti_password />

        },]
    const [aktif, setAktiv] = useState(0)
    return <>
        <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Pengaturan</h1>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item"><Link href="../">Dashboard</Link></li>
                    <li className="breadcrumb-item active" aria-current="page">Pengaturan</li>
                </ol>
            </div>
            <div className="row">
                <div className="col-lg-12">
                    <ul class="nav nav-tabs">
                        {menu.map((list, index) => (
                            <li key={index + "jfakl"} onClick={() => {
                                setAktiv(list["id"])
                            }} class="nav-item">
                                <a className={+(aktif == list["id"]) ? "nav-link active " : "nav-link"} aria-current="page" href="#">{list["name"]}</a>
                            </li>
                        ))}
                    </ul>
                    {menu[aktif]['target']}
                </div>
            </div>
        </div>

    </>
}
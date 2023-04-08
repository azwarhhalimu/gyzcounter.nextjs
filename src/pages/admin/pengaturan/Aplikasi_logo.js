import Height from "@/Utils/Height";
import Head from "next/head";

export default function Aplikasi_logo() {
    return <>
        <Head>
            <title>Ganti Logo</title>
        </Head>
        <Height height={30} />
        <div className="row">
            <div className="col-lg-5" style={{ margin: "auto" }}>
                <div className="card">
                    <div className="card-body">
                        <div style={{ fontWeight: "bold" }}>Aplikasi dan Logi</div>
                        <Height height={20} />
                        <table className="table">
                            <tbody>
                                <tr>
                                    <td>
                                        Logo Title
                                    </td>
                                    <td>img</td>
                                    <td style={{ textAlign: "right" }}><button className="btn btn-danger">Ganti</button></td>
                                </tr>
                            </tbody>

                        </table>
                    </div>
                </div>
            </div>
        </div>
    </>
}
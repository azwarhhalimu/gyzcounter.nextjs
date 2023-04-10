import axios from "axios";
import AppBar from "@/Widget/Mobile_komponen/AppBar";
import { baseUrl, urlEncode } from "@/Utils/Config";
import { useEffect, useState } from "react";
import Height from "@/Utils/Height";
import Nav_bottom from "@/Widget/Mobile_komponen/Nav_bottom";
import Loading_mobile from "@/Utils/Loading_mobile";
import { useRouter } from "next/router";

const Kategori_mobile = () => {
    const route = useRouter();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const _getKategori = () => {
        setLoading(true);
        axios.post(baseUrl('public/kategori'))
            .then(respon => {
                setLoading(false);
                setData(respon.data.data);
            })
    }
    useEffect(() => {
        _getKategori();
    }, [])
    return <>
        {loading && <Loading_mobile />}
        <AppBar title={"Data Kategori"} />
        <div>
            <Height height={70} />
            <table className="table" width={"100%"}>
                {data.map((list, index) => (
                    <tr key={index + "rf"} onClick={() => {
                        route.push("/kategori/mobile/" + list["id_kategori"] + "/" + urlEncode(list["nama_kategori"]) + ".html")
                    }}>
                        <td style={{ padding: "15px" }}>{list["nama_kategori"]} ({list["count"]})</td>
                        <td width={"10%"}><i className="fa fa-chevron-right" /></td>
                    </tr>
                ))}

            </table>
        </div>
        <Nav_bottom selected={2} />
    </>
}
export default Kategori_mobile;
import { baseUrl, urlEncode } from "@/Utils/Config";
import Image from "next/image";


const ListItem_list = ({ list }) => {

    return <>
        <table width={"100%"}>
            <thead>
                {list.map((data, index) => (
                    <>
                        <tr id="link" style={{ cursor: "pointer" }} onClick={() => {
                            //  navigasi("/produk/" + data["id_produk"] + "/" + urlEncode(data["nama_produk"]) + ".html");
                        }}>
                            <td>
                                <Image style={{ borderRadius: "5px" }} src={baseUrl("images/produk?w=50&s=" + data["foto"])} />
                            </td>
                            <td width={"10px"}>

                            </td>
                            <td>
                                <div style={{ fontWeight: "400", }}>{data["nama_produk"]}</div>
                                <div style={{ fontSize: "12px" }}>Rp. {data["harga"]}</div>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={3}>
                                <hr />
                            </td>
                        </tr>
                    </>

                ))}
            </thead>


        </table>
    </>
}
export default ListItem_list;
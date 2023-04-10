import { baseUrl, urlEncode } from "@/Utils/Config";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";


const ListItem_list = ({ list }) => {

    const route = useRouter();
    return (
        <div>
            <table width={"100%"}>
                <thead>
                    {list.map((data, index) => (
                        < >
                            <tr id="link" key={data["id_produk"]} style={{ cursor: "pointer" }} onClick={() => {
                                route.push("/produk/" + data["id_produk"] + "/" + urlEncode(data["nama_produk"]) + ".html");
                            }}>
                                <td>
                                    <img style={{ borderRadius: "5px" }} src={baseUrl("images/produk?w=50&s=" + data["foto"])} />
                                </td>
                                <td width={"10px"}>

                                </td>
                                <td>
                                    <span style={{ fontWeight: "400", }}>{data["nama_produk"]}</span>
                                    <span style={{ fontSize: "12px" }}>Rp. {data["harga"]}</span>
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
        </div>
    );

}
export default ListItem_list;
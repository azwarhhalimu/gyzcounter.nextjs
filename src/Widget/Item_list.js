import { baseUrl } from "@/Utils/Config";
const Item_list = ({ list, hapus }) => {

    return <>
        <table>
            {list.map((list_data, index) => (
                <>
                    <tr key={index + "df"}>
                        <td valign="top">
                            <img style={{ borderRadius: "5px" }} src={baseUrl("images/produk?s=" + list_data["foto"] + "&w=40")} />
                        </td>
                        <td width={10}></td>
                        <td valign="top">
                            <div style={{ fontWeight: "bold" }}>{list_data["nama_produk"]}
                                <button
                                    onClick={() => {
                                        hapus(list_data["id_add_produk"])
                                    }}
                                    className="btn btn-sm float-right"><i className="fa fa-trash" /> Delete</button>
                            </div>
                            <div style={{ fontSize: "12px" }}>Rp. {list_data["harga"]}</div>
                        </td>
                    </tr>
                    <tr>
                        <td height={"20px"}></td>
                    </tr>
                </>

            ))}

        </table>
    </>
}
export default Item_list;
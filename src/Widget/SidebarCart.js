import { baseUrl } from "@/Utils/Config";
import Link from "next/link";

const SidebarCart = ({ cart, totoal }) => {
    return (<>
        <div>
            {cart.length == 0 &&
                <div style={{ textAlign: "center" }}>
                    <i className="fa fa-info" />
                    <div>Data cart masih kosong</div>
                    <div style={{ fontSize: "10px", opacity: "0.7" }}>Silahkan tambahkan barang belajaan terlebih dahulu</div>
                </div>}
            <table border={0} width={"100%"} style={{ fontSize: "12px" }}>
                {cart.map((list, index) => (
                    index < 5 && <>
                        <tr>
                            <td>
                                <img src={baseUrl("images/produk?w=40&s=" + list["foto"])} />

                            </td>
                            <td>
                                <div> {list["nama_produk"]}</div>
                                <div style={{ opacity: "0.9" }}>
                                    <div>Rp. {list["harga_satuan"]} x {list["jumlah"]}</div>
                                    <div style={{ fontWeight: "bold", textAlign: "right" }}>Rp. {list["total"]}</div>
                                </div>


                            </td>
                            <td></td>

                        </tr>
                        <tr>
                            <td style={{ height: "5px" }} colSpan={2}>
                                <hr />
                            </td>
                        </tr>
                    </>


                ))}

            </table>

            <div style={{ fontWeight: "bold", fontSize: "13px", textAlign: "right" }}>
                {cart.length >= 5 && <Link href="/shopping-cart.html">Lihat Lebih Banyak</Link>}
            </div>
            <hr />
            <div style={{ fontWeight: "bold", fontSize: "13px", textAlign: "right" }}>
                {"Total Bayar :Rp." + totoal}
            </div>
        </div>
    </>);
}

export default SidebarCart;
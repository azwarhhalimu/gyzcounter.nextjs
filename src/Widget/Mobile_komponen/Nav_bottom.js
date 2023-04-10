
import { useRouter } from "next/router";
import Height from "@/Utils/Height";

export default function Nav_bottom({ selected }) {

    const router = useRouter();

    const data = [
        {
            "id": 0,
            "label": "Beranda",
            "link": "/",
            "icon": <svg width="22" height="21" viewBox="0 0 22 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.25 11L10.2045 2.04549C10.6438 1.60615 11.3562 1.60615 11.7955 2.04549L20.75 11M3.5 8.75V18.875C3.5 19.4963 4.00368 20 4.625 20H8.75V15.125C8.75 14.5037 9.25368 14 9.875 14H12.125C12.7463 14 13.25 14.5037 13.25 15.125V20H17.375C17.9963 20 18.5 19.4963 18.5 18.875V8.75M7.25 20H15.5" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        },
        {
            "id": 1,
            "label": "Semua Produk",
            "link": "/semua-produk.html",
            "icon": <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.25 6.375C20.25 8.65317 16.5563 10.5 12 10.5C7.44365 10.5 3.75 8.65317 3.75 6.375M20.25 6.375C20.25 4.09683 16.5563 2.25 12 2.25C7.44365 2.25 3.75 4.09683 3.75 6.375M20.25 6.375V17.625C20.25 19.9032 16.5563 21.75 12 21.75C7.44365 21.75 3.75 19.9032 3.75 17.625V6.375M20.25 6.375V10.125M3.75 6.375V10.125M20.25 10.125V13.875C20.25 16.1532 16.5563 18 12 18C7.44365 18 3.75 16.1532 3.75 13.875V10.125M20.25 10.125C20.25 12.4032 16.5563 14.25 12 14.25C7.44365 14.25 3.75 12.4032 3.75 10.125" stroke="#0F172A" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>

        },
        {
            "id": 2,

            "label": "Kategori",
            "link": "/kategori-mobile.html",
            "icon": <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-category" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M4 4h6v6h-6z"></path>
                <path d="M14 4h6v6h-6z"></path>
                <path d="M4 14h6v6h-6z"></path>
                <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
            </svg>

        },
        {
            "id": 3,
            "label": "Keranjang",
            "link": "/shopping-cart.html",
            "icon": <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-shopping-cart" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                <path d="M17 17h-11v-14h-2"></path>
                <path d="M6 5l14 1l-1 7h-13"></path>
            </svg>
        }
    ];
    return <>
        <div style={{
            position: "fixed", zIndex: "999999", bottom: "0px", left: "0px", width: "100%", background: "white",
            borderTop: "1px solid #DFDFDF"
        }}>
            <Height height={10} />
            <table style={{ textAlign: "center", fontSize: "11px" }} width={"100%"}>
                <tr>
                    {data.map((list, index) => (
                        <td key={index + "dka"}
                            onClick={() => {
                                router.push(list["link"]);
                            }}
                            {...(index == selected && { style: { fontWeight: "500", color: "red" } })} width={(100 / data.length) + "%"}>
                            <div>{list["icon"]}</div>
                            <div {...(index == selected && { style: { borderBottom: "2px solid red", color: "#F97E00" } })}>{list["label"]}</div>
                        </td>
                    ))}

                </tr>
            </table>
        </div>
    </>
}
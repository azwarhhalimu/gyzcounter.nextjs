"use client"

import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";



// import required modules
import { Navigation } from "swiper";


import { baseUrl, urlEncode } from "@/Utils/Config";
import { useEffect } from "react";
import Link from "next/link";
const ListItem_slide = ({ list }) => {
    useEffect(() => {
        console.log(list);
    }, []);
    return (
        <>
            <Swiper navigation={true} modules={[Navigation]} className="mySwiper">
                {list.map((list_data, index) => (
                    <SwiperSlide key={index}>

                        <Link href={"/produk/" + list_data["id_produk"] + "/" + urlEncode(list_data["nama_produk"]) + ".html"}>


                            <div><img style={{ width: "100%" }} src={baseUrl("images/produk?s=" + list_data["foto"] + "&w=200")} /></div>
                            <div>
                                <div style={{ fontWeight: "500" }}>{list_data.nama_produk}</div>
                                <div style={{ fontSize: "12px" }}>Rp. {list_data.harga}</div>
                            </div>
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </>

    );
}
export default ListItem_slide;
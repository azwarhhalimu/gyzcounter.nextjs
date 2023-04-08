import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Keyboard, Pagination, Navigation } from "swiper"
import { baseUrl } from "@/Utils/Config";
import Loading_save from "@/Utils/Loading_save";
const Item_slide = ({ list, hapus, getHapus }) => {
    return <>
        <Swiper
            slidesPerView={1}
            spaceBetween={30}
            keyboard={{
                enabled: true,
            }}

            navigation={true}
            modules={[Keyboard, Navigation]}
            className="mySwiper"
        >
            {list.map((list, index) => (
                <SwiperSlide key={index + "kdf"} style={{ width: "100%", background: "#DFDFDF" }}>
                    <div><img style={{ width: "100%" }} src={baseUrl("images/produk?s=" + list["foto"] + "&w=350")} /></div>
                    <div style={{ padding: "10px" }}>
                        <div style={{ fontWeight: "bold" }}>{list["nama_produk"]}</div>
                        <div>Rp. {list["harga"]}
                            {getHapus == list["id_add_produk"] ? <Loading_save text={"Deleting"} /> : <button
                                onClick={() => {
                                    hapus(list["id_add_produk"])
                                }}
                                className="btn btn-sm float-right" style={{ color: "red" }}><i className="fa fa-trash" style={{ color: "red" }} /> Delete</button>}
                        </div>
                    </div>

                </SwiperSlide>
            ))}
        </Swiper>
    </>
}
export default Item_slide;
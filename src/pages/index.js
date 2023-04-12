import Autentifkasi from "@/Utils/Autentifikasi";
import { baseUrl, urlEncode } from "@/Utils/Config";
import Height from "@/Utils/Height";
import axios from "axios";
import { useEffect, useState } from "react";
import { Url_encoded } from "@/Utils/Url_encoded";
import { SessionManager } from "@/Utils/SessionManager";
import Link from "next/link";
// Import Swiper styles
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FreeMode, Navigation, Pagination } from "swiper";
import ListItem_list from "@/Componen/ListItem/ListItem_list";
import ListItem_slide from "@/Componen/ListItem/ListItem_slide";
import { useRouter } from "next/router";
import Head from "next/head";
import { useWindowDimensions } from "@/Utils/WindowDimentions";
import qs from "query-string";
import { encryptAES, dencryptAES } from "@/Utils/enkripsi";
import { isMobile } from "react-device-detect";
import AppBar from "@/Widget/Mobile_komponen/AppBar";
import Loading_mobile from "@/Utils/Loading_mobile";
import Home_topBar from "@/Widget/Mobile_komponen/Home_topBar";
import Nav_bottom from "@/Widget/Mobile_komponen/Nav_bottom";
import SidebarCart from "@/Widget/SidebarCart";

const Home = () => {
  const { width, height } = useWindowDimensions();

  const route = useRouter();
  useEffect(() => {

    _getBeranda();
    //  _getCart();
    _getSlideShow();
    _getCart();
  }, []);
  useEffect(() => {

    _getCart();
  }, [route])
  //  const [setMenu] = useOutletContext();
  const [homeBuilder, setHomeBuilder] = useState([]);
  const [homeBuilderSidebar, setHomeBuilderSidebar] = useState([]);
  const [kategori, setKategori] = useState([]);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState();
  const [slideShow, setSlideShow] = useState([]);
  const [loading, setLoading] = useState(false);
  const _getBeranda = () => {
    setLoading(true);
    axios.post(baseUrl("public/beranda"))
      .then((respon) => {
        setLoading(false);
        setHomeBuilder(respon.data.home_builder);
        setHomeBuilderSidebar(respon.data.home_builder_sidebar);
        setKategori(respon.data.kategori);
      });
  };

  const _getSlideShow = () => {
    axios.post(baseUrl("public/slide_show"))
      .then(respon => {
        setSlideShow(respon.data.data);
      })
  }

  const _getCart = () => {
    new Autentifkasi().createHeader().then((bearer) => {
      axios.post(baseUrl("user/get_shopping_cart"), qs.stringify(
        {
          "data": encryptAES(new SessionManager().getUser()["id_user"])
        }
      ), {
        headers: {
          "Authorization": bearer
        }
      }).then((respon) => {
        setCart(dencryptAES(respon.data.data));
        setTotal(respon.data.total);
      })
    });
  }
  return (<>
    <Height height={120} />
    {loading && <Loading_mobile />}
    <Head>
      <title>Beranda</title>
    </Head>
    {isMobile && <Home_topBar />}
    <div>

      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Swiper navigation={true} modules={[Navigation]} className="mySwiperx">
              {slideShow.map((list, index) => (
                <SwiperSlide key={index}>
                  <img style={{ borderRadius: "10px", width: "100%" }} src={baseUrl("images/slide_show?w=1200&s=" + list['id_slide_show'])} />
                </SwiperSlide>
              ))}


            </Swiper>
            <Height height={20} />
          </div>
          <div className="col-lg-3">
            {homeBuilderSidebar.map((list, index) => (
              <div key={index + 5000} style={{ border: "1px dashed #F33E38", borderRadius: "4px", padding: "10px", marginBottom: "15px" }}>
                <div style={{ fontSize: "15px" }}>{list.title} <span className="badge badge-success pull-right">{list.tipe}</span></div>
                <div style={{ fontSize: "12px", opacity: "0.5" }}>{list.sub_title}</div>
                <hr />

                {list["tipe"] === "BANNER" &&
                  <>
                    <img alt={""} style={{ width: "100%" }} src={baseUrl("images/banner?s=" + list["id_home_builder_sidebar"] + "&w=300")} />
                  </>}
                {list['tipe'] === "LIST" ? <>
                  <ListItem_list list={list.produk} />
                </> : <ListItem_slide list={list.produk} />}
              </div>
            ))}
          </div>
          <div className="col-lg-6">
            {homeBuilder.map((list, index) => (
              <div
                key={index}
                style={{
                  marginBottom: "20px"
                }}>
                <div style={{ fontWeight: "bold" }}>{list.title}</div>
                <div style={{ opacity: "0.6" }}>{list.sub_title}</div>
                <Swiper
                  slidesPerView={"auto"}
                  spaceBetween={30}
                  freeMode={true}
                  pagination={{
                    clickable: true,
                  }}
                  navigation={true}
                  modules={[FreeMode, Pagination, Navigation]}
                  className={"mySwiper" + index}
                >
                  {
                    list.produk.map((list_produk, index) => (
                      <SwiperSlide key={index + 4} id="link"
                        onClick={() => {
                          route.push("/produk/" + list_produk["id_produk"] + "/" + urlEncode(list_produk["nama_produk"]) + ".html")
                        }}
                        style={{ width: "25%", cursor: "pointer" }}>
                        <div>
                          <img width={250} alt={"info"} style={{ width: "100%", borderRadius: "10px" }} src={baseUrl("images/produk?s=" + list_produk["foto"] + "&w=250")} />
                        </div>
                        <div style={{
                          padding: "5px"
                        }}>
                          <div style={{ fontWeight: "500", fontSize: "14px" }}>{list_produk["nama_produk"]}</div>
                          <div style={{ fontSize: "13px" }}>Rp. {list_produk["harga"]}</div>
                          <div style={{ fontSize: "13px" }}>{list_produk["kategori"]}</div>
                        </div>
                      </SwiperSlide>
                    ))
                  }

                </Swiper>
              </div>
            ))

            }

          </div>
          <div className="col-lg-3">
            <div>
              <div className="c" style={{ fontWeight: "bold", }}>Keranjang Belanja</div>
              <div className="d" style={{ border: "1px dashed #1783FF", padding: "10px" }}>
                {new SessionManager().getUser() == null ? <div style={{ textAlign: "center" }}>
                  <i className="fa fa-info" />
                  <div style={{ fontSize: "12px" }}>Anda harus login terlebih dahulu untuk melihat data keranjang belanja</div>
                  <Height height={10} />
                  <Link href="/login.html">Login</Link>
                </div> : <>
                  {<SidebarCart cart={cart} totoal={total} />}
                </>}
              </div>
            </div>
            <Height height={20} />
            <div>
              <div style={{ fontWeight: "400", }}>Kategori</div>
              <ul className="list-group" style={{ borderRadius: "0px" }}>

                {kategori.map((list, index) => (
                  <li key={index + 100} style={{ padding: "5px 10px 5px 10px" }} className="list-group-item d-flex justify-content-between align-items-center">
                    <Link href={"/kategori/" + list["id_kategori"] + "/" + Url_encoded((list["nama_kategori"]).toLowerCase()) + ".html"} style={{ fontSize: "15px", color: "#333" }}>
                      {list.nama_kategori}
                    </Link>
                    <span className="badge badge-primary badge-pill">{list["count"]}</span>
                  </li>
                ))}

              </ul>
            </div>
          </div>
        </div>
      </div >
    </div>
    {isMobile && <Nav_bottom selected={0} />}
  </>);
}

export default Home;
import { useEffect, useState } from "react";
import Autentifkasi from "@/Utils/Autentifikasi";
import axios from "axios";
import { baseUrl } from "@/Utils/Config";
import { useRouter } from "next/router";
import Link from "next/link";
import Loading from "@/Utils/Loading";

const Dashboard = () => {
    const route = useRouter();
    const [data, setData] = useState({});
    const [listTransaksi, setListTransaksi] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        _getData();
    }, [])


    const _getData = () => {
        setLoading(true);
        new Autentifkasi().createHeaderAdmin().then(bearer => {
            axios.post(baseUrl("admin/get_dashboard"),
                {},
                {
                    headers: {
                        "Authorization": bearer
                    }
                }
            )
                .then(respon => {
                    setLoading(false);
                    setData(respon.data);
                    setListTransaksi(respon.data.data);
                })
        })
    }
    return (<>
        {loading && <Loading />}
        <div className="container-fluid" id="container-wrapper">
            <div className="d-sm-flex align-items-center justify-content-between mb-4">
                <h1 className="h3 mb-0 text-gray-800">Dashboard</h1>
                <ol className="breadcrumb">
                    <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                </ol>
            </div>
            <div className="contanier">
                <div className="row">
                    {/* Earnings (Monthly) Card Example */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-uppercase mb-1">Penjualan Hari Ini</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">Rp. {data["total_penjualan"]}</div>

                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-calendar fa-2x text-primary" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Earnings (Annual) Card Example */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-uppercase mb-1">Total Produk</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{data["total_produk"]}</div>

                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-shopping-cart fa-2x text-success" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* New User Card Example */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-uppercase mb-1">Jumlah Pengguna</div>
                                        <div className="h5 mb-0 mr-3 font-weight-bold text-gray-800">{data["pengguna"]}</div>

                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-users fa-2x text-info" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Pending Requests Card Example */}
                    <div className="col-xl-3 col-md-6 mb-4">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="row no-gutters align-items-center">
                                    <div className="col mr-2">
                                        <div className="text-xs font-weight-bold text-uppercase mb-1">Total Transaksi</div>
                                        <div className="h5 mb-0 font-weight-bold text-gray-800">{data["transaksi_hari_ini"]}</div>
                                        <div className="mt-2 mb-0 text-muted text-xs">
                                            <span className="text-danger mr-2"><i className="fas fa-arrow-down" /> 1.10%</span>
                                            <span>Since yesterday</span>
                                        </div>
                                    </div>
                                    <div className="col-auto">
                                        <i className="fas fa-comments fa-2x text-warning" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/* Invoice Example */}
                    <div className="col-xl-12 col-lg-12 mb-4">
                        <div className="card">
                            <div className="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 className="m-0 font-weight-bold text-primary">Data Transaksi Hari Ini</h6>
                                <Link className="m-0 float-right btn btn-danger btn-sm" href={"../transaksi.html"}>View More <i className="fas fa-chevron-right" /></Link>
                            </div>
                            <div className="table-responsive">
                                <table className="table align-items-center table-flush">
                                    <thead className="thead-light">
                                        <tr>
                                            <th>Order ID</th>
                                            <th>Nama</th>
                                            <th>Total</th>
                                            <th>Status</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listTransaksi.map((list, index) => (
                                            <tr key={index + 302}>
                                                <td><a href="#">{list["id_transaksi"]}</a></td>
                                                <td>{list["nama"]}</td>
                                                <td>Rp. {list["total"]}</td>
                                                <td><span className="badge badge-success">{list["status"]}</span></td>
                                                <td><Link href={"../transaksi/" + list["id_transaksi"] + ".html"} className="btn btn-sm btn-primary">Detail</Link></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer" />
                        </div>
                    </div>
                </div>
            </div>

        </div>

    </>);
}

export default Dashboard;
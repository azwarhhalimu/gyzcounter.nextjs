import UserLayout from '@/Componen/UserLayout'
import "../styles/UserAssetCss/all_import.css";
import "../styles/globals.css";
import React, { useEffect, useState } from 'react';
import EmptyLayout from '@/Componen/EmptyLayout';
import Admin_layout from '@/Componen/AdminLayout';
import { baseUrl } from '@/Utils/Config';

import axios from 'axios';
import qs from "query-string";
import "@/styles/AdminAssetCss/all_css.css";
import NextNProgress from 'nextjs-progressbar';
import Head from 'next/head';
import "@/styles/grid.css";




export default function App({ Component, pageProps }) {



  const [cpath, setCpath] = useState([]);
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState({});



  const pathx = typeof window !== "undefined" && window.location.pathname;
  useEffect(() => {
    const path = typeof window !== "undefined" && window.location.pathname;
    setCpath(path.split("/"));
    const c = (path.split("/"));


  }, [pathx]);



  switch (cpath[1]) {
    case "login.html":

      return <EmptyLayout>
        <NextNProgress color='#7B1AFF' height={5} />
        <Component {...pageProps} />
      </EmptyLayout>
    case "daftar.html":

      return <EmptyLayout>
        <NextNProgress color='#7B1AFF' height={5} />
        <Component {...pageProps} />
      </EmptyLayout>

    case "login-admin.html":
      return <EmptyLayout>
        <NextNProgress color='#7B1AFF' height={5} />
        <Component {...pageProps} />
      </EmptyLayout>
    case "admin":
      return <Admin_layout>
        <NextNProgress color='#F518FF' height={5} />
        <Component {...pageProps} />
      </Admin_layout>
    default:
      return <> <UserLayout>

        <NextNProgress color='#7B1AFF' height={5} />

        <Component {...pageProps} />
      </UserLayout> </>
  }
}

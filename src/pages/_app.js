import UserLayout from '@/Componen/UserLayout'
import "../styles/UserAssetCss/all_import.css";
import "../styles/globals.css";
import { useEffect, useState } from 'react';
import EmptyLayout from '@/Componen/EmptyLayout';
import Admin_layout from '@/Componen/AdminLayout';

import "@/styles/AdminAssetCss/all_css.css";
export default function App({ Component, pageProps }) {

  const [cpath, setCpath] = useState([]);
  const pathx = typeof window !== "undefined" && window.location.pathname;
  useEffect(() => {

    const path = typeof window !== "undefined" && window.location.pathname;

    setCpath(path.split("/"));


  }, [pathx]);


  switch (cpath[1]) {
    case "login.html":

      return <EmptyLayout>
        <Component {...pageProps} />
      </EmptyLayout>

    case "login-admin.html":
      return <EmptyLayout>
        <Component {...pageProps} />
      </EmptyLayout>
    case "admin":
      return <Admin_layout>
        <Component {...pageProps} />
      </Admin_layout>
    default:
      return <UserLayout>
        <Component {...pageProps} />
      </UserLayout>

  }
}

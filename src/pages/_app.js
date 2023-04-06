import UserLayout from '@/Componen/UserLayout'
import "../styles/UserAssetCss/all_import.css";
export default function App({ Component, pageProps }) {
  return <>
    <UserLayout>
      <Component {...pageProps} />
    </UserLayout>
  </>
}

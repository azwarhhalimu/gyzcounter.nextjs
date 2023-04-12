import Height from '@/Utils/Height'
import Link from 'next/link'
import Img404 from "@/Assets/404.png"
import Image from 'next/image'
export default function FourOhFour() {
    return <>
        <Height height={150} />
        <div className='c' style={{ textAlign: "center" }}>
            <Image width={300} height={300} src={Img404} />
            <Height height={40} />
            <h2 style={{ fontWeight: "bold" }}>404 - Page Not Found</h2>
            <Height height={40} />
            <Link href="/" className='btn btn-primary'>

                Go back home

            </Link>
        </div>

    </>
}
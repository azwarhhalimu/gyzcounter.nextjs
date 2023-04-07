import Loading_img from "@/Assets/loading.gif"
import Image from "next/image";
const Loading_save = ({ text }) => {
    return <>
        <span> <Image height={40} width={"50"} style={{ width: "50px" }} src={Loading_img} /> {text}...</span>
    </>
}
export default Loading_save;
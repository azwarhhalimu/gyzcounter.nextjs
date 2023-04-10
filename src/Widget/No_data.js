
import No_data_img from "@/Assets/no_data.png"
import Image from "next/image";
const No_data = ({ title, text }) => {
    return (<>
        <center>
            <Image alt="No data" src={No_data_img} width={200} height={200} />
            <div style={{ fontWeight: "bold", fontSize: "20px" }}>{title}</div>
            <div>{text}</div>
        </center>
    </>);
}

export default No_data;
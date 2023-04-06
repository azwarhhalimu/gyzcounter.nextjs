import Image from "next/image";
import Loading2 from "../Assets/load.svg";

export default function Loading_mobile() {
    return <>
        <div style={{ width: "100%", position: "fixed", top: "40%", zIndex: 999999 }}>
            <div style={{
                border: "1px solid #63B6F2",
                background: "#FFFFFFEF", padding: "10px",
                margin: "auto",
                textAlign: "center", width: "120px",
                borderRadius: "20px"
            }}>
                <Image style={{ width: "70px", }} src={Loading2} />
                <div style={{ fontSize: "12px", fontWeight: "500" }}>Laoding...</div>
            </div>
        </div>
    </>
}

import Loading_asste from "@/Assets/loading.gif";
import Image from "next/image";
import { isMobile } from "react-device-detect";
const Loading = () => {
  return (
    <div style={{
      background: "#34343496", border: "1px solid #C90B0BBE", padding: "10px",
      color: "#fff", width: "230px", borderRadius: "5px",
      position: "fixed", top: "40%", left: isMobile ? "28%" : "50%", zIndex: "1090"
    }}>

      <Image width={60} height={60} src={Loading_asste} />




      <span style={{ opacity: "1", fontWeight: "BOLD" }}>Sedang memuat....</span>

    </div>
  );
};

export default Loading;

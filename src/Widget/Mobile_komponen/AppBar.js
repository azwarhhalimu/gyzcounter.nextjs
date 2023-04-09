import { useRouter } from "next/router";

export default function AppBar({ title, leadingButton = false, url }) {
    const router = useRouter();
    return <>
        <div style={{
            position: "fixed",
            width: "100%",
            top: "0px",
            left: "0px",
            zIndex: "9999",
            background: "#FFF",
            padding: "15Px",
            borderBottom: "1px solid #DFDFDF"
        }}>
            <table>
                <tbody>
                    <tr>
                        {leadingButton && <>
                            <td>
                                <button
                                    onClick={() => {
                                        if (url == "back") {
                                            router.back();
                                        }
                                        else {
                                            router.push("/");
                                        }

                                    }}
                                    className="btn"><i className="fa fa-chevron-left" /></button>
                            </td>
                            <td width={10}></td>
                        </>}
                        <td style={{ fontWeight: "500" }}>{title}</td>
                    </tr>
                </tbody>

            </table>
        </div>

    </>
}
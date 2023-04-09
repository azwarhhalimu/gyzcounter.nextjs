export default function Home_topBar() {
    return <>
        <div style={{
            position: "fixed",
            top: "0px",
            left: "0px",
            zIndex: "99999",
            width: "100%",
            borderBottom: "1px solid #DFDFDF",
            marginBottom: "-70px",
            fontSize: "13px", background: "#FFF", padding: "15px",


        }}>
            <table>
                <tbody>
                    <tr>
                        <td valign="center" style={{ fontWeight: "bold" }}>Beranda</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
}
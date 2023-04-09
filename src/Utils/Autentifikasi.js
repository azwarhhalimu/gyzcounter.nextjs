import axios from "axios";
import { baseUrl } from "./Config";
import { dencryptAES, encryptAES } from "./enkripsi"
import { SessionManager } from "./SessionManager";

class Autentifkasi {
    async getTime() {
        var time = "";
        await axios.post(baseUrl("auth/gtz"))
            .then((respon) => {
                time = dencryptAES(respon.data.data);
                //  console.log("");
            })
        return time;
    }

    async createHeader() {
        var loginData = new SessionManager();
        var hasil = "";
        await this.getTime().then((value) => {
            hasil = value;
        });

        try {
            loginData = loginData.getUser();
            if (loginData["id_user"] == null) {
                alert("Login dahulu");
            }
            else {
                const bearer = loginData["id_user"] + "." + loginData["token"] + "." + hasil;
                return "Bearer " + encryptAES(bearer);
            }
        }
        catch (err) {
            console.log("terjadi masala");
        }


    }
    async adminHeader() {
        var hasil = "";
        await this.getTime().then((value) => {
            hasil = value;
        });
        const c = "Bearer gyzcounter.azwarganteng." + hasil;
        const d = encryptAES(c);
        return d;
    }
    async createHeaderAdmin() {
        var dataLogin = await window.sessionStorage.getItem("data_login_admin");
        var hasil = "";

        await this.getTime().then((value) => {
            hasil = value;
        });
        // console.log(hasil);
        //    /const bearer = loginData["id_user"] + "." + loginData["token"] + "." + hasil;
        // /return "Bearer fdf" + encryptAES(bearer);
        dataLogin = (dencryptAES(dataLogin));
        var bearer = dataLogin["id_admin"] + "." + dataLogin["token"] + "." + hasil
        bearer = "Bearer " + encryptAES((bearer).toString());

        return bearer;
    }

    async getAdmin_info() {
        var dataLogin = await window.sessionStorage.getItem("data_login_admin");
        dataLogin = await dencryptAES(dataLogin);

        return dataLogin;
    }
}

export default Autentifkasi;
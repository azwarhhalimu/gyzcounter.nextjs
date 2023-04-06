import axios from "axios";
import { baseUrl } from "./Config";
import { dencryptAES } from "./Komponen/enkripsi";

export class GetTimeZone {
    async createTimeZone() {
        await axios.post(baseUrl("auth/gtz")).then((respon) => {
            console.log(dencryptAES(respon.data.data));
            return dencryptAES(respon.data.data)
        })
    }
}
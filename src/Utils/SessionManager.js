
import { dencryptAES } from "./enkripsi";

class SessionManager {

    getUser() {

        if (typeof window !== 'undefined') {
            if (window.sessionStorage.getItem("data_login") == null) {

                return null;
            }

            return JSON.parse(dencryptAES(window.sessionStorage.getItem("data_login")));
        }
    }
}
export { SessionManager }
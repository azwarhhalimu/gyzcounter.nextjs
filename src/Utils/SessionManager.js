import { Router, useRouter } from "next/router";

class SessionManager {

    getUser() {
        const route = useRouter();
        if (typeof window !== 'undefined') {
            if (window.sessionStorage.getItem("data_login") == null) {

                return null;
            }

            return JSON.parse(dencr(window.sessionStorage.getItem("data_login")));
        }
    }
}
export { SessionManager }
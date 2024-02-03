import axios from "axios";
export const axiosRequest = (type, url,params = null, data = null) => {
    
    let token = ""

    const cookies = document.cookie.split(';');

    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');

        if (cookieName === "jwt") {
            token = cookieValue
        }
        if (type == "POST") {
        
            return axios.post(url, data, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }

            })

        }
        else if (type == "GET") {
            return axios.get(url, params, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                     'Content-Type': 'application/json'
                }
            })
        }
    }
}
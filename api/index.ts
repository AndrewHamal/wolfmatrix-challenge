import axios from "axios";

export default function fetcher(url: string) {
    return axios.get(url, {
        headers: {
            Accept: 'application/json',
        }
    });
}
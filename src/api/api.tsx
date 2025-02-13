import axios, {AxiosResponse} from 'axios';

interface Fact {
    id: string;
    text: string
    source: string;
    source_url: string;
    language: string;
    permalink: string;
}

export const getFact = (): Promise<AxiosResponse<Fact>> => {
    return axios.get("https://uselessfacts.jsph.pl/api/v2/facts/random")
}

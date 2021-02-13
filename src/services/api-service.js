export default class ApiService {

    _apiBase = 'https://baconipsum.com/api';

    /**
     * Get resource.
     * @param url
     * @returns {Promise<any>}
     */
    getResource = async (url) => {
        let response =  await fetch(`${this._apiBase}${url}`);
            if (!response.ok) {
                throw new Error(`Could not fetch ${url}` +
                    `, received ${response.status}`)
            }
        return await response.json()
    };

    /**
     * Get text from resourse with number_sentences.
     * @param number_sentences
     * @returns {Promise<any>}
     */
    getText = async (number_sentences = 5) => {
        return await this.getResource(`/?type=all-meat&sentences=${number_sentences}`)
    };

}

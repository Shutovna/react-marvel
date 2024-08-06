const CryptoJS = require('crypto-js');

class MarvelService {
    _apiBase = "https://gateway.marvel.com:443/v1/public"
    _baseOffset = 210;
    getResource = async (url) => {
        console.log("getResource " + url);
        let res = await fetch(url);

        if (!res.ok) {
            throw new Error(`Could not fetch ${url}, status: ${res.status}`);
        }

        return await res.json();
    }

    getAllCharacters = async (offset = this._baseOffset) => {
        const limit = 9;
        let url = `${this._apiBase}/characters?limit=${limit}&offset=${offset}` +
            `&${this.getAuthQueryString()}`;

        let res = await this.getResource(url);
        return res.data.results.map(this._transformCharacter);
    }

    getCharacter = async (id) => {
        let url = `${this._apiBase}/characters/${id}?` +
            `&${this.getAuthQueryString()}`;
        let res = await this.getResource(url);
        return this._transformCharacter(res.data.results[0]);
    }

    _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            description: char.description,
            thumbnail: char.thumbnail.path + "."
                + char.thumbnail.extension,
            homepage: char.urls[0].url,
            wiki: char.urls[1].url,
            comics: char.comics.items
        }
    }

    getAuthQueryString = () => {
        // Импортируйте библиотеку crypto-js

        // Ваши ключи и временная метка
        const publicKey = '1915052ee6d413cf40c99aa4a849935d';
        const privateKey = '356f97f8aa41b707f4e31752e94cf356496f3d88';
        const timestamp = Date.now().toString(); // или '1' для тестов

        // Создайте строку для хэширования
        const hashString = timestamp + privateKey + publicKey;

        // Сгенерируйте MD5 хэш
        const hash = CryptoJS.MD5(hashString).toString();

        // Вывод хэша и других параметров
        return `ts=${timestamp}&apikey=${publicKey}&hash=${hash}`;
    }

}

export default MarvelService;
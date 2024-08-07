import {useHttp} from "../hooks/http.hooks";

const CryptoJS = require('crypto-js');


const useMarvelService = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = "https://gateway.marvel.com:443/v1/public"
    const _baseOffset = 210;


    const getAllCharacters = async (offset = _baseOffset) => {
        const limit = 9;
        let url = `${_apiBase}/characters?limit=${limit}&offset=${offset}` +
            `&${getAuthQueryString()}`;

        let res = await request(url);
        return res.data.results.map(_transformCharacter);
    }

    const getCharacter = async (id) => {
        let url = `${_apiBase}/characters/${id}?` +
            `&${getAuthQueryString()}`;
        let res = await request(url);
        return _transformCharacter(res.data.results[0]);
    }

    const getAllComics = async (offset = _baseOffset) => {
        const limit = 9;
        let url = `${_apiBase}/comics?limit=${limit}&offset=${offset}` +
            `&${getAuthQueryString()}`;

        let res = await request(url);
        return res.data.results.map(_transformComic);
    }


    const _transformCharacter = (char) => {
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

    const _transformComic = (comic) => {
        return {
            id: comic.id,
            title: comic.title,
            description: comic.description,
            thumbnail: comic.thumbnail.path + "."
                + comic.thumbnail.extension,
            price: comic.prices[0].price,
        }
    }

    const getAuthQueryString = () => {
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

    return {loading, error, getAllCharacters, getCharacter, getAllComics, clearError};

}

export default useMarvelService;
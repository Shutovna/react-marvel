import {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import './singleComicPage.scss';
import xMen from '../resources/img/x-men.png';
import Spinner from "../components/spinner/Spinner";
import ErrorMessage from "../components/errorMessage/ErrorMessage";
import useMarvelService from "../services/MarvelService";

const SingleComicPage = (props) => {
    const {comicId} = useParams();
    const [comic, setSelected] = useState(null);

    const {loading, error, getComic, clearError} = useMarvelService();

    useEffect(() => {
        updateComic();
    }, [comicId]);


    const updateComic = () => {
        clearError();
        if (!comicId) {
            return;
        }

        getComic(comicId)
            .then(onComicLoaded)
    }

    const onComicLoaded = (comic) => {
        setSelected(comic)
    }

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !comic) ? <View comic={comic}/> : null;

    return (
        <>
            {errorMessage}
            {spinner}
            {content}
        </>
    )
}

const View = ({comic}) => {
    const {title, description, thumbnail, price, pageCount, language} = comic;
    console.log(comic)

    return (
        <div className="single-comic">
            <img src={thumbnail} alt={title} className="single-comic__img"/>
            <div className="single-comic__info">
                <h2 className="single-comic__name">{title}</h2>
                <p className="single-comic__descr">{description}</p>
                <p className="single-comic__descr">{pageCount}</p>
                <p className="single-comic__descr">{language}</p>
                <div className="single-comic__price">{price}</div>
            </div>
            <a href="/comics" className="single-comic__back">Back to all</a>
        </div>
    )

}

export default SingleComicPage;
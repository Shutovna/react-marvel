import './charList.scss';
import abyss from '../../resources/img/abyss.jpg';
import MarvelService from "../../services/MarvelService";
import {Component} from "react";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";

class CharList extends Component {


    constructor(props, context) {
        super(props, context);
        this.state = {
            chars: [],
            loading: true,
            error: false
        }
    }


    componentDidMount() {
        this.loadChars();
    }

    onError = () => {
        this.setState({
            loading: false,
            error: true
        })
    }

    onCharsLoaded = (chars) => {
        this.setState({
            loading: false,
            chars: chars
        })
    }

    loadChars = () => {
        const marvelService = new MarvelService();

        marvelService.getAllCharacters()
            .then(this.onCharsLoaded)
            .catch(this.onError);
    }

    render() {
        const {chars, loading, error} = this.state;
        const errorMessage = error ? <ErrorMessage/> : null;
        const spinner = loading ? <Spinner/> : null;
        const content = !(loading || error) ?
            <ul className="char__grid">
                {chars.map(item => <View char={item}/>)}
            </ul> : null;


        return (
            <div className="char__list">
                {errorMessage}
                {spinner}
                {content}
                <button className="button button__main button__long">
                    <div className="inner">load more</div>
                </button>
            </div>
        )
    }
}

const View = ({char}) => {
    const {name, thumbnail} = char;
    let imgStyle;
    if (thumbnail.indexOf("image_not_available") > -1) {
        imgStyle = {objectFit: "contain"}
    }

    return (
        <li className="char__item">
            <img src={thumbnail} alt="character" style={imgStyle}/>
            <div className="char__name">{name}</div>
        </li>
    )


}


export default CharList;
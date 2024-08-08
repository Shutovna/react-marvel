import {Link} from "react-router-dom";

const Page404 = () => {
    return (
        <div>
            <p>Not found</p>
            <Link to={"/"}>Back to main page</Link>
        </div>
    )
}

export default Page404;
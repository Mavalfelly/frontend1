import { Link } from "react-router-dom";

const NavBar = () => {
    return(
        <>
            <nav>            
                <p>
                    <Link to="/tracks">Home</Link>
                </p>
                <p>
                    <Link to="/tracks/new">Add a Track</Link>
                </p>           
            </nav>
        </>
    )
};

export default NavBar
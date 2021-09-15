import { NavLink } from "react-router-dom";

function Menu({page}) {

    return (
        <ul className={`menu ${page}`}>
            <li><NavLink exact to={"/"} activeClassName="proportions">Proportions</NavLink></li>
            <li><NavLink exact to={"/organigramme"} activeClassName="organigramme">Organigramme</NavLink></li>
        </ul>
    );
}

export default Menu;
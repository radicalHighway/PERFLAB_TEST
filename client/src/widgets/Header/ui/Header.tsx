
import { CLIENT_ROUTES } from "@/shared/enums/clientRoutes";
import { NavLink } from "react-router";

export function Header(): React.JSX.Element {



    return (
        <div>
            <h1>Header: {info}</h1>

            <nav>
                <ul>
                    <li><NavLink to={CLIENT_ROUTES.HOME}>Home</NavLink></li>
                    <li><NavLink to={CLIENT_ROUTES.TASKS}>Tasks</NavLink></li>
                    <li><NavLink to={CLIENT_ROUTES.SIGN_IN}>Sign In</NavLink></li>
                    <li><NavLink to={CLIENT_ROUTES.SIGN_UP}>Sign Up</NavLink></li>
                </ul>
            </nav>
        </div>
    )
}
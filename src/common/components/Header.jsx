import React, {useState} from "react"
import Search from "../../assets/images/search.png";
import GreeniaLogo from "../../assets/images/greenia-logo.png";
import Logout from "../../assets/images/log-out.png";
import {Link} from 'react-router-dom'
import {logout} from "../../features/user/userSlice";
import parseJson from "../helpers/parseJSON";
import "./Header.css";

export default function Header() {

    const user = parseJson(localStorage.getItem('user'));

    const handleClick = () => {
        localStorage.clear();
        window.location.href = "/"
    }

    return (
        <nav className="page-nav">
            <div className="d-flex justify-content-between">
                <div className="search-box d-flex align-items-center">
                    <img className="d-inline img-search" src={Search} alt="Search items"/>
                    <input type="text" placeholder="Ricerca"/>
                </div>
                
                <div className="d-flex align-items-center">
                    <div className="user-info">
                        <span className="email">{ user.email }</span><br/>
                        <h6 className="font-weight-bold">{ user.name }</h6>
                    </div>
                    <div className="avatar">
                        <img
                            src="https://mdbcdn.b-cdn.net/img/new/avatars/2.webp"
                            alt="Black and White Portrait of a Man"
                        />
                    </div>
                    <span className="logout" onClick={handleClick}>
                        <img src={Logout}  height="25" alt="Logout icon"/>
                    </span>
                </div>
            </div>
        </nav>
    )
}

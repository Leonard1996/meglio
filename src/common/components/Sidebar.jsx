import React from "react"
import GreeniaLogo from "../../assets/images/greenia-logo.png";
import eLearning from "../../assets/images/e-learning.png";
import ListaAttivita from "../../assets/images/lista-attivita.png";
import ListaProdotti from "../../assets/images/lista-prodotti.png";
import ListaRinnovi from "../../assets/images/lista-rinnovi.png";
import Portagolgio from "../../assets/images/portagolgio.png";
import Tutorial from "../../assets/images/tutorial.png";
import User from "../../assets/images/user.png";
import "./Sidebar.css";
import { Link } from "react-router-dom";

export default function Sidebar() {

    return (<div className="col-md-3" id="sidear-wrapper">
        <nav id="sidebarMenu" className="d-lg-block sidebar collapse">
            <Link className="navbar-brand mt-2 mt-lg-0" to="/">
                <div className="d-flex justify-content-center header-logo">
                    <img src={GreeniaLogo} alt="App Logo" />
                </div>
            </Link>
            <div className="mt-4">
                <ul>
                    <li className="dropdown">
                        <Link to="/" className="list-group-item list-group-item-action py-2 ripple">
                            <img className="item-img" src={ListaProdotti} alt="Products List" />
                            <span className="item">Lista Prodotti</span><span className="icon">&rsaquo;</span>
                        </Link>
                        <ul>
                            <li>
                                <Link to="/quote/auto" className="list-group-item list-group-item-action second-ul ripple">
                                    <span className="item">Auto</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/quote/moto" className="list-group-item list-group-item-action second-ul ripple">
                                    <span className="item">Moto</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/quote/autocarro" className="list-group-item list-group-item-action second-ul ripple">
                                    <span className="item">Autocarro</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/quote/profession" className="list-group-item list-group-item-action second-ul ripple">
                                    <span className="item">Professionale</span>
                                </Link>
                            </li>
                        </ul>
                    </li>
                    <li>
                        <Link to="/report" className="list-group-item list-group-item-action py-2 ripple">
                            <img className="item-img" src={ListaAttivita} alt=""/>
                            <span className="item">Report</span>
                        </Link>
                    </li>
                    <li><a href="#" className="list-group-item list-group-item-action py-2 ripple">
                        <img className="item-img" src={ListaRinnovi} alt="" />
                        <span className="item">Lista Rinnovi</span></a>
                    </li>
                    <li className="dropdown">
                        <Link to="/profile" className="list-group-item list-group-item-action py-2 ripple">
                            <img className="item-img" src={User} alt="" />
                            <span className="item">Profile</span>
                            {/* <span className="icon">&rsaquo;</span> */}
                        </Link>
                        {/* <ul>
                                <li><a href="#"
                                       className="list-group-item list-group-item-action second-ul ripple"><span
                                    className="item">Item1</span></a></li>
                                <li><a href="#"
                                       className="list-group-item list-group-item-action second-ul ripple"><span
                                    className="item">Item1</span></a></li>
                                <li><a href="#"
                                       className="list-group-item list-group-item-action second-ul ripple"><span
                                    className="item">Item1</span></a></li>
                            </ul> */}
                    </li>
                    <li><a href="#" className="list-group-item list-group-item-action py-2 ripple">
                        <img className="item-img" src={Portagolgio} alt="" />
                        <span className="item">Portafoglio Intermediario</span></a>
                    </li>
                    <li><a href="#" className="list-group-item list-group-item-action py-2 ripple">
                        <img className="item-img" src={eLearning} alt="" />
                        <span className="item">e-Learning</span></a></li>

                    <li>
                        <Link to='/tutorial' className="list-group-item list-group-item-action py-2 ripple">
                            <img className="item-img" src={Tutorial} alt="" />
                            <span className="item">Tutorial</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    )
}
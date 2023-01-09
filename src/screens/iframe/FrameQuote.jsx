import React from "react"
import Car from "../../assets/images/car.png";
import CarWhite from "../../assets/images/car-white.png";
import Moto from "../../assets/images/moto.png";
import MotoWhite from "../../assets/images/moto-white.png";
import Truck from "../../assets/images/truck.png";
import TruckWhite from "../../assets/images/truck-white.png";
import Home from "../../assets/images/home.png";
import HomeWhite from "../../assets/images/home-white.png";
import Professional from "../../assets/images/professional.png";
import ProfessionalWhite from "../../assets/images/professional-white.png";
import Trips from "../../assets/images/trips.png";
import TripsWhite from "../../assets/images/trips-white.png";
import Injuries from "../../assets/images/injuries.png";
import InjuriesWhite from "../../assets/images/injuries-white.png";
import {useState} from "react";
import {useNavigate, useParams} from 'react-router-dom';
import ProductCard from "../../common/components/ProductCard";

export default function FrameQuote() {
    const [product, setProduct] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const navigateToProductForm = () => {
        navigate(`/frame/${id}/quote/${product}`);
    }
    return (
        <div className="quote">
            <div className="quote-group">
                <div className="quote-h1"><h1>NUOVO PREVENTIVO</h1></div>
                <div className="quote-h6"><h6>Cosa vuoi proteggere?</h6></div>
            </div>
            <div className="container-fluid text-center">
                <div className="row justify-content-center g-2 g-md-5 mt-3">

                    <ProductCard title={"Auto"} isActive={product==='auto'} onSelect={() => setProduct('auto')} imageWhite={CarWhite} iamgeDark={Car}/>
                    
                    <ProductCard title={"Moto"} isActive={product==='moto'} onSelect={() => setProduct('moto')} imageWhite={MotoWhite} iamgeDark={Moto}/>
                    
                    <ProductCard title={"Autocarro"} isActive={product==='autocarro'} onSelect={() => setProduct('autocarro')} imageWhite={TruckWhite} iamgeDark={Truck}/>
                    
                    <ProductCard title={"Casa"} isActive={product==='casa'} onSelect={() => setProduct('casa')} imageWhite={HomeWhite} iamgeDark={Home}/>

                    <ProductCard title={"Professionale"} isActive={product==='professionale'} onSelect={() => setProduct('professionale')} imageWhite={ProfessionalWhite} iamgeDark={Professional}/>

                    <ProductCard title={"Viaggi"} isActive={product==='viaggi'} onSelect={() => setProduct('viaggi')} imageWhite={TripsWhite} iamgeDark={Trips}/>

                    <ProductCard title={"Infortuni"} isActive={product==='infortuni'} onSelect={() => setProduct('infortuni')} imageWhite={InjuriesWhite} iamgeDark={Injuries}/>

                </div>
                <div className="row justify-content-center footer-button">
                    <button className="btn btn-primary btn-continue" onClick={navigateToProductForm}>Continua</button>
                </div>
            </div>
        </div>
    )
}


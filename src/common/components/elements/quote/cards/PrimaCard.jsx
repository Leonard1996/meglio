import { useEffect } from "react";
import PrimaLogo from "../../../../../assets/images/primalogo.png";
import { guideType } from "../../../../constants";

const primaMapCoverages = {
    rca:"rca",
    furto_incendio:"",
    assistenza_stradale:"assistenza_stradale",
    infortuni_conducente:"infortuni_conducente",
    tutela_legale:"tutela_legale",
    kasco_collisione:"",
    bonus_protetto:"",
    cristali:"",
    rivalsa:"protezione_rivalse",
    kasko_completa:"",
    eventi_neutrali:""
}

export default function PrimaCard(props){
    const { coverages, quote } = props;
    const { 
        company,
        full_request, 
        quotation_data_prima: {
            can_be_saved,
            quotation_data_prima_guarantees,
            required_guarantees
        }
    } = quote;
    const { guide_type } = JSON.parse(full_request);
    const guide = guideType.filter((g)=>g.id === guide_type)[0].name;
    let primaCoverages = [];
    let primaPrices = {};
    quotation_data_prima_guarantees.forEach((guarantee)=>{
        primaCoverages.push(guarantee.slug)
        primaPrices[guarantee.slug] = guarantee.quotation_data_prima_guarantee_prices;
        // console.log(guarantee);
    });
    const checkIfPrimaHasAllGuarantees = () => {
        let includes = true;
        coverages.forEach((coverage)=>{
            if(primaCoverages.indexOf(primaMapCoverages[coverage]) === -1){
                includes = false;
            }
        })
        return includes;
    }

    let includesSelectedGuaranties = checkIfPrimaHasAllGuarantees();

    const calculatePrice = () => {
        let price = 0;
      
        coverages.forEach((coverage)=>{
            price += primaPrices[primaMapCoverages[coverage]][0].full
        },[]);
        
        return price;
    } 

    let quotationPrice = quote.amount;

    if(includesSelectedGuaranties){
        quotationPrice = calculatePrice();
    }
    // useEffect(()=>{
    //     console.log("UpdatedCoverages", coverages);
    // }, [coverages]);
    // console.log(includesSelectedGuaranties);

    return (
        <div className="quote-card row">
        <div className="col-md-3">
            <div className="brand-iamge">
                <img src={PrimaLogo} alt={"Adriatic Logo"} />
            </div>
            <div className="info-buttons">
                <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"/></svg></span>
                <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M365.3 93.38l-74.63-74.64C278.6 6.742 262.3 0 245.4 0L64-.0001c-35.35 0-64 28.65-64 64l.0065 384c0 35.34 28.65 64 64 64H320c35.2 0 64-28.8 64-64V138.6C384 121.7 377.3 105.4 365.3 93.38zM336 448c0 8.836-7.164 16-16 16H64.02c-8.838 0-16-7.164-16-16L48 64.13c0-8.836 7.164-16 16-16h160L224 128c0 17.67 14.33 32 32 32h79.1V448zM96 280C96 293.3 106.8 304 120 304h144C277.3 304 288 293.3 288 280S277.3 256 264 256h-144C106.8 256 96 266.8 96 280zM264 352h-144C106.8 352 96 362.8 96 376s10.75 24 24 24h144c13.25 0 24-10.75 24-24S277.3 352 264 352z"/></svg></span>
            </div>
        </div>
        <div className="col-md-5">
            <div className="quote-info">
                <div className="">
                    <div className="qinfo">
                        <span><b>Compagnia</b></span>
                        <span>{company.name}</span>
                    </div>
                    <div className="qinfo">
                        <span><b>Risarcimento:</b></span>
                        <span>RC con isaroimento diretto e RFS</span>
                    </div>
                    <hr/>
                    <div className="qinfo">
                        <span><b>Emissione:</b></span>
                        <span>Dopo invio doccumenti</span>
                    </div>
                    <div className="qinfo">
                        <span><b>Garancia Incluze:</b></span>
                        <span>
                            {quotation_data_prima_guarantees[0].name}<br />
                            {quotation_data_prima_guarantees[0].limits_name}
                        </span>
                    </div>
                    <div className="qinfo">
                        <span><b>Guida:</b></span>
                        <span>{guide} </span>
                    </div>
                </div>
                
            </div>
        </div>
        <div className="col-md-4">
            {includesSelectedGuaranties?
                <>
                    <span className="q-price"><b>Prezzo annuo:</b><br/><span className="a-price">€{quotationPrice.toLocaleString()}</span></span>
                    <div className="action-buttons">
                        <button className="btn btn-success">Acquista</button>  
                        {can_be_saved && <button className="btn btn-primary">Salva</button>}
                    </div>
                </>
                :
                <div>
                    Prima does not include this guarantee
                </div>
            }   
        </div>
    </div>
    )
}
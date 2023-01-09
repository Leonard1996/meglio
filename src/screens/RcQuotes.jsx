import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getVehicleQuotes } from "../api";
import CoverageItem from "../common/components/CoverageItem";
import PageLoading from "../common/components/elements/PageLoading";
import QuotesList from "../common/components/elements/quote/QuotesList";
import { BACKEND_BASE_URL } from "../config";
import "./RcQuotes.css";

const activeBrands = [1,2];
const brands = {
    1:{name:"Adriatic"},
    2:{name:"Prima"}
}
export default function RcQuotes(){

    const [isLoading, setIsLoading] = useState(true);
    const [requestInfo, setRequestInfo] = useState(null);
    const [intervalID, setIntervalID] = useState(null);
    const [progress, setProgress] = useState(null);
    const [quotes, setQuotes] = useState(null);
    const [failedQuotes, setFailedQuotes] = useState(null);
    const [noQuotes, setNoQuotes] = useState(false);
    const [coverages, setCoverages] = useState(['rca']);
    const { requestToken } = useParams();

    const updateCoverages = (item) => {
        if(item.selected){
                setCoverages(prevState=>[...prevState, item.id]);
        }else{
            setCoverages(prevState=>prevState.filter(c=>c !== item.id ));
        }
    }

    useEffect(()=> {
        const loadQotes = () => {
           getVehicleQuotes({requestToken}).then(res=>{
            if(res.statusCode === 200){
                setRequestInfo(res.data[0]);
            }
           });
        }
        setIntervalID(setInterval(() => {
            loadQotes();
        }, 3000));
    },[])

    useEffect(()=>{
        const checkQuotes = ( quotes, failed_quotes ) => {
            let companyIds = [];
            
            quotes.forEach(quote => {
                companyIds.push(quote.company_id);
            });

            failed_quotes.forEach(quote => {
                companyIds.push(quote.company_id);
            });

            companyIds = companyIds.filter((v, i, a) => a.indexOf(v) === i);

            setProgress((companyIds.length/activeBrands.length) * 100);
            
            if(companyIds.length === activeBrands.length){
                clearInterval(intervalID);
                setIsLoading(false);
                if(quotes.length === 0 ) {
                    setQuotes(null);
                    setNoQuotes(true);
                } else {
                    setQuotes(quotes);
                    // setNoQuotes(true);
                }
                setFailedQuotes(failed_quotes);
            }
        }

        if(requestInfo !== null && requestInfo.quotations ) checkQuotes(requestInfo.quotations, requestInfo.failed_quotations);
    },[requestInfo, intervalID])


    if(isLoading){
        return <PageLoading />
    }

    return (
        <div className="resultsPage">
                <div className="row">
                    <div className="col-md-9">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                    <div><h4>Preventivi assicurazione auto</h4></div>
                    { requestInfo !== null &&        
                        <div className="info-card-rc">
                            <p><b>Contraente:</b> {requestInfo.customer.name} {requestInfo.customer.surname}</p>
                            <p><b>Auto:</b> {requestInfo.vehicle.version.full_description}</p>
                            <p><b>Targa:</b> {requestInfo.vehicle.vehicle_plate}</p>
                            <p><b>Inizio Copertura:</b> {requestInfo.policy_effective_date}</p>
                        </div> 
                    }
                </div>
                    <div className="pdate"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M152 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24V64zM48 248H128V192H48V248zM48 296V360H128V296H48zM176 296V360H272V296H176zM320 296V360H400V296H320zM400 192H320V248H400V192zM400 408H320V464H384C392.8 464 400 456.8 400 448V408zM272 408H176V464H272V408zM128 408H48V448C48 456.8 55.16 464 64 464H128V408zM272 192H176V248H272V192z"/></svg> Preventivi aggiorni al {new Date().toLocaleDateString('it')}</span></div>
                    {noQuotes && <div>Failed to get any quotes at the given time. Please contact sytem Admin for more info.</div>}
                    {quotes && <QuotesList quotes={quotes} coverages={coverages}/>}
                    {failedQuotes && (
                            <div className="failed-quotations-block">This companies have failed to respond with a quotation.<br />
                                <hr></hr>
                                <div className="container">
                                    <div className="row">
                                        {failedQuotes.map((quote)=>{
                                            console.log(quote);
                                            return (
                                                <div class="col-3">
                                                    <img src={BACKEND_BASE_URL+quote.company.logo} alt={`${quote.company.name} Logo`}/>
                                                </div>
                                            )
                                        })} 
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div>
                <div className="col-md-3">
                    <div className="coverages">
                        <span className="title">Aggiungi granzie</span>
                        <ul className="list-unstyled">
                            <CoverageItem title="RCA (sempre inclusa)" value="rca" selected={true} disabled={true}/>
                            <CoverageItem title="Furto e Incendio" value="furto_incendio" onChange={(selected)=>updateCoverages({selected:selected, id:"furto_incendio"})}/>
                            <CoverageItem title="Assistenza stradale" value="assistenza_stradale" onChange={(selected)=>updateCoverages({selected:selected, id:"assistenza_stradale"})}/>
                            <CoverageItem title="Infortuni conducente" value="infortuni_conducente" onChange={(selected)=>updateCoverages({selected:selected, id:"infortuni_conducente"})}/>
                            <CoverageItem title="Tutela legale" value="tutela_legale" onChange={(selected)=>updateCoverages({selected:selected, id:"tutela_legale"})}/>
                            <CoverageItem title="Kasco collisione" value="kasco_collisione" onChange={(selected)=>updateCoverages({selected:selected, id:"kasco_collisione"})}/>
                            <CoverageItem title="Bonus protetto" value="bonus_protetto" onChange={(selected)=>updateCoverages({selected:selected, id:"bonus_protetto"})}/>
                            <CoverageItem title="Cristalli" value="cristali" onChange={(selected)=>updateCoverages({selected:selected, id:"cristali"})}/>
                            <CoverageItem title="Zero rivalsa per ebbrezza" value="rivalsa" onChange={(selected)=>updateCoverages({selected:selected, id:"rivalsa"})}/>
                            <CoverageItem title="Kasko completa" value="kasko_completa" onChange={(selected)=>updateCoverages({selected:selected, id:"kasko_completa"})}/>
                            <CoverageItem title="Eventi Neutrali" value="eventi_neutrali" onChange={(selected)=>updateCoverages({selected:selected, id:"eventi_neutrali"})}/>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
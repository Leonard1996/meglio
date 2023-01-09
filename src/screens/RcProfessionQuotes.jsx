import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { getProfessionQuotes, storageGetSelectedProfession } from "../api";
import CoverageItem from "../common/components/CoverageItem";
import PageLoading from "../common/components/elements/PageLoading";
import { allowedProfessionCompanyIds } from "../common/constants";
import TokioMarineLogo from "../assets/images/tokiomarine.png";
export default function RcProfessionQuotes(){
    const [isLoading, setIsLoading] = useState(true);
    const [info, setInfo] = useState(null);
    const [quotes, setQuotes] = useState(null);
    const [displayQuotes, setDisplayQuotes] = useState(null);
    const [extensions, setExtensions] = useState(null);
    const [userData, setUserData] = useState(null);
    const [selectedProfession,setSelectedProfession] = useState(null);
    const { requestToken } = useParams();


    const addMoreExtensions = (item) => {
        setExtensions((extension)=>[...extension, item]);
        getProfessionQuotes({requestToken:requestToken, extensions:extensions}).then( res => {
            setQuotes(res.data.data.quotes);
        })
    }

    useEffect(() => {
        let qt = [];
        if(quotes){
            Object.keys(quotes).forEach(key=>{
                if(allowedProfessionCompanyIds.includes(key)){
                    qt.push(quotes[key]);
                }
            })
            setDisplayQuotes(qt);
            setExtensions(qt[0].extensions);
            setIsLoading(false);
        }
    },[quotes])

    useEffect(()=> {
        const loadQuotes = async () => getProfessionQuotes({requestToken:requestToken}).then( res => {
            // console.log(res);
            setQuotes(res.data.quotes);
            setUserData(res.data.request);
        })
        if(requestToken){
            loadQuotes();
            setSelectedProfession(storageGetSelectedProfession());
        }
    },[requestToken]);

    if(isLoading){
        return (
            <PageLoading />
        )
    }
    return (
        <div className="resultsPage">
         
            <div className="row">
                    <div className="col-md-9">
                    <div className="d-flex align-items-center justify-content-between mb-4">
                    <div><h4>Preventivi assicurazione professionale</h4></div>
                    
                    <div className="info-card-rc">
                        <p><b>Contraente:</b> {userData.name} {userData.surname}</p>
                     
                        <p><b>Professione:</b> {userData.profession_desc}</p>
                        
                    </div>
                </div>
                    <div className="pdate"><span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M152 64H296V24C296 10.75 306.7 0 320 0C333.3 0 344 10.75 344 24V64H384C419.3 64 448 92.65 448 128V448C448 483.3 419.3 512 384 512H64C28.65 512 0 483.3 0 448V128C0 92.65 28.65 64 64 64H104V24C104 10.75 114.7 0 128 0C141.3 0 152 10.75 152 24V64zM48 248H128V192H48V248zM48 296V360H128V296H48zM176 296V360H272V296H176zM320 296V360H400V296H320zM400 192H320V248H400V192zM400 408H320V464H384C392.8 464 400 456.8 400 448V408zM272 408H176V464H272V408zM128 408H48V448C48 456.8 55.16 464 64 464H128V408zM272 192H176V248H272V192z"/></svg> Preventivi aggiorni al {new Date().toLocaleDateString('it')}</span></div>
                    <div className="quote-card row">
                        <div className="col-md-3">
                            <div className="brand-iamge">
                                <img src={TokioMarineLogo} alt={"Adriatic Logo"} />
                            </div>
                            <div className="info-buttons">
                                <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM216 336h24V272H216c-13.3 0-24-10.7-24-24s10.7-24 24-24h48c13.3 0 24 10.7 24 24v88h8c13.3 0 24 10.7 24 24s-10.7 24-24 24H216c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-144c-17.7 0-32-14.3-32-32s14.3-32 32-32s32 14.3 32 32s-14.3 32-32 32z"/></svg></span>
                                <span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M365.3 93.38l-74.63-74.64C278.6 6.742 262.3 0 245.4 0L64-.0001c-35.35 0-64 28.65-64 64l.0065 384c0 35.34 28.65 64 64 64H320c35.2 0 64-28.8 64-64V138.6C384 121.7 377.3 105.4 365.3 93.38zM336 448c0 8.836-7.164 16-16 16H64.02c-8.838 0-16-7.164-16-16L48 64.13c0-8.836 7.164-16 16-16h160L224 128c0 17.67 14.33 32 32 32h79.1V448zM96 280C96 293.3 106.8 304 120 304h144C277.3 304 288 293.3 288 280S277.3 256 264 256h-144C106.8 256 96 266.8 96 280zM264 352h-144C106.8 352 96 362.8 96 376s10.75 24 24 24h144c13.25 0 24-10.75 24-24S277.3 352 264 352z"/></svg></span>
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div className="quote-info">
                                <div className="">
                                   
                                    <h4>Garanzie incluse</h4>
                                    <hr/>
                                    <div className="qinfo">
                                        <span><b>Compagnia</b></span>
                                        <span>{displayQuotes[0].brand_data.name}</span>
                                    </div>
                                    <div className="qinfo">
                                        <span><b>Professione:</b></span>
                                        <span>{userData.profession_desc}</span>
                                    </div>
                                    <div className="qinfo">
                                        <span><b>Fatturato:</b></span>
                                        <span>{userData.billed}</span>
                                    </div>
                                    <div className="qinfo">
                                        <span><b>Massimale:</b></span>
                                        <span>{userData.billed_maximum}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">

                            <span className="q-price"><b>Prezzo mensile:</b><br/><span className="a-price">€{displayQuotes[0].price.toLocaleString()}</span></span>
                            <div className="action-buttons">
                                <button className="btn btn-success">Acquista</button>  
                                <button className="btn btn-primary">Salva</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-md-3">
                    <div className="coverages">
                        <span className="title">Aggiungi granzie</span>
                        <ul className="list-unstyled">
                            {  
                                selectedProfession.extensions.map((extension,index)=> { 
                                    return <CoverageItem key={index} title={extension.name} />
                                })
                            }
                        </ul>
                    </div>
                </div>
            </div>
           
        </div>
    )
}
import styles from "./Report.css";
import TokioMarineLogo from "../assets/images/tokiomarine.png";

const data = [
    {contractor:"Bledjan Deda", phone:"3212345678", company:"Tokio Marine HCC"},
    {contractor:"John Doe Deda", phone:"3212345678", company:"Tokio Marine HCC"},
    {contractor:"User Deda", phone:"3212345678", company:"Tokio Marine HCC"},
    {contractor:"Test User", phone:"3212345678", company:"Tokio Marine HCC"},
    {contractor:"Pippo Paperino", phone:"3212345678", company:"Tokio Marine HCC"},
    {contractor:"Test", phone:"3212345678", company:"Tokio Marine HCC"}
]

export default function Reports(){

    return (
        <div>
            <div className="row">
                <div className="col-md-8">
                    <div className="list">
                        <div className="list-controls">
                            <button className="btn">Polizze Emesse</button>
                            <button className="btn">Preventivi</button>
                        </div>
                        <ul className="list-ul">
                            {data.map(item=>{
                                return (
                                    <li>
                                    <div className="quote-card row">
                                        <div className="col-md-3">
                                            <div className="brand-iamge">
                                                <img src={TokioMarineLogo} alt={"Adriatic Logo"} />
                                            </div>
                                            <div className="user-data">
                                                <span>Contractor</span>
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0S96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z"/></svg>
                                                        {item.contractor}
                                                    </div>
                                                    <div>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M16 64C16 28.7 44.7 0 80 0H304c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H80c-35.3 0-64-28.7-64-64V64zM144 448c0 8.8 7.2 16 16 16h64c8.8 0 16-7.2 16-16s-7.2-16-16-16H160c-8.8 0-16 7.2-16 16zM304 64H80V384H304V64z"/></svg> 
                                                        {item.phone}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="quote-info">
                                                    <div className="">
                                                        <h4>Garanzie incluse</h4>
                                                        <hr/>
                                                        <div className="qinfo">
                                                            <span><b>Compagnia</b></span>
                                                            <span>Tokio Marine HCC</span>
                                                        </div>
                                                        <div className="qinfo">
                                                            <span><b>Professione:</b></span>
                                                            <span>Ingegnere</span>
                                                        </div>
                                                        <div className="qinfo">
                                                            <span><b>Fatturato:</b></span>
                                                            <span>30.001 - 50.000</span>
                                                        </div>
                                                        <div className="qinfo">
                                                            <span><b>Massimale:</b></span>
                                                            <span>250000</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
        
                                                <span className="q-price"><b>Prezzo mensile:</b><br/><span className="a-price">€321.00</span></span>
                                                <div className="action-buttons">
                                                    <button className="btn btn-success">SOLD</button>  
                                                    {/* <button className="btn btn-primary">Salva</button> */}
                                                </div>
                                            </div>
                                        </div>
        
                                        <div className="other-actions">
                                            <button className="btn">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M142.9 142.9c62.2-62.2 162.7-62.5 225.3-1L327 183c-6.9 6.9-8.9 17.2-5.2 26.2s12.5 14.8 22.2 14.8H463.5c0 0 0 0 0 0H472c13.3 0 24-10.7 24-24V72c0-9.7-5.8-18.5-14.8-22.2s-19.3-1.7-26.2 5.2L413.4 96.6c-87.6-86.5-228.7-86.2-315.8 1C73.2 122 55.6 150.7 44.8 181.4c-5.9 16.7 2.9 34.9 19.5 40.8s34.9-2.9 40.8-19.5c7.7-21.8 20.2-42.3 37.8-59.8zM16 312v7.6 .7V440c0 9.7 5.8 18.5 14.8 22.2s19.3 1.7 26.2-5.2l41.6-41.6c87.6 86.5 228.7 86.2 315.8-1c24.4-24.4 42.1-53.1 52.9-83.7c5.9-16.7-2.9-34.9-19.5-40.8s-34.9 2.9-40.8 19.5c-7.7 21.8-20.2 42.3-37.8 59.8c-62.2 62.2-162.7 62.5-225.3 1L185 329c6.9-6.9 8.9-17.2 5.2-26.2s-12.5-14.8-22.2-14.8H48.4h-.7H40c-13.3 0-24 10.7-24 24z"/></svg> 
                                                Ricalcola
                                            </button>
                                            <button className="btn">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM432 256c0 79.5-64.5 144-144 144s-144-64.5-144-144s64.5-144 144-144s144 64.5 144 144zM288 192c0 35.3-28.7 64-64 64c-11.5 0-22.3-3-31.6-8.4c-.2 2.8-.4 5.5-.4 8.4c0 53 43 96 96 96s96-43 96-96s-43-96-96-96c-2.8 0-5.6 .1-8.4 .4c5.3 9.3 8.4 20.1 8.4 31.6z"/></svg>
                                                Guarda i detagli.
                                            </button>
                                            {/* <button className="btn"> View Details</button> */}
                                        </div>
        
                                    </li>
                                )
                            })}


                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default function QuoteCard(item, coverages) {
    const { coverages, quote } = props;
    return (
        <div className="quote-card row">
            <div className="col-md-3">
                <div className="brand-iamge">
                    <img src={fakeQuote[0].adLogo} alt={"Adriatic Logo"} />
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
                            <span>{fakeQuote[0].name}</span>
                        </div>
                        <div className="qinfo">
                            <span><b>Risarcimento:</b></span>
                            <span>{fakeQuote[0].riscarmento}</span>
                        </div>
                        <hr/>
                        <div className="qinfo">
                            <span><b>Emissione:</b></span>
                            <span>{fakeQuote[0].emissione}</span>
                        </div>
                        <div className="qinfo">
                            <span><b>Massimale RC:</b></span>
                            <span>{fakeQuote[0].masisimaleRC.persone.toLocaleString()} € per persone<br/>{fakeQuote[0].masisimaleRC.cose.toLocaleString()} € per cose</span>
                        </div>
                        <div className="qinfo">
                            <span><b>Guida:</b></span>
                            <span>{fakeQuote[0].guida} </span>
                        </div>
                    </div>
                    
                </div>
            </div>
            <div className="col-md-4">

                <span className="q-price"><b>Prezzo annuo:</b><br/><span className="a-price">€{fakeQuote[0].price.toLocaleString()},00</span></span>
                <div className="action-buttons">
                    <button className="btn btn-success">Acquista</button>  
                    <button className="btn btn-primary">Salva</button>
                </div>
            </div>
        </div>
    )
}
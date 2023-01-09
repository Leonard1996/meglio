import AdriaticCard from "./cards/AdriaticCard";
import PrimaCard from "./cards/PrimaCard";
// import QuoteCard from "./QuoteCard";
const isNullOrUndefined = (item) => {
    if(item === null) return true
    if(item === undefined) return true
    return false
}

export default function QuotesList(props) {

    const { quotes, coverages } = props;

    return (
        <div>
            {quotes.map(quote=>{
                if(!isNullOrUndefined(quote.quotation_data_prima)){
                    return <PrimaCard key={quote.id} quote={quote} coverages={coverages}/>
                }
                if(!isNullOrUndefined(quote.quotation_data_adriatic)){
                    <AdriaticCard key={quote.id} quote={quotes.adriatic} coverages={coverages}/>
                }
                return <div key={quote.id}>This quote cannot be shown for the moment! </div>
            })}
            
        </div>
    )
}
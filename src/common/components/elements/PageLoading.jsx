import LoadingGif from "../../../assets/images/loading.gif";
import "./PageLoading.css";
export default function PageLoading(){
    return (
        <div className="d-flex content-laoding">
            <div className="text-center">
                <img className="loading-gif" src={LoadingGif} /><br/>Attendere prego
            </div>
        </div>
    )
}
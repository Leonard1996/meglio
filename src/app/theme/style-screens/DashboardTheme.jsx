
import Header from "../../../common/components/Header";
import Sidebar from "../../../common/components/Sidebar";
import "./DashboardTheme.css";

export default function DashboardTheme(props){
    return(
        <>
            <Sidebar/>
            <div className="page-content">
                <Header/>
                <div className="page-content-items">
                    {props.children}
                </div>
            </div>
        </>
    )

}
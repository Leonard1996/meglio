
import "./CenteredPageTitle.css";
export default function CenteredPageTitle(props){
    if(props.children)
        return (
            <div className="title-h2 divider">{props.children}</div>
        )
    return (
        <div className="title-h2 divider"><h2>{props.title}</h2></div>
    )
}

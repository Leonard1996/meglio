import "./Input.css";


export default function InputHeaderTable(props) {

    return (
        <div className="row">
            <div className="col-md-12 offset-0">
                <div>
                    {props.options && props.options.map((opt) =>
                        <div key={opt.id}
                             className={`select-table-item header-item ${opt.id === props.selected ? "selected" : ""}`}>
                            {props.optionComponent && props.optionComponent(opt)}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

import "./ProgressBar.css";
export default function ProgressBar ({activeStep, steps}) {
    // console.log("activeStep", activeStep);
    return (
        <div className="m-auto d-flex stepsProgressBar">
            {steps.map((step, index)=>{
                let completed = false;
                if(activeStep === index+1 | activeStep > index+1){
                    completed = true;
                }
               return (<div key={step.toString()} className={`p-step ${ completed ? 'completed':''}`}><span className="indicator">{index+1}</span> <span>{step}</span></div>)
            })}
        </div>
    )
}
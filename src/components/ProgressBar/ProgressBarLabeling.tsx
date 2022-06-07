
import React, {FC} from "react";

import "./ProgressBar.css";

type LabelsProps = {

    barHeight: number | string,
    barWidth: number | string,
    numberOfSteps: number,
    labelsArray: string[]
}


const ProgressBarLabeling:FC<LabelsProps> = ({ numberOfSteps, barHeight, barWidth, labelsArray }) => {

    const barLabelStyle = { width: (typeof(barWidth) === "number") ? (String(barWidth/numberOfSteps)) : barWidth+"vw", display:"block" }

        let labels = []
        let label = ""

        for(let i = 0; i < numberOfSteps; i++){


            if(i < labelsArray.length){

                label = labelsArray[i];
            }else{
                label = "";
            }
           
            labels.push(<p className="bar label" key={"label"+i} style={barLabelStyle}>{label}</p>);


        }


    return(
        <div style={{display:"flex", textAlign:"center"}}>

            {labels}

        </div>
    );

}

export default ProgressBarLabeling


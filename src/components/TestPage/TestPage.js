// NavButtons.tsx
import React, { useEffect} from "react";
import ProgressBarLabeling from "../ProgressBar/ProgressBarLabeling";
import ProgressBarSingle from "../ProgressBar/ProgressBarSingle";

const Test = () => {
    const [mQuery, setMQuery] = React.useState({
      matches: window.innerWidth > 991.98 ? true : false,
    });
      useEffect(() => {
        let mediaQuery = window.matchMedia("(min-width: 991.98px)");
        mediaQuery.addListener(setMQuery);
        // this is the cleanup function to remove the listener
        return () => mediaQuery.removeListener(setMQuery);
      }, []);
      // MediaQueryListEvent { isTrusted: true, media: "(min-width: 768px)", matches: true ...} max-width: 991.98px

      const barHeight = 1.5;
      const labelsArray = ["Login Information", "User Information", "Profile Picture"]

      return (
        <div>
          {mQuery && !mQuery.matches ? (
            <div className="progressBar registeration_progress">
                
            <ProgressBarLabeling barHeight={barHeight} barWidth={100} numberOfSteps={3} labelsArray={labelsArray} />
            <ProgressBarSingle barHeight={barHeight} barWidth={100} numberOfSteps={3} currentStep={1} />
      
        </div>
          ) : (
            <div className="progressBar registeration_progress">
                
                <ProgressBarLabeling barHeight={barHeight} barWidth={80} numberOfSteps={3} labelsArray={labelsArray} />
                <ProgressBarSingle barHeight={barHeight} barWidth={80} numberOfSteps={3} currentStep={1} />
          
            </div>
          )}
        </div>
      );
    };

export default Test
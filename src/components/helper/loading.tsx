import { useEffect, useState } from "react";
import { Progress } from "../ui/progress";

type LoaderType = {
    percent: number;
    direction: 'front' | 'back'
} 

const initialLoader: LoaderType = {
    percent: 0,
    direction: 'front'
};

export function Loading() {
    const [loaderPercent, setPercent] = useState<LoaderType>(initialLoader);
    useEffect(() => {
        let timer = setInterval(()=>{
            setPercent((prev: LoaderType) => {
                if(prev.percent === 100){
                    return {percent: 90, direction: 'back'};
                }else if(prev.percent == 0){
                    return {percent: 10, direction: 'front'};
                }else {
                    return prev.direction === 'front' ? {...prev, percent: prev.percent + 10} : {...prev, percent: prev.percent - 10}
                }
            })
            
        }, 400);

        return () => {
            clearInterval(timer);
        }
    }, []);
  
    return (
    <>
      <div className="absolute top-0 left-0 min-w-full min-h-full z-50 flex justify-center bg-white items-center blur-sm opacity-50"></div>
      <div className="absolute top-0 left-0 min-w-full min-h-full z-50 flex justify-center items-center opacity-100">
        <Progress value={loaderPercent.percent} className="w-1/5" />
      </div>
    </>
  );
}

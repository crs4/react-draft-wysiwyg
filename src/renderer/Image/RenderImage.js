import React from 'react';
import { useEffect,useState } from 'react';

export const RenderImage = (props) => {

    const [imgWidth,setimgWidth] = useState(0)
    const [imgHeight,setimgHeight] = useState(0)
    const maxDim = Math.min(window.innerWidth, window.innerHeight)*0.5;
    
    useEffect(()=>{
        const { width, height } = props;
          if (width>height)
            setimgWidth(width)
            else setimgHeight(height);
        }
    ,[])


   return ((imgWidth>0) ? 
        <img alt={props.alt} style={{padding:"10ox"}} src={props.src} width={`${Math.min(imgWidth,maxDim)}px`}></img>
        :
        <img alt={props.alt}  style={{padding:"10ox"}} src={props.src} height={`${Math.min(imgHeight,maxDim)}px`}></img>
    )
}

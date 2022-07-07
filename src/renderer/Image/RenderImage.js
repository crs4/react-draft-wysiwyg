import React from 'react';
import { useEffect,useState } from 'react';

export const RenderImage = (props) => {

    const [imgWidth,setimgWidth] = useState(0)
    const [imgHeight,setimgHeight] = useState(0)
    const [url, setUrl] = useState(null);
    const maxDim = Math.min(window.innerWidth, window.innerHeight);
    
    useEffect(()=>{
        const { width, height } = props;
          if (width>height)
            setimgWidth(width)
            else setimgHeight(height);
            setUrl(url);
        }
    ,[])

    useEffect(()=>{
        console.log("URL set to:" + url);
    },[url])

   return url &&
     ((imgWidth>0) ? 
        <img alt={props.alt} style={{padding:"10ox"}} src={`${url}`} width={`${Math.min(imgWidth,maxDim)}px`}></img>
        :
        <img alt={props.alt}  style={{padding:"10ox"}} src={`${url}`} height={`${Math.min(imgHeight,maxDim)}px`}></img>
    )
}

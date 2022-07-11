import React from 'react';
import { useEffect, useState } from 'react';
import reactImageSize from 'react-image-size';


//@audit RenderImage
export const RenderImage = (props) => {

    const [imgWidth, setimgWidth] = useState(0)
    const [imgHeight, setimgHeight] = useState(0)
    const xscalefactor = props.xscalefactor ||  0.5
    const yscalefactor = props.yscalefactor || 0.5
    const maxDimX = window.innerWidth*xscalefactor
    const maxDimY = window.innerHeight*yscalefactor

    useEffect(() => {

        const { width, height, src } = props;

        if (width == "auto" && height == "auto" || (width==null && height==null)) {
            reactImageSize(src).then(({ width, height }) => {
                {
                    if (width > height)
                        setimgWidth(width);
                    else setimgHeight(height);
                }
                console.log(`RENDER IMAGE (LIB): width:${width} height:${height} src:${src}`);
            }).catch((errorMessage) => { console.log("error getting size;", errorMessage) });
        } else {
            if (width != "auto") setimgWidth(width);
            if (height != "auto") setimgHeight(height);
        }
    }
        , [])


    return ((imgWidth > 0) ?
        <img alt={props.alt} style={{ padding: "10px" }} src={props.src} width={`${Math.min(imgWidth, maxDimX)}px`}></img>
        :
        <img alt={props.alt} style={{ padding: "10px" }} src={props.src} height={`${Math.min(imgHeight, maxDimY)}px`}></img>
    )
}

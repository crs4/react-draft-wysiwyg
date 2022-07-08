import React from 'react';
import { useEffect, useState } from 'react';
import reactImageSize from 'react-image-size';



export const RenderImage = (props) => {

    const [imgWidth, setimgWidth] = useState(0)
    const [imgHeight, setimgHeight] = useState(0)
    const maxDimX = window.innerWidth * 0.5;
    const maxDimY = window.innerHeight * 0.5;

    useEffect(() => {

        const { width, height, src } = props;

        if (width == "auto" && height == "auto") {
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
        <img alt={props.alt} style={{ padding: "10ox" }} src={props.src} width={`${Math.min(imgWidth, maxDimX)}px`}></img>
        :
        <img alt={props.alt} style={{ padding: "10ox" }} src={props.src} height={`${Math.min(imgHeight, maxDimY)}px`}></img>
    )
}

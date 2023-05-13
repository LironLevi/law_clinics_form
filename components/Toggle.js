
import React, { useState } from 'react';
import Button from '@mui/material/ButtonBase';
import Image from 'next/image';

export default function Toggle({title, des}){
    const [show, setShow] = useState(false);
    return(
        <>
            <div className='title'>
                <div className ="toggle">
                    <Button className ="toggle-button" onClick={ ()=> setShow(!show)}>
                        {show?<Image src="/check3.png" width="15" height="23" alt="white" />:<Image src="/darkQ.png" width="14" height="21" alt="black"/>} 
                    </Button>
                    <div>{title}</div>
                </div>
                {show?<div className="added-test-toggle">{des}</div>: null}
            </div>
        </>
    );}

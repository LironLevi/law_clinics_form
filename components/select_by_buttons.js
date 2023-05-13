import React, { useState } from "react";
import Toggle from "./Toggle";
import Button from '@mui/material/ButtonBase';
import Image from "next/image";


export default function SelectByButtons({register,choiceType, name, des, options}) {
    const [isClicked, setIsClicked] = useState(false);

    return(
        <>
            <Toggle title={name} des={des}></Toggle>
            <div className="row">
                {options.map((optionName) => (
                    <label key={optionName} className="like-button">
                        <input type={choiceType} value={optionName} {...register(name, {})} />
                        <span>{optionName}</span>
                    </label>
                ))}

                {isClicked && <input type="text" className="add-text" {...register(name + " אחר")}/> }      
                
                <Button onClick={() =>setIsClicked(true)}>
                    <Image className="add-image" src="/plus.png" width="33" height="33" alt="plus"/>
                </Button>
            </div>
        </>
    );
}
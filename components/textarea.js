import React from "react";

export default function SelectByButtons({register, text}) {
    return(
        <div className="row">
            <textarea
            placeholder="פרטים נוספים"
            {...register(text)}
            ></textarea>
        </div>
    );
}
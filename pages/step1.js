import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useStateMachine } from 'little-state-machine';
import updateAction from '../updateAction';
import { useRouter} from "next/router";
import Navbar from "../components/navbar";
import SideForm from "../components/side_form";
import SelectByButtons from "../components/select_by_buttons";
import Toggle from "../components/Toggle";
import Button from '@mui/material/ButtonBase';
import Image from "next/image";
import { useSession } from "next-auth/react"
import { useSelector } from 'react-redux';


export default function Step1() {
  const isOpen = useSelector((state) => state.isOpen.value);
  const { actions, state } = useStateMachine({ updateAction });
  const { register, formState: {errors}, handleSubmit, control } = useForm({defaultValues: state.yourDetails});
  const router = useRouter();
  const { data: session } = useSession()
 
  const onSubmit = (data) => {
    console.log(data);
    actions.updateAction(data);
    router.push("/step2"); 
  };

  let sideFormClassAdd = "col-side-form-ifclosed";
  let stepFormClassAdd = "col-step-form-ifclosed";
  if (isOpen) {
    sideFormClassAdd = "col-side-form-ifopen";
    stepFormClassAdd = "col-step-form-ifopen";
  }

  if (session) {
    return (
      <div>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className={"col-step-form " + stepFormClassAdd}>
            <div>
              <Navbar/>
            </div>
            <div className="main-step">
              <div className="row name">
                <input placeholder="שם פרטי"  {...register("שם פרטי")} required/>
                <input placeholder="שם משפחה"  {...register("שם משפחה") } required/>
              </div>

              <Toggle title={"תעודת זהות / מס' זיהוי אחר"} des= {"במקרה שאין תעודת זהות יש להכניס מספר זיהוי של חסרות/חסרי מעמד."}></Toggle>
              <div className="row identity">
                <input placeholder="ת.ז" pattern="[0-9]*" {...register("מספר תעודת זהות")} minLength={8} maxLength={9} />
                <input placeholder="סוג תעודה" {...register("סוג תעודה")} />
              </div>
              <div className="row contact">
                <input placeholder="טלפון" {...register("טלפון")} />
                <input className="longer-input" placeholder="מייל" type ="email" {...register("מייל")} />
              </div>
              <div className="row birth">
                <input placeholder="תאריך לידה"  {...register("תאריך לידה")}/>     
                <input placeholder="ארץ לידה" {...register("ארץ לידה")} />
                <input placeholder="תאריך עלייה" {...register("תאריך עלייה")}/>        
              </div>

              <SelectByButtons register={register} choiceType={"checkbox"} name={"שפות"} 
              options={["עברית", "ערבית", "רוסית", "אנגלית", "אמהרית"]} des={"שפות המדוברות ע״י הנער/ה. ניתן להכניס כמה."}></SelectByButtons>

              <Toggle title={"כתובת"} des={"הכתובת המופיעה בתעודה המזהה של הנער/ה."}></Toggle>
              <div className="row address">
                <input placeholder="עיר" {...register("עיר")} />
                <input placeholder="רחוב, מס' רחוב" {...register("רחוב")} />
                <input placeholder="מס' דירה" {...register("מספר דירה")} />
                <input placeholder="מיקוד" {...register("מיקוד")} />
              </div>

              <Toggle title={"מין"} des={"מופיע בתעודת לידה, מין ביולוגי."}></Toggle>
              <div className="row gender">
                <label className="like-button">
                  <input type="radio" value="זכר" {...register("מין", {})} />
                  <span>ז</span>
                </label>
                <label className="like-button">
                  <input type="radio" value="נקבה" {...register("מין", {})} />
                  <span>נ</span>
                </label>
              </div>

              <SelectByButtons register={register} choiceType={"radio"} name={"מגדר"} 
              options={["ז", "נ"]} des={"הצורה בה הנער/ה מגדירה את עצמו/ה."}></SelectByButtons>

              <div className="row submit">
                <div className ="left">
                  <Button type="submit"> 
                    <Image src="/left.png" width="89" height="20" alt="left" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div className={"col-side-form " + sideFormClassAdd}>
            <SideForm register={register} control={control}/>
          </div>
        </form>
      </div>  
    );
  }
};























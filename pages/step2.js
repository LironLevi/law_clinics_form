import React, { useState, useEffect} from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter} from "next/router"
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";
import Navbar from "../components/navbar";
import SideForm, { isOpen } from "../components/side_form";
import SelectByButtons from "../components/select_by_buttons";
import Textarea from "../components/textarea";
import Button from '@mui/material/ButtonBase';
import Image from "next/image";
import Toggle from "../components/Toggle";
import { useSession } from "next-auth/react"



export default function Step2() {
  const { actions, state } = useStateMachine({ updateAction });
  const { control, handleSubmit, register} = useForm({defaultValues: state.yourDetails});
  const router = useRouter();
  const [diraction, setDiraction] = useState();
  const { data: session } = useSession()
  

  const {fields, append, remove} = useFieldArray({name: "contacts", rules: { maxLength: 4 }, control});

  const onSubmit = (data) => {
    console.log(data);
    actions.updateAction(data);
    if (diraction) {
      router.push("/step3");
    } else {
      router.push("/step1");
    }
  };

  let sideFormClassAdd = "col-side-form-ifclosed";
  let stepFormClassAdd = "col-step-form-ifclosed";
  if (isOpen) {
    sideFormClassAdd = "col-side-form-ifopen";
    stepFormClassAdd = "col-step-form-ifopen";
  }

  const [rerender, setRerender] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setRerender(!rerender);
    }, 30);
    return () => clearTimeout(timer);
  }, [rerender]);

  if (session) {
    return (
      <div>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className={"col-step-form " + stepFormClassAdd}>
            <div>
              <Navbar/>
            </div>
            <div className="main-step">
              <SelectByButtons register={register} choiceType={"radio"} name={"מסגרת נוכחית"} 
              options={["בית ספר", "פנמייה", "מרכז יום"]} des={"האם הנער/ה נמצאת במסגרת? ניתן להוסיף רובריקה למטרת שלילה או להוספה של מסגרת מסוג שונה."}></SelectByButtons>
              
              <Toggle title={"אנשי/נשות קשר נוספים/ות"} des={"מיועד לצורך יצירת קשר ותקשורת, חשוב למלא כמה שיותר על מנת למנוע סיום פעילות מוקדם."}></Toggle>
              <div className="row contact">
                <input placeholder="קשר" {...register(`contacts.-1.קשר`)} />
                <input placeholder="שם" {...register(`contacts.-1.שם`)} />
                <input placeholder="טלפון" {...register(`contacts.-1.טלפון`)} />
                <input className="longer-input" placeholder="הערות נוספות" {...register(`contacts.-1.הערות`)} />
              </div>
    
              {fields.map((field, index) => (
                <div className="row contact" key={field.id} >
                  <input placeholder="קשר" {...register(`contacts.${index}.קשר`)} />
                  <input placeholder="שם" {...register(`contacts.${index}.שם`)} />
                  <input placeholder="טלפון" {...register(`contacts.${index}.טלפון`)} />
                  <input className="longer-input" placeholder="הערות נוספות" {...register(`contacts.${index}.הערות`)} />
                  <Button type="button" onClick={() => remove(index)}>
                  <Image src="/minus.png" width="33" height="33" alt="minos" />

                  </Button>
                </div>
              ))}
    
                <Button type="button" className="row"
                  onClick={() => append({ firstName: "", lastName: "" , phoneNumber:"", comment: ""})}>   
                  <Image src="/plus.png" width="33" height="33" alt="plus" />
                </Button>
    

              <SelectByButtons register={register} choiceType={"checkbox"} name={"הליכים משפטיים /סמי משפטיים"}
              options={["ועדת תיכנון טיפול", "הליך פלילי", "הליך נזקקות"]} des={"הליכים פתוחים שהנער/ה נמצאת בהם (תביעות, בקשות למעמד וכו׳). ניתן להוסיף רובריקה למטרת שלילה או להוספה של מסגרת מסוג שונה."}></SelectByButtons>

              <SelectByButtons register={register} choiceType={"radio"} name={"קשר לקליניקה"}
              options={["מוקד שטח", "טלפוני", "קלינאי"]} des={"מי מילא/ה את הטופס, איך הנער/ה הגיע לטיפול בקליניקה?"}></SelectByButtons>

              <Textarea register={register} text={"פרטים נוספים לקשר קלינאי"}></Textarea>

              <SelectByButtons register={register} choiceType={"checkbox"} name={"דוחות בטיפול"}
              options={["עירייה", "משטרה"]} des={"דוחות שנתנו ע״י המשטרה או הערייה  (פגיעה ברכוש, רעש וכו׳). יש למלא כמה שיותר פרטים על מנת לאפשר המשך תהליך ברור."}></SelectByButtons>

              <Textarea register={register} text={"פרטים נוספים לדוחות בטיפול"}></Textarea>

              <div className="row submit">
                <div className ="right">
                  <Button type="submit" onClick={() => setDiraction(false)}> 
                    <Image src="/right.png" width="89" height="20" alt="right" />
                  </Button>
                </div>
                <div className ="left">
                  <Button type="submit" onClick={() => setDiraction(true)}> 
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
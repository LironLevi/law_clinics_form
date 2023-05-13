import React, { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { useStateMachine } from "little-state-machine";
import updateAction from "/./updateAction";
import { useRouter} from "next/router";
import { CREATE_FOLDER_ENDPOINT } from "../config";
import Navbar from "../components/navbar";
import SideForm, { isOpen } from "../components/side_form";
import SelectByButtons from "../components/select_by_buttons";
import Textarea from "../components/textarea";
import Toggle from "../components/Toggle";
import Button from '@mui/material/ButtonBase';
import Image from "next/image";
import { useSession } from "next-auth/react"
import End from "../components/End";


async function postData(data) {
  const formData = new FormData();

  for (const [key, value] of Object.entries(data)) {
    if(key.includes("קובץ")) formData.append(key, value[0]);
    else if (key == "contacts") {
      var index = -1;
      while (index < data["contacts"].length) {
        formData.append(`איש קשר ${index + 1}: קשר`, data["contacts"][index]["קשר"]);
        formData.append(`איש קשר ${index + 1}: שם`, data["contacts"][index]["שם"]);
        formData.append(`איש קשר ${index + 1}: טלפון`, data["contacts"][index]["טלפון"]);
        formData.append(`איש קשר ${index + 1}: הערות`, data["contacts"][index]["הערות"]);
        index += 1;
      }
    } else formData.append(key, value);
  }

  const response = await fetch(CREATE_FOLDER_ENDPOINT, {
    method: "POST",
    body: formData,
  }).catch((error) => {
      console.log(error);
      alert("אירעה שגיאה בשליחת הטופס. אנא נסה שנית מאוחר יותר");
    });
    if (response.status !== 200) {
      //console.log("resonse code not 200 " + JSON.stringify(response.status) + JSON.stringify(response.message));
      alert("אירעה שגיאה בשליחת הטופס. אנא נסה שנית מאוחר יותר");
    }
  console.log(response)
  return response.status;
}




export default function Step4(){
  const [show, setShow] = useState(false);
  
  const { actions, state } = useStateMachine({ updateAction });
  const { handleSubmit, register, control, setValue } = useForm({defaultValues: state.yourDetails});
  const router = useRouter();
  const [diraction, setDiraction] = useState();
  const { data: session } = useSession()


  const firstName = useWatch({control, name: "שם פרטי"});
  const lastName = useWatch({control, name: "שם משפחה"});

  const fullName = firstName && lastName ? `${firstName} ${lastName}` : ""

  useEffect(()=>{
    setValue("שם התיקייה", fullName)
    setValue("שם הטופס", fullName)
  },[fullName, setValue]);


  const onSubmit = async (data) => {

    console.log(data);
    if (diraction) {
      if(await postData(data) == 200){
        console.log("success")
        setShow(!show);
      }}
      else {
      actions.updateAction(data);
      router.push("/step3");
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
              <Toggle title={"מסמכים להשלמה"} des= {"הטפסים אשר נשארו להעלות בצירוף לטופס. ניתן להוסיף טפסים נוספים על פי הרלוונטיות. צורך ביצירת קשר עם הגורמים הרלוונטים."}></Toggle>
              <div className="row law-processes">
                <label htmlFor="file-upload-ipoi" className="like-button">
                  <span className="checkmark">יפויי כוח</span>
                </label>

                <label htmlFor="file-upload-id" className="like-button">
                  <span>תצלום ת.ז</span>
                </label>

                <label htmlFor="file-upload-os" className="like-button">
                  <span>דו&quot;ח עו&quot;ס</span>
                </label>

                <label htmlFor="file-upload-other" className="like-button">
                  <span>קובץ נוסף</span>
                </label>
              </div>

              <SelectByButtons register={register} choiceType={"checkbox"} name={"צורך ביצירת קשר עם:"}
              options={["רווחה", "סיוע משפטי", "משפחה", "מסגרת נוכחית"]} des={"על פי הנתונים הראשוניים, סמן את הגורם איתו תרצה ליצור קשר על מנת לקבל פרטים נוספים או סיוע נוסף."}></SelectByButtons>

              <Textarea register={register} text={"פרטים נוספים ביצירת קשר"}></Textarea>

              <SelectByButtons register={register} choiceType={"checkbox"} name={"משימות נוספות להמשך:"}
              options={["בקשה לביטול דוח", "פניה לייצוג משפטי"]} des={"סיכום של ההשערות להמשך הטיפול"}></SelectByButtons>

              <Textarea register={register} text={"פרטים נוספים למשימות להמשך"}></Textarea>

              <Toggle title={"סיכום הטופס בקובץ בשם:"} des={"קובץ המאגד את כל המידע שממולא בטופס יישמר בתוך בתיקיית הדרייב של הקליניקה. סיכום הטופס יישמר בקובץ גיליונות של גוגל. "}></Toggle>
              <div className = "row docsName">
                <input placeholder="שם פרטי ומשפחה" {...register("שם הטופס")} />
              </div>
    
              <Toggle title={"פתיחת תקייה בשם:"} des={"ברשותך האופציה לשנות את שם התיקייה שתפתח בדרייב."}></Toggle>
              <div className = "row docsName">
                <input placeholder="שם פרטי ומשפחה"  {...register("שם התיקייה")} />
              </div>

              <div className="row submit">
                <div className ="right">
                  <Button type="submit" onClick={() => setDiraction(false)}> 
                    <Image src="/right.png" width="89" height="20" alt="left" />
                  </Button>
                </div>
                <div className ="left">
                  <button id="send-form-button" type="submit" onClick={() => setDiraction(true)}>שלח טופס</button>
                </div>
              </div>

            </div>

          </div>
          <div className={"col-side-form " + sideFormClassAdd}>
            <SideForm register={register} control={control}/>
          </div>
        </form>
        {show? <End></End>:null}
      </div>  
    );
  }
}

  

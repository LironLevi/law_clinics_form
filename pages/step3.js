import React, { useState, useEffect} from "react";
import { useForm } from "react-hook-form";
import { useRouter} from "next/router";
import { useStateMachine } from "little-state-machine";
import updateAction from "../updateAction";
import Navbar from "../components/navbar";
import SideForm, { isOpen } from "../components/side_form";
import Textarea from "../components/textarea";
import Toggle from "../components/Toggle";
import Button from '@mui/material/ButtonBase';
import Image from "next/image";
import { useSession } from "next-auth/react"

export default function Step3() {
  const { actions, state } = useStateMachine({ updateAction });
  const { handleSubmit, register, control } = useForm({defaultValues: state.yourDetails});
  const router = useRouter();
  const { data: session } = useSession()
  const [diraction, setDiraction] = useState();

  const onSubmit = (data) => {
    console.log(data);
    actions.updateAction(data);
    if (diraction) {
      router.push("/step4");
    } else {
      router.push("/step2");
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
              <Toggle title={"רקע"} des={"מידע רלוונטי על  מצב החיים הנוכחי של המטופל/ת: הקשרים המשפחתיים, המסגרות הנוכחיות, מעורבות גורמים חיצוניים כגון משטרה, עירייה, משרד הרווחה וכדומה. ניתן להוסיף התרשמות ומחשבות על הפגישה."}></Toggle>
              <Textarea register={register} text={"פרטים נוספים לרקע"}></Textarea>
              <Toggle title={"המשך טיפול"} des={"הערות להמשך הטיפול בתיק, רעיונות כלליים, משימות להמשך וכדומה"}></Toggle>
              <Textarea register={register} text={"פרטים נוספים להמשך טיפול"}></Textarea>
          

              <div className="row submit" style={{margin: "400px 0px 0px 0px"}}>
                <div className ="right">
                  <Button type="submit" onClick={() => setDiraction(false)}> 
                    <Image src="/right.png" width="89" height="20" alt="left" />
                  </Button>
                </div>
                <div className ="left">
                  <Button type="submit" onClick={() => setDiraction(true)}> 
                    <Image src="/left.png" width="89" height="20" alt="right" />
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

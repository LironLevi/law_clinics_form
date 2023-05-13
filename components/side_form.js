import Image from "next/image";
import { useState } from "react";
import { useWatch } from "react-hook-form";

export var isOpen = false;

export default function SideForm({register, control}){

  const file_ipoi = useWatch({control, name: "קובץ יפויי כוח"});
  const file_id = useWatch({control, name: "קובץ תז"});
  const file_os = useWatch({control, name: "קובץ דוח עוס"});
  const file_other = useWatch({control, name: "קובץ נוסף"});

  const firstName = useWatch({control, name: "שם פרטי"});
  const lastName = useWatch({control, name: "שם משפחה"});
  const city = useWatch({control, name: "עיר"});
  const institution = useWatch({control, name: "מסגרת נוכחית"});

  const [rerender, setRerender] = useState(false);

  const handleClick = (e) => {
    isOpen = !isOpen;

    let col_side_forms = document.getElementsByClassName("col-side-form");
    for (let i = 0 ; i < col_side_forms.length ; i++) {
      col_side_forms[i].classList.remove(isOpen ? "col-side-form-ifclosed" : "col-side-form-ifopen");
      col_side_forms[i].classList.add(isOpen ? "col-side-form-ifopen" : "col-side-form-ifclosed");
    }

    let col_step_forms = document.getElementsByClassName("col-step-form");
    for (let i = 0 ; i < col_step_forms.length ; i++) {
      col_step_forms[i].classList.remove(isOpen ? "col-step-form-ifclosed" : "col-side-form-ifopen");
      col_step_forms[i].classList.add(isOpen ? "col-step-form-ifopen" : "col-side-form-ifclosed");
    }

    setRerender(!rerender);
    }

  if (isOpen) {
    return (
      <>
        <div className="row-logo" onClick={handleClick}>
          <Image
            alt="logo"
            src="/logoFin.png"
            width="194"
            height="68"
            priority={true}
          />
        </div>
        <div className="row-empty"></div>
        <div className="row-files">
          <div className="title-side">מסמכים</div>
          <div>
            <label htmlFor="file-upload-ipoi" className="custom-file-upload">
                <span><b style={{ fontSize: 'large' }} >+</b> יפויי כוח</span>
                <span>{ file_ipoi && file_ipoi[0] ? ` - ${file_ipoi[0].name}` : ""}</span>
            </label>
            <input className="side-content" id="file-upload-ipoi" type="file" {...register("קובץ יפויי כוח")}/>
          </div>

          <div>
            <label htmlFor="file-upload-id" className="custom-file-upload">
                <span><b style={{ fontSize: 'large' }} >+</b> תצלום ת.ז</span>
                <span>{ file_id && file_id[0] ? ` - ${file_id[0].name}` : ""}</span>
            </label>
            <input className="side-content" id="file-upload-id" type="file" {...register("קובץ תז")}/>
          </div>

          <div>
            <label htmlFor="file-upload-os" className="custom-file-upload">
              <span><b style={{ fontSize: 'large' }} >+</b> דו&quot;ח עו&quot;ס</span>
              <span>{ file_os && file_os[0] ? ` - ${file_os[0].name}` : ""}</span>
            </label>
            <input className="side-content" id="file-upload-os" type="file" {...register("קובץ דוח עוס")}/>
          </div>
        </div>

        <div className="row-other-file">
            <label htmlFor="file-upload-other" className="custom-file-upload">
              <span className="black-back">צירוף קובץ נוסף</span><b style={{fontSize: 'large' }} >+</b>
              <span>{ file_other && file_other[0] ? `${file_other[0].name}` : ""}</span>
            </label>
            <input id="file-upload-other" type="file" {...register("קובץ נוסף")}/>
        </div>

        <div className="row-comments">
            <div className="side-content title-side">הערות שוליים</div>
            <textarea className="side-content textarea-side" placeholder="כאן יש מקום לכתיבת טקסט רץ לבחירת ממלאת הטופס. ניתן לרשום הערות אשר ילוו את הטופס לאורך כל שלביו וישלחו גם הן בקובץ הסופי." {...register("הערות שוליים")} />
        </div>
        
        <div className="row-details">
          <div className="side-content">
            {firstName} {lastName}<br></br>
            {city}<br></br>
            {institution}
          </div>
        </div>
      </>
    );
  } else{ 
  return(
    <>
      <div className="row-logo-close" onClick={handleClick}>
        <Image
          alt="logo"
          src="/logoS.png"
          width="40"
          height="68"
          priority={true}
        />
      </div>
      <div className="row-empty-closed"></div>
      <div className="row-files-closed">מסמכים</div>
      <div className="row-empty-closed"></div>
      <div className="row-comments-closed">הערות שוליים</div>
    </>
)}
}

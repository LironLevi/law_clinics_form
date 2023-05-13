
import React, { useState } from "react";
import { useRouter} from "next/router";

export default function End(){

  const router = useRouter();

  const forceReload = () => {
    router.push("/");
  }

  return (
    <>
      {(
        <div className="modal">
          <div className="overlay">
            <div className = "model-background">
              <div className="modal-content">
                <div className = "model-check">
                  <h1 className="modal-title">המשימה הושלמה!</h1>
                  <button id="btn-modal" onClick={forceReload}>פתיחת פנייה חדשה +</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
    </>
  );
}
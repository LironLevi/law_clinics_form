import React from "react";
import { useRouter} from "next/router";
import Link from "next/link";
import Image from "next/image";
import StepNav from "./step_nav";

export default function Navbar() {
    const router = useRouter();
    return (
      <div className="navbar">
        <nav>
            <ul className="steps">
              <li className={router.pathname === "/step1" ? "active" : ""}>
                <StepNav num={1} discription={"פרטים טכנים"}/>
              </li>
              <li className={router.pathname === "/step2" ? "active" : ""}>
                <StepNav num={2} discription={"פרטים נוספים"}/>
              </li>
              <li className={router.pathname === "/step3" ? "active" : ""}>
                <StepNav num={3} discription={"רקע"}/>
              </li>
              <li className={router.pathname === "/step4" ? "active" : ""}>
                <StepNav num={4} discription={"סיום"}/>
              </li>
            </ul>
        </nav>
      </div>
    );
  }
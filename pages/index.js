import { useState, forEach } from 'react';
import { useRouter } from 'next/router';
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image';

import FirstPage from '../components/first_page';

export var isAuthenticated;

export default function IndexPage() {
    const { data: session } = useSession()
    const router = useRouter()
    isAuthenticated = session;
    if (session) {
        return (
            <FirstPage>
                <div className='title'>התחברות</div>
                <div>אימות בוצע</div>
                <button className="start-button" id="start-form" onClick={() => router.push("./step1")}>התחל מילוי טופס</button><br />
                <button id="logout" onClick={() => signOut()}>התנתק</button>
            </FirstPage>
        );
    } else {
        return (
            <FirstPage>
                <div className='title'>התחברות</div>
                <div>אנא בצע התחברות עם מייל הקליניקה בלבד</div>
                <button className="start-button" id="login" onClick={() => signIn("google")}>
                    <Image id="icon-login" src="/google_logo.png" width="16" height="16" alt="google" />
                    <span id="text-login">התחבר/רי באמצעות Google </span>
                </button>
            </FirstPage>
        )
}}
'use client';
import { useEffect, useState } from "react";
import Home from "@/components/HomePage";
import MyCV from "@/components/MyCV";
import LoadingUI from "@/components/LoadingUI";
import _ from 'lodash'
import { AppDataContextProvider } from "@/assets/AppDataContextProvider";

export default function DefaultPage() {

    const [redirectToHome, setRedirctToHome] = useState(true);
    const [busy, setBusy] = useState(true)
    const [authToken,setAuthToken] = useState(null)
    const [userData,setUserData] = useState(null)

    //we need to use locaStorage inside useEffect as this code does not run on server and
    //no reference error is seen
    useEffect(() => {
        const token = localStorage.getItem('auth-token')
        const usrData = localStorage.getItem('user-data')
        document.title='Loading...'

        if (_.isNull(token) && _.isNull(usrData)){
            setRedirctToHome(true)
        }
        else{
            setAuthToken(token)
            setUserData(JSON.parse(usrData))
            setRedirctToHome(false)
        }
        setBusy(false)
    }, [])

    if (busy) {
        return <LoadingUI />
    }
    else if (redirectToHome) {
        return <Home />
    }
    else
        return <MyCV userData={userData} authToken={authToken}/>
}
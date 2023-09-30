'use client';
import { useEffect, useState } from "react";
import Home from "@/components/HomePage";
import MyCV from "@/components/MyCV";
import LoadingUI from "@/components/LoadingUI";
import _ from 'lodash'



export default function DefaultPage() {

    const [authToken, setAuthToken] = useState(null);
    const [busy, setBusy] = useState(true)

    //we need to use locaStorage inside useEffect as this code does not run on server and
    //no reference error is seen
    useEffect(() => {
        const token = localStorage.getItem('auth-token')
        setAuthToken(token)
        setBusy(false)
    }, [])

    if (busy) {
        return <LoadingUI />
    }
    else if (_.isNull(authToken) || _.isEmpty(authToken)) {
        return <Home />
    }
    else
        return <MyCV />
}
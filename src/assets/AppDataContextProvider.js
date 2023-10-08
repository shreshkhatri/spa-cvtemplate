'use client'
import { useContext,createContext,useReducer } from "react"
import {reducer,ACTION_TYPES} from './Reducer'

const AppDataContext = createContext()
const AppDdataUpdateDispatchContext = createContext()

export function AppDataContextProvider ({children}){


    const [appData,appDataUpdateDispatcher] = useReducer(reducer,{})

    return (
        <AppDataContext.Provider value={appData}>
            <AppDdataUpdateDispatchContext.Provider value={appDataUpdateDispatcher}>
                {children}
            </AppDdataUpdateDispatchContext.Provider>
        </AppDataContext.Provider>
    )
}

export function useAppDataContext(){
    return useContext(AppDataContext)
}

export function useAppDataDispatchContext(){
    return useContext(AppDdataUpdateDispatchContext)
}
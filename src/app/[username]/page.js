'use client';
import { useEffect, useState } from 'react';
import { useParams,useRouter  } from 'next/navigation'
import { ENDPOINT } from '@/data/endpoints';
import LoadingUI from '@/components/LoadingUI';
import CVViewMode from '@/components/CVViewMode';
import AppTheme from '@/assets/AppTheme';

export default function Page() {

    const {username} = useParams()
    const router = useRouter()
    const [cvdataViewmode,setcvdataViewMode]= useState(null);
    const [pageLoading, setIsPageLoading] = useState(true)

    useEffect(() => {
        //parsing text form of JS object into actual object
        const usrData = JSON.parse(localStorage.getItem('user-data'))
        if (usrData && usrData.username.toLowerCase()===username.toLowerCase()){
            router.push('/')
            return;
        }
        async function fetchData() {
          const response = await fetchCVData();
          
          if (!response){
            router.push('/error')
            return;
          }
          setIsPageLoading(false)
        }
        fetchData();
      }, []);
    
      // function for getting CV data
      async function fetchCVData() {
    
        return fetch(`${ENDPOINT.VIEWCV}/${username}`, {
          method: "GET",
          redirect: 'follow',
          headers: {
            'Accept': 'application/json',
            'charset': 'UTF-8'
          }
        }).then(async (response) => {
          var json = await response.json()
          return { status: response.status, ...json }
        })
          .then(response => {
            if (response.status == 200) {
              setcvdataViewMode(response.data);
              return true;
            }
            else {
              const { error } = response;
              console.log(error);
              return false;
            }
          })
          .catch(error => {
            console.log(error);
            return false;
          });
    
    
      }
      return pageLoading ? <LoadingUI /> : <AppTheme><CVViewMode cvdata={cvdataViewmode} /></AppTheme>
}
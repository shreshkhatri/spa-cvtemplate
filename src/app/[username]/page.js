'use client';
import { useEffect, useState } from 'react';
import { useParams  } from 'next/navigation'
import { ENDPOINT } from '@/data/endpoints';
import LoadingUI from '@/components/LoadingUI';
import CVViewMode from '@/components/CVViewMode';

export default function Page() {

    const {username} = useParams()
    const [cvdataViewmode,setcvdataViewMode]= useState(null);
    const [pageLoading, setIsPageLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
          await fetchCVData();
        }
        fetchData();
      }, []);
    
      // function for getting CV data
      async function fetchCVData() {
    
        fetch(`${ENDPOINT.VIEWCV}/${username}`, {
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
              console.log(response)
              setcvdataViewMode(response.data)
              setIsPageLoading(false)
            }
            else {
              const { error } = response
              console.log(error)
              setIsPageLoading(false)
              router.push('/error')
            }
          })
          .catch(error => {
            console.log(error)
            setIsPageLoading(false)
            router.push('/error')
          });
    
    
      }
      return pageLoading ? <LoadingUI /> : <CVViewMode cvdata={cvdataViewmode} />
}
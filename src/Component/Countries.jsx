import React from "react";
import CountriesCard from "./CountriesCard";
import LoadingIndicator from "./LoadingIndicator";
import {useEffect,useState} from "react";
import Pagination from "./Pagination";

function Countries() { 
  const [data,setData]=useState([]);
  const [loading,setLoading]=useState(false);
  const [total,setTotal]=useState(null);
  const [page,setPage]=useState(1)


  const getData=async(page)=>{
    setLoading(true);
    try{
      let res=await fetch(`https://dbioz2ek0e.execute-api.ap-south-1.amazonaws.com/mockapi/get-countries?page=${page}&limit=10`)
      res=await res.json();
      setData(res.data)
      console.log(res.data)
      setTotal(res.totalPages)
      setLoading(false)
    }catch(error){
      console.log(error)
      setLoading(false)
    }
  }

  useEffect(()=>{
    getData(page)
  },[page])

  
  return loading?(<LoadingIndicator/>):(
    <div>
      <h1 data-testid="countries-header">Countries List</h1>
      <div data-testid="countries-container">
        {/* Countries Card */}
        {data.map((el)=>(
          <CountriesCard country={el.country} population={el.population}/>
        ))}
      </div>
      <div>
        {/* Pagination */}
        <Pagination current={page} onChange={(value)=>setPage(value)} total={total}/>
      </div>
    </div>
  );
}
export default Countries;

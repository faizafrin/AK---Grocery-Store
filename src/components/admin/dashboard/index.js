import React from 'react'
import './dashboard.css'
import { Container, Row } from 'react-bootstrap';
import DashItem from './DashItem';
import StockDetails from './StockDetails';
import { useEffect } from 'react';
import axios from 'axios';
import { dashboardOverview } from '../../../utils/api';
import { useState } from 'react';

function DashBoard() {

  let [overview,setOverview] = useState({})

  useEffect(()=>{
    getdashboardOverview()
  },[])

  const getdashboardOverview = async()=>{
try {
  const {data,status} = await axios.get(dashboardOverview)
  // const {bought,outOfStock,sold,totalAvaliableStock,totalProducts} = data
  if(status === 200){
    setOverview(data)
  }
} catch (error) {
  console.log(error);
}
  }
    const data = [
        {
          title: "Total Products",
        //   value: dashboardOverview.totalProducts,
        value : overview.totalProducts,  
        color: "#009A6A",

          theam: "primary",
         
        
        },
        {
          title: "Total Quantity Bought",
        //   value: dashboardOverview.bought,
        value : overview.bought,  
        color: "#68BC76",

          theam: "success",
         
        
        },
        {
          title: "Sold",
        //   value: dashboardOverview.sold,
        value : overview.sold,  
        color: "#880262",

          theam: "warning",
         
        
        },
    
        {
          title: "Out Of Stock",
        //   value: dashboardOverview.outOfStock,
        value : overview.outOfStock,  
        color: "#F16D69",

          theam: "info",
         
        
        },
        {
          title: "Available Stock",
        //   value: dashboardOverview.totalAvaliableStock,
        value : overview.totalAvaliableStock,  
        color: "#B266F8",

          theam: "warning",
         
        
        },
    
      ];

  return (
   <>
   <Container className='dashboard'>
        <Row className="pt-5">
          {data.length > 0 && data.map((val, i) => {
            return <DashItem value={val} key={i}></DashItem>;
          })}
        </Row>
        <div>
          <StockDetails/>
        </div>
   </Container>
   </>
  )
}

export default DashBoard
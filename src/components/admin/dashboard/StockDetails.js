import React from 'react'
import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import { useEffect } from 'react';
import {getDashboardProduct } from '../../../redux/slice/admin/AdminProductReducer';
import { useDispatch, useSelector } from 'react-redux';
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';



function StockDetails() {
    const [stock,setStock] = useState("");
    const [product,setProduct] = useState("");
    const dispatch = useDispatch();
    const dashboardProduct = useSelector((state)=> state.adminProductReducer.dashboardProduct)

      useEffect(()=>{
        dispatch(getDashboardProduct({
            product,
          stock,
        })) 
       },[stock,product])
    return (
        <div className="mx-auto mt-5 ">
            <div className="mt-3 stockdetails">
                        <div className='search'>

                        <ButtonToolbar
        className="justify-content-between"
        aria-label="Toolbar with Button groups"
      >
        <InputGroup>
          <InputGroup.Text id="btnGroupAddon2">Search</InputGroup.Text>
          <Form.Control
          type="search"
          placeholder={`Search stock`}
          value={stock}
           onChange={(e) => {setStock(e.target.value);setProduct("")}}
            aria-label="Input group example"
            aria-describedby="btnGroupAddon2"
            className='shadow-none'
          />
        </InputGroup>
      </ButtonToolbar>
  
      <ButtonToolbar
        className="justify-content-between"
        aria-label="Toolbar with Button groups"
      >
      <InputGroup>
          <InputGroup.Text id="btnGroupAddon2">Search</InputGroup.Text>
          <Form.Control
          type="search"
          placeholder={`Search product`}
          value={product}
           onChange={(e) => {setProduct(e.target.value)}}
            aria-label="Input group example"
            aria-describedby="btnGroupAddon2"
            className='shadow-none'
          />
        </InputGroup>
      </ButtonToolbar>
</div>
                <div className="mt-3 table-responsive">
                

<Table  bordered  className='text-center'>
      <thead>
      <tr>
                                <th scope="col">#</th>
                                <th className= "cell-max"  scope="col">Product Name</th>
                                <th className='cell-max1' scope="col">Bought</th>
                                <th  className='cell-max1'scope="col">Sold</th>
                                <th  className= "cell-max" scope="col">Available in Stock</th>
                            </tr>
      </thead>
      <tbody>
      {
                                dashboardProduct.length > 0 && dashboardProduct.map((item, index) => {
                                    return <tr key={index}>
                                        <td >{index + 1}</td>
                                        <td>{item.product}</td>
                                        <td>{item.bought}</td>
                                        <td>{item.sold}</td>
                                        {
                                            item.availableInStock === 0 ? <td style={{color : "red"}}>Out of stock</td> : <td>{item.availableInStock}</td>
                                        }
                                        
                                    </tr>
                                })
                            }
      </tbody>
    </Table>
                </div>
            </div>
        </div>
    )
}

export default StockDetails
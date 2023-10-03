import axios from 'axios';
import React,{ useEffect,useState }  from 'react'
import { useParams } from 'react-router-dom';
import { profileDetails, yourOrder } from '../../../utils/api';
import {Currency} from '../../Currency';
import Spinner from '../../Spinner';
import Toast from '../../toast';

function OrderDetails() {
    const [data,setData] = useState([]);
    const [address,setAddress] = useState([])
    const [loading, setLoading] = useState({
      profile : false,
      order : false
    });
  const [order, setOrder] = useState([]);
    const {id} = useParams();
  const getYourOrders = async () => {
    try {
      setLoading({...loading, order : true});
      const { data, status } = await axios.get(`${yourOrder}/${id}`);
     
      if (status === 200) {
        setOrder(data.data);
        setLoading({...loading, order : false});
      } else {
        setLoading({...loading, order : false});
        Toast.fire({
          icon: "warning",
          title: data.message,
        });
      }
    } catch (error) {
      setLoading({...loading, order : false});
      Toast.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  };

const getProfile = async()=>{
  
try {
  setLoading({...loading, profile : true});
  const { data  } = await axios.get(`${profileDetails}/${id}`); 
  setAddress(data.address)
  setData(data);
  setLoading({...loading, profile : false});

} catch (error) {
  setLoading({...loading, profile : false}); 
  Toast.fire({
    icon: "error",
    title: error.response.data.message,
  });
}
}

  useEffect(()=>{
    getYourOrders();
    getProfile()
},[id])


  return (
    <div>
       
        <div className="your-orders">
        <div>
        {
        loading.profile ? <div className='d-flex justify-content-center'> <Spinner width={"1.5rem"}  />  </div>: 
        
        <>
        <div className="signup-profile-pic__container">
        <img src={data.image} alt={data.name} className="signup-profile-pic" /> 
 </div>

        <div className='text-center mt-5'>
         <h5> Name : {data.name} </h5>
          <h5>
          Mobile : {data.mobile === undefined ? "Mobile number is not found" : data.mobile}
          </h5>
        </div>
          <h5 className='text-center'>Address</h5>
          <div className='d-flex gap-3 justify-content-center align-align-items-center'>
              {
            address.length === 0 ? <div className='d-flex justify-content-center'> No address found </div> : <>
            
            {
             address && address.map(({firstName,lastName,address,city,state,country,pinCode,mobile},index)=>{
              return  <address key={index} >
              {firstName} {lastName}, {address}, <br />
               {city} {state} {country}, <br/>
               Pincode : {pinCode} <br />
               Mobile : {mobile} <br />
             </address>
          })
           }
            </>
          }
          
          
          

          </div>
         </>
        }
          
        </div>
      <h5>My orders</h5>
      {
        loading.order ? <div className='d-flex justify-content-center'> <Spinner width={"1.5rem"}  />  </div>:       order.length === 0 && order ? <div className='d-flex justify-content-center'> No order found </div> : order.length > 0 &&
        order.map(
          (
            {
              _id,
              orderDate,
              orderItems,
              paymentId,
              paymentMode,
              amount,
              isdelivery,
              deliveryTime,
            },
            index
          ) => {
            return (
              <div key={index} className="your-order">
                <div className="d-flex gap-3 justify-content-center mb-3 aa">
                  <div className="d-flex gap-1">
                    <span>Order Id : </span> <span className="cc">{_id}</span>
                  </div>
                  <div className="d-flex gap-1">
                    <span>Order placed : </span> <span>{orderDate}</span>
                  </div>
                </div>
                {orderItems.length > 0 &&
                  orderItems.map(
                    (
                      {
                        image,
                        product,
                        category,
                        quantity,
                        amount,
                        unit,
                        dummyTotal,
                      },
                      i
                    ) => {
                      return (
                        <div
                          className="d-flex justify-content-around align-items-center mb-4 ee"
                          key={i}
                        >
                          <div className="d-flex gap-3 align-items-center">
                            <img
                              src={image}
                              alt={product}
                              style={{ width: "6.5rem" }}
                            />
                            <div className="mm">
                              <h6>{product}</h6>
                              <p>{category}</p>
                              <div className="d-flex gap-1">
                                <p>
                                  Qty : {quantity}/{unit}
                                </p>
                                <p>
                                  <Currency width={"1.3rem"} />
                                  {amount * quantity}
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="ll">
                            {isdelivery ? (
                              <div className="d-flex gap-2 align-items-center">
                                <span
                                  style={{
                                    fontSize: "1.3rem",
                                  }}
                                >
                                  Status
                                </span>{" "}
                                :{" "}
                                <span
                                  style={{
                                    color: "green",
                                    fontSize: "1.2rem",
                                  }}
                                >
                                  Delivered
                                </span>
                              </div>
                            ) : (
                              <div className="d-flex gap-2 align-items-center">
                                <span
                                  style={{
                                    fontSize: "1.3rem",
                                  }}
                                >
                                  Status
                                </span>{" "}
                                :{" "}
                                <span
                                  style={{
                                    color: "red",
                                    fontSize: "1.2rem",
                                  }}
                                >
                                  On the way
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="dd">
                            {isdelivery ? (
                              <div className="d-flex gap-2 align-items-center">
                                <span
                                  style={{
                                    fontSize: "1.1rem",
                                  }}
                                >
                                  Delivered date
                                </span>{" "}
                                :{" "}
                                <span
                                  style={{
                                    color: "green",
                                    fontSize: "1.1rem",
                                  }}
                                >
                                  {deliveryTime}
                                </span>
                              </div>
                            ) : (
                              <div className="d-flex gap-2 align-items-center">
                                <span
                                  style={{
                                    fontSize: "1.1rem",
                                  }}
                                >
                                  Estimate date
                                </span>{" "}
                                :{" "}
                                <span
                                  style={{
                                    color: "red",
                                    fontSize: "1.1rem",
                                  }}
                                >
                                  {deliveryTime}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    }
                  )}
                <div className="d-flex gap-3 justify-content-around payment aa">
                  <div>
                    <p>Payment mode : {paymentMode}</p>
                    <p>
                      {paymentMode === "online payment" ? (
                        <>Payment id : {paymentId}</>
                      ) : null}
                    </p>
                  </div>
                  <div>
                    <p>
                      Amount : <Currency width={"1.1rem"} />
                      {amount}
                    </p>
                  </div>
                </div>
              </div>
            );
          }
        )
      }

      
    </div>
    </div>
  )
}

export default OrderDetails
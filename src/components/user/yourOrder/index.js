import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import {yourOrder} from "../../../utils/api";
import Toast from "../../toast";
import "./yourOrder.css";
import {Currency} from "../../Currency";
import Spinner from '../../Spinner';

function YourOrder() {
  const [loading, setLoading] = useState(false);
  const [order, setOrder] = useState([]);
  let StatusUserId = useSelector((state) => state.statusReducer.id);
  let userId = StatusUserId || window.localStorage.getItem("id");
  const getYourOrders = async () => {
    try {
      setLoading(true);
      const { data, status } = await axios.get(`${yourOrder}/${userId}`);
      setLoading(false);
      if (status === 200) {
        setOrder(data.data);
      } else {
        Toast.fire({
          icon: "warning",
          title: data.message,
        });
      }
    } catch (error) {
      setLoading(false);
      Toast.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
  };

  useEffect(() => {
    getYourOrders();
  }, []);

  return (
    <div className="your-orders">
      <h5>My orders</h5>

{
  loading ? <div className="d-flex justify-content-center"><Spinner  width={"2rem"}/></div> : 
  
  
    order.length === 0 ? <div className="d-flex justify-content-center text-danger">Order not found</div> : order.length > 0 &&
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
                    dummyQuantity,
                    amount,
                    unit,
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
                              Qty : {dummyQuantity}/{unit}
                            </p>
                            <p>
                              <Currency width={"1.3rem"} />
                              {amount * dummyQuantity}
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
  );
}

export default YourOrder;

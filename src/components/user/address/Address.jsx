import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { getAddress } from '../../../redux/slice/statusReducer';
import AddAddress from './AddAddress';
import EditAddress from './EditAddress';
import './address.css'
import { addOrder, deleteAddressApi, tokenChecker } from '../../../utils/api';
import axios from 'axios';
import Swal from 'sweetalert2';
import Toast from '../../toast';
import { useNavigate, useParams } from 'react-router-dom';
import Spinner from '../../Spinner';
import { getProduct } from '../../../redux/slice/user/productReducer';


function Address() {
    const [addShow, setAddShow] = useState(false);
    const [editShow, setEditShow] = useState(false);
    const [data, setData] = useState({});
    const [loading , setLoading] = useState(false)
    const [products, setProducts] = useState([]);
    const [amount, setAmount] = useState(0);
    const [paymentType, setPaymentType] = useState("")
    const [SlectedAddress, setSelectedAddress] = useState({});
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { which } = useParams();
    let cartItems = useSelector((state)=>state.cartReducer.cart)
    let buyNowItems = useSelector((state)=>state.cartReducer.buyNow)
    let totals = useSelector((state)=>state.cartReducer.total)
    let userId = useSelector((state) => state.statusReducer.id);
    let address = useSelector((state) => state.statusReducer.address);
    let win = window.localStorage.getItem("id")
    let statusName = useSelector((state) => state.statusReducer.name);
    let name = window.localStorage.getItem("name") || statusName;
    let statusEmail = useSelector((state) => state.statusReducer.email);
    let email = window.localStorage.getItem("email") || statusEmail;
    let statusMobile = useSelector((state) => state.statusReducer.mobile);
    let mobile = window.localStorage.getItem("mobile") || statusMobile;
    const addHandleClose = () => setAddShow(false);
    const addHandleShow = () => setAddShow(true);
    const editHandleClose = () => setEditShow(false);
    const editHandleShow = () => setEditShow(true);


useEffect(()=>{
  dispatch(getAddress(userId))
  getUpdate()
},[])

const getUpdate = ()=>{
  if(which === "buyItems"){
    setProducts([buyNowItems])
    setAmount(buyNowItems.dummyTotal)
  }else{
    setProducts(cartItems)
    setAmount(totals)
  }
}

// useEffect(()=>{
// if(products.length === 0){
//     navigate('/product')
//   }
// },[products])
  // Delete the category
  const handeleDelete = async (UserId,id) => {
    // sweet alert for delete
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-success",
        cancelButton: "btn btn-danger",
      },
      buttonsStyling: true,
    });
    let swal = await swalWithBootstrapButtons.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, cancel!",
      reverseButtons: true,
      focusConfirm: false,
      focusCancel: false,
    });
    if (swal.isConfirmed) {
      try {
        const value = await axios.delete(`${deleteAddressApi}/${UserId}/${id}`, {
          headers: {
            authorization: window.localStorage.getItem("token")
          }})
        if (value.status === 200) {
          dispatch(getAddress(userId))
          swalWithBootstrapButtons.fire({
            title: "Deleted!",
            text: `${value.data.message}`,
            icon: "success",
            showConfirmButton: false,
            timer: 1300,
          });
        } else {
          swalWithBootstrapButtons.fire({
            title: "",
            text: `${value.response.data.message}`,
            icon: "warning",
            focusConfirm: false,
          });
        }
      } catch (error) {
        console.log(error);
        swalWithBootstrapButtons.fire({
          title: "",
          text: `${error.response.data.message}`,
          icon: "error",
          focusConfirm: false,
        });
      }
    }
  };

  const pay = async()=>{
try {

  const token = axios.get(tokenChecker,{
    headers: {
      authorization: window.localStorage.getItem("token")
    }});

  if(Object.keys(SlectedAddress).length > 0){
  if(paymentType){
    if(products.length > 0){
      if(paymentType === "online payment"){
        
       alert(`
       Card : 4111 1111 1111 1111
       Expire date : 11/28
       Cvv : 123
       `)
  let {status} = await token;
  if(status === 200){
    razorpay()
  }

  
      
      }else{
        let {status} = await token;
  if(status === 200){
    setLoading(true)
    placeOrder()
  }

      }
     
    
    }else{
      Toast.fire({
        icon: "warning",
        title: "select minimum one product",
      });
    }
  }else{
      Toast.fire({
        icon: "warning",
        title: "select payment type",
      });
  }
  
  }else{
    Toast.fire({
      icon: "warning",
      title: "select address",
    });
  }
} catch (error) {
  setLoading(false)
  Toast.fire({
    icon: "error",
    title: error.response.data.message,
  });
}
  }

  const razorpay = () => {
    var options = {
      key: "rzp_test_kgUEwHuOQmpNz6",
      key_secret: "UFEaoGwrbwHdSxQ0ph2J9TwU",
      amount: parseInt(amount) * 100,
      currency: "INR",
      name: "Grocery store",
      description: "for testing purpose",
      handler: function (response) {
        setLoading(true)
        placeOrder(response.razorpay_payment_id)
      },
      prefill: {
        name: name,
        email: email,
        contact: mobile
      },
      notes: {
        address: "Razorpay Corporate office"
      },
      theme: {
        color: "#3399cc"
      }
    };
    var pay = new window.Razorpay(options);
    pay.open();

  }


  const placeOrder = async(paymentId)=>{
    try {

      const obj = {
        paymentId : paymentId || "",
        userId : win || userId,
        address : SlectedAddress,
        orderItems : products,
        amount,
        paymentMode : paymentType,
      }
    
       const data = await axios.post(addOrder,obj, {
        headers: {
          authorization: window.localStorage.getItem("token")
        }});

      if(data.status === 201){
        dispatch(getProduct({
          category : "", 
          search : ""
        }))
     setTimeout(()=>{
      setLoading(false)
      navigate("/orderSuccess")
     },1000)

    } else {
      setLoading(false)
      Toast.fire({
        icon: "warning",
        title: data.data.message,
      });
    }
    } catch (error) {
      setLoading(false)
      Toast.fire({
        icon: "error",
        title: error.response.data.message,
      });
    }
   
  }
  return (
    <Container className='p-0 m-0 place-order'>
        
        <Row className='place-order'>
            <Col md= {6} lg={7} className="left-placeOrder">
            <h5>Select delivery address</h5>
<div className='d-flex justify-content-evenly align-items-center gap-3 mainAddress'>
<div>
           <Button variant="secondary" onClick={addHandleShow} style={{minWidth:"180px"}}>
           <i class="fa-solid fa-plus"></i> Add address
        </Button>
           </div>
   <div className='address'>
   {
        address.length > 0 && address.map(({firstName, lastName, address, city, state, country, pinCode, mobile, id},index)=>{
          return  <Form.Check
          key={index}   
          label={<address>
           {firstName} {lastName}, {address}, <br />
            {city} {state} {country}, <br/>
            Pincode : {pinCode} <br />
            Mobile : {mobile} <br />
            <i class="fas fa-edit me-2 address-icon" onClick={()=> {editHandleShow();setData({firstName, lastName, address, city, state, country, pinCode, mobile, id})}}></i>
            <i class="fa fa-trash address-icon" aria-hidden="true" onClick={(()=> handeleDelete(userId || win,id))}></i>
          </address>}
          type={"radio"}
          name = "address"
           className='shadow-none'
           onChange={()=> setSelectedAddress({firstName, lastName, address, city, state, country, pinCode, mobile, id})}
        />
        })
       }
   </div>
</div>
               
            </Col>
            <Col md= {6} lg={5} className="right-placeOrder">
            <h5>Payment mode</h5>
            <Form.Select
                aria-label="Default select example"
                name="country"
                value={paymentType}
                onChange={(e)=>setPaymentType(e.target.value)}

                className="shadow-none"
              >
                <option>Select payment</option>
                <option value="offline payment">Offline payment</option>
                <option value="online payment">Online payment</option>
              </Form.Select>
            <h5 className='mt-3'>Order summary</h5>
            <hr />
   <div className='lll'>
   {
                products.length > 0 && products.map((item,index)=>{
                    return <div key={index} className = 'www'>
                    <div  className = "d-flex justify-content-between align-items-center">
                         <div className=' d-flex align-items-center gap-3 '>
                         <div>
                          <img src={item.image} alt={item.product} className = "placeOrder-image" />
                          </div>
                          <div>
                            <h6>{item.product}</h6>
                            <p>Qty : - {`  `}{item.dummyQuantity}{" "}{item.unit} </p>
                          </div>
                         </div>
                          <div>
                            <h6>Amount : - Rs : {item.dummyTotal}</h6>
                          </div>
                    </div>
                    <hr />
                    </div>
                })
            }
   </div>
            <div className='text-end dd'> 
                <h6>Delivery : - RS : 0 </h6>
                <h5>Total :- RS : { amount }</h5>
            </div>
            <Button variant="secondary" className='w-100 mt-2 placeOrderButton' onClick={loading ? null :  pay}>
             {loading ? <Spinner width={'1rem'}/> : <><i class="fa-solid fa-bucket"></i> Place order</>}
        </Button>
       {/* <div className='razorpay'>
       <a href="https://razorpay.com/" target="_blank"> <img referrerpolicy="origin"
        src = "https://badges.razorpay.com/badge-dark.png "
        
     
        
        alt = "Razorpay | Payment Gateway | Neobank"/></a>
       </div> */}
            </Col>
        </Row>
        <AddAddress  handleClose={addHandleClose}
        handleShow={addHandleShow}
        show={addShow}/>
         <EditAddress  handleClose={editHandleClose}
        handleShow={editHandleShow}
        show={editShow}
        data = {data}
        />
    </Container>
  )
}

export default Address
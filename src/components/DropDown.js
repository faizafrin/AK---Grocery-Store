import React, { useEffect,useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch,useSelector } from 'react-redux';
import { getCategory } from '../redux/slice/admin/categoryReducer';


function DropDown() {
  // const [category,setCategory] = useState("");
  // const categorys = useSelector((state) => state.categoryReducer.category);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getCategory());
  // }, []);


  return (
    <>
      <Form.Select
        aria-label="Default select example"

        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="shadow-none text-center"
        style={{
          width: "250px"
        }}
      >
        <option value="all">All</option>
        {categorys.length > 0 &&
          categorys.map((item, index) => {
            return (
              <option value={item.category} key={index}>
                {item.category}
              </option>
            );
          })}
      </Form.Select>
    </>
  )
}

export default DropDown
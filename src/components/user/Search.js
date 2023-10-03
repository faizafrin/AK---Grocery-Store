import React from 'react'
import ButtonToolbar from 'react-bootstrap/ButtonToolbar';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch } from 'react-redux';
function Search({ fun, lable }) {
  const dispatch = useDispatch();
  return (
    <>
          <ButtonToolbar
        className="justify-content-between"
        aria-label="Toolbar with Button groups"
      >
        <InputGroup>
          <InputGroup.Text id="btnGroupAddon2">Search</InputGroup.Text>
          <Form.Control
          type="search"
          placeholder={`${lable}`}
           onChange={(e) => dispatch(fun(e.target.value))}
            aria-label="Input group example"
            aria-describedby="btnGroupAddon2"
            className='shadow-none'
          />
        </InputGroup>
      </ButtonToolbar>
    </>
  )
}

export default Search
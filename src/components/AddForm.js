import React, { useRef } from 'react';
import { postBooks } from '../store/bookSlice';
import { useDispatch } from 'react-redux';

const Addform = () => {
  const dispatch = useDispatch()

  const titleRef = useRef(null)
  const priceRef = useRef(null)
  const descRef = useRef(null)

  const handelPost = (event)=>{
    event.preventDefault()
    
    const data = {
      title: titleRef.current.value,
      price: priceRef.current.value,
      desc: descRef.current.value,
      
    };
    dispatch(postBooks(data))
    titleRef.current.value = null
    priceRef.current.value = null
    descRef.current.value = null
  }
  return (
    <div className='row'>
      <div className='col-6 offset-3 mt-3'>
        <h2>Insert Book</h2>
        <form onSubmit={handelPost}>
          <div className='form-group'>
            <label htmlFor='title'>Title</label>
            <input type='text' className='form-control' id='title' required  ref={titleRef}/>
          </div>
          <div className='form-group'>
            <label htmlFor='price'>Price</label>
            <input type='number' className='form-control' id='price' required ref={priceRef}/>
          </div>
          <div className='form-group'>
            <label htmlFor='Description'>Description</label>
            <textarea
              className='form-control'
              id='Description'
              rows='3'
              required ref={descRef}
            ></textarea>
          </div>
          <button type='submit' className='btn btn-primary'>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addform;

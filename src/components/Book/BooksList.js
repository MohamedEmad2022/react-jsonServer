import React from 'react';
import { deleteBooks } from '../../store/bookSlice';
import { useDispatch } from 'react-redux';

const BooksList = ({books, isLodding}) => {
  const dispatch = useDispatch();

  const delHandele = (id)=>{
    dispatch(deleteBooks(id))
  }

  const book = isLodding ? "" : books.map((item)=>{
    return(
      <ul className='list-group' key={item.id}>
        <li className='list-group-item d-flex  justify-content-between align-items-center'>
          <div>{item.title}</div>
          <div className='btn-group' role='group'>
            <button type='button' className='btn btn-primary'>
              Read
            </button>
            <button type='button' className='btn btn-danger' onClick={()=> delHandele(item.id)}>
              Delete
            </button>
          </div>
        </li>
      </ul>
    )
  })
  return (
    <div>
      <h2>Books List</h2>
      {book}
    </div>
  );
};

export default BooksList;

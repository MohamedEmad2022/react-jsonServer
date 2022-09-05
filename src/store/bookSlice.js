import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getBooks = createAsyncThunk("book/getBooks", async (_, thunkAPI)=>{

    try{
        const res = await fetch('http://localhost:3006/books');
        const data = await res.json();
        return data
    } catch(error){
        console.log(error)
    }
});

//insert books
export const postBooks = createAsyncThunk("book/postBooks", async (bookData, thunkAPI)=>{

    try{
        const res = await fetch('http://localhost:3006/books',{
            method: "POST",
            body: JSON.stringify(bookData),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });
        const data = await res.json();
        return data
    } catch(error){
        console.log(error)
    }
})

//deleteBook
export const deleteBooks = createAsyncThunk("book/deleteBooks", async (id, thunkAPI)=>{

    try{
        await fetch(`http://localhost:3006/books/${id}`,{
            method: "DELETE",
            
        });
        
        return id;
    } catch(error){
        console.log(error)
    }
})


const bookSlice = createSlice({
    name: "book",
    initialState: {books: null, isLodding: true},
    extraReducers: {
        //get data
        [getBooks.pending]:(state, action)=>{
            state.isLodding = true;
        },
        [getBooks.fulfilled]:(state, action)=>{
            state.isLodding = false;
            state.books = action.payload
            
        },
        [getBooks.rejected]:(state, action)=>{
            state.isLodding = false;
        },

        //insert books

        [postBooks.pending]:(state, action)=>{
            state.isLodding = true;
        },
        [postBooks.fulfilled]:(state, action)=>{
            state.isLodding = false;
            state.books.push(action.payload);
            
        },
        [postBooks.rejected]:(state, action)=>{
            state.isLodding = false;
        },

        //deleteBook
        [deleteBooks.pending]:(state, action)=>{
            state.isLodding = true;
        },
        [deleteBooks.fulfilled]:(state, action)=>{
            state.isLodding = false;
            state.books = state.books.filter((el)=>{
                return el.id !== action.payload
            })
            
        },
        [deleteBooks.rejected]:(state, action)=>{
            state.isLodding = false;
        },
    }
})



export default bookSlice.reducer
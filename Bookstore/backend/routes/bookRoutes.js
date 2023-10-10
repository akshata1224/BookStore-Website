import express  from "express";
import { Book } from "../models/booksmodels.js";

const router = express.Router();

//route to get all books
router.get('/', async(req, res)=> {
    try{
        const book = await Book.find({});
        return res.status(200).json({
            length : book.length,
            message: book
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({message:'connot get books'})
    }
})
//router to search book
router.get('/search',async function(request,response){
    const   query  = request.query.query;
    console.log(request.query.query);
    try{
        const books = await Book.find({
            $or: [
              { title: { $regex: query, $options: 'i' } }, // Case-insensitive title search
              { author: { $regex: query, $options: 'i' } },
            //   {publicationYear : { $regex: parseInt(query), $options: 'i' }} // Case-insensitive author search
            ],
          });
        
        console.log(books.length)
            return    response.status(200).json(books)
    } catch(err){
        console.log('getiing error')
        // console.log(err)
        // throw err;
    }

});
//route to get 1 book by id
router.get('/:id', async(req, res) =>{
    try{
        console.log('why here')
        const { query } = req.params;
        console.log(query)
        //const book = await Book.findById(id);
        const book = await Book.findAll({where:{title: {$iLike: `%${query}%`}}})
        return res.status(201).json(book)
    }catch(error){
        return res.status(500).json({message:'Cannot retrive book'})
    }
})
//route to update book
router.put('/:id', async(request, response)=>{
    try{
        if(
            !request.body.title ||
            !request.body.author ||
            !request.body.publicationYear
        ){
            return response.status(400).json({
                message : 'Send all required fields'
            })
        }
        const {id} = request.params;
        const book = await Book.findByIdAndUpdate(id, request.body);
        return res.status(200).send({message: 'Book updated Successfully!'})
    }catch(error){
        response.status(500).send({message: error.message});
    }
})
//delete a book
router.delete('/:id', async(req, res) => {
    try{
        const {id} = req.params;
        const deletedBook=await Book.findOneAndDelete({'_id':id}).exec();
        if(!deletedBook){
            return res.status(500).json({message: 'Book not found'})
        }
        return res.status(200).send({message: 'Book delete successfuly'})
    }catch(error){
        return res.status(500).send({message: error.message})
    }
})
//save Book
router.post('/', async(request, response)=> {
    try{
        if(
            !request.body
        ){
            console.log(request.body)
            return  response.status(401).json({message: 'connot connect'})
        }
        
        console.log(request.body);
        const newBook = {
            title : request.body.title ,
            author : request.body.author,
            publicationYear : parseInt (request.body.publicationYear),
            isbn : request.body.isbn,
            description : request.body.description
            
        }
        console.log('before');
        const book = await Book.create(newBook)
        console.log('after');
        return response.status(201).send(book);
    }catch(error){
        console.log('log error')
        //console.log(error)
        response.status(500).send({message: error.message});
    }
})


export default router;
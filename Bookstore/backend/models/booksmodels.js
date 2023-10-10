
import mongoose from "mongoose";
const Schema = mongoose.Schema;
const bookschema = new Schema(
    {
        title:{
            type: String,
        },
        author : {
            type : String,
        },
        publicationYear : {
            type: Number,
        },
        isbn : {
            type : String,
        },
        description : {
            type : String,
        },
    },
    {
        timestamps : true
    }
);


export const Book = mongoose.model('Book', bookschema)
import { Book } from "../db/models/book.js"


export const findBookByTitleAndAuthor = async (title, author) => {
    return Book.findOne({where: {title, author}});
};

export const registerBook = async (bookDetails) => {
    return Book.create(bookDetails);
};
export const findBookByFeild = async (feild) => {
    console.log(feild);
    
    return Book.findAll({where: feild});
};

export const findAllBooks = async () => {
    return await Book.findAll();
};
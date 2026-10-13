import {
  findAllBooks,
  findBookByFeild,
  findBookByTitleAndAuthor,
  registerBook,
} from "../repositories/book.repositories.js";
import { registerBookSchema } from "../validators/books.js";

export const registerBooksController = async (req, res) => {
  try {
    const { error, value } = registerBookSchema.validate(req.body);

    if (error) return res.status(400).json({ error: error.message });

    const { title, author, genre } = value;

    const bookExists = await findBookByTitleAndAuthor(title, author);

    if (bookExists)
      return res.status(400).json({
        error: "Book already exists",
      });

    const registeredBook = await registerBook(value);

    return res.status(201).json({
      message: "Book registered successfully",
      registeredBook,
    });
  } catch (error) {
    console.log(`Error registering book. Error: ${error}`);

    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getAllBooksController = async (req, res) => {
  try {
    let books;
    const { genre, author, title } = req.query;

    if (genre) {
      books = await findBookByFeild({genre: genre});

      if (books.length === 0) {
        return res.status(404).json({
          error: `No books found in genre: ${genre}`,
        });
      }

      return res.status(200).json({
        message: `${genre} books retreived successfully`,
        books,
      });
    } else if (author) {
      books = await findBookByFeild({author: author});

      if (books.length === 0) {
        return res.status(404).json({
          error: `No books found by author: ${author}`,
        });
      }

      return res.status(200).json({
        message: `${author} books retrieved successfully`,
        books,
      });
    } else if (title) {
      books = await findBookByFeild({title: title});

      if (books.length === 0) {
        return res.status(404).json({
          error: `No books found with title: ${title}`,
        });
      }

      return res.status(200).json({
        message: `${title} books retrieved successfully`,
        books,
      });
    }

    books = await findAllBooks();

    if (books.length === 0) {
      return res.status(404).json({
        error: `No books found in genre: ${title}`,
      });
    }

    return res.status(200).json({
      message: `All books retrieved successfully`,
      books,
    });
  } catch (error) {
    console.log(`Error getting all books. Error: ${error}`);

    return res.status(500).json({ error: "Internal server error" });
  }
};

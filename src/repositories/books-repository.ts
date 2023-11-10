import { Book, CreateBook } from "../protocols/book";
import { CreateReview } from "../protocols/review";
import prisma from "../database";

export async function getBooks() {
  const books = await prisma.books.findMany();
  return books;
}

export async function getBook(id: number) {
  const book = await prisma.books.findUnique({
    where: { id },
  });
  return book;
}

export async function createBook(book: CreateBook) {
  const date = new Date(book.purchaseDate);
  const CreatedBook = await prisma.books.create({
    data: { ...book, purchaseDate: date },
  });
  return createBook;
}

export async function reviewBook(bookReview: CreateReview) {
  const { bookId, grade, review } = bookReview;

  await prisma.books.update({
    where: { id: bookId },
    data: { grade, review, read: true },
  });
}

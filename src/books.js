function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  const borrowedBooks = books.filter(book => book.borrows[0].returned === false);
  const returnedBooks = books.filter(book => book.borrows[0].returned === true);
  return [borrowedBooks, returnedBooks];
}

function getBorrowersForBook(book, accounts) {
  const borrowBookList = book.borrows;
  const borrowers = [];
  let count = 0;

  for (const borrowIndex in borrowBookList) {
    const borrow = borrowBookList[borrowIndex];
    const account = accounts.find(account => account.id === borrow.id);
    borrowers.push({ ...borrow, ...account });
    count++;
    if (count === 10) {
      break;
    }
  }

  return borrowers;
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};

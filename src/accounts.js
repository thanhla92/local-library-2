function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  return accounts.sort((accountA, accountB) => {
    const lastA = accountA.name.last;
    const lastB = accountB.name.last;
    
    return lastA > lastB ? 1 : -1;
  })
}

function getTotalNumberOfBorrows(account, books) {
  const accountId = account.id;
  let totalBooksBorrowed = 0;
  
  books.forEach((book) => {
    totalBooksBorrowed += book.borrows.filter((borrow) => borrow.id === accountId).length;
  });
  return totalBooksBorrowed;
}


function getBooksPossessedByAccount(account, books, authors) {
  const accountId = account.id;
  
  return books.filter((book) => {
    const { id, borrows } = book;
    const recentBorrow = borrows[0];

    return recentBorrow.id === accountId && !recentBorrow.returned;
  }).map((book) => {
    const author = authors.find((author) => author.id === book.authorId);
    return { ...book, author };
  });
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};

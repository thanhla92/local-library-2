function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let totalBorrowedCount = 0;

  books.forEach(book => {
    const borrowArray = book.borrows;
    const borrowedRecords = borrowArray.filter(borrow => borrow.returned === false);
    totalBorrowedCount += borrowedRecords.length;
  });

  return totalBorrowedCount;
}

function getMostCommonGenres(books) {
  const genreCount = {};

  books.forEach(book => {
    const genre = book.genre;
    genreCount[genre] = (genreCount[genre] || 0) + 1;
  });

  const mostCommonGenres = [];

  Object.keys(genreCount).forEach(genre => {
    mostCommonGenres.push({ name: genre, count: genreCount[genre] });
  });

  mostCommonGenres.sort((a, b) => b.count - a.count);

  if (mostCommonGenres.length > 5) {
    mostCommonGenres.length = 5;
  }

  return mostCommonGenres;
}

function getMostPopularBooks(books) {
  const popularBooks = [];

  books.forEach(book => {
    const { title, borrows } = book;
    const borrowCount = borrows.length;
    popularBooks.push({ name: title, count: borrowCount });
  });

  popularBooks.sort((a, b) => b.count - a.count);

  const topFiveBooks = [];
  let count = 0;
  for (const book of popularBooks) {
    topFiveBooks.push(book);
    count++;
    if (count === 5) {
      break;
    }
  }

  return topFiveBooks;
}

// Helper function to get author's name by Id
function getAuthorNameById(id, authors) {
    const authorObj = authors.find((author) => author.id === id);
    return `${authorObj.name.first} ${authorObj.name.last}`;
}

function getMostPopularAuthors(books, authors) {
    const authorPopularity = books.reduce((acc, book) => {
        const authorName = getAuthorNameById(book.authorId, authors);
        acc[authorName] ? acc[authorName] += book.borrows.length : acc[authorName] = book.borrows.length;
        return acc;
    }, {});

    let sortedAuthors = Object.keys(authorPopularity).map(name => ({
        name: name,
        count: authorPopularity[name]
    })).sort((a, b) => b.count - a.count);

    return sortedAuthors.filter((author, index) => index < 5);
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};

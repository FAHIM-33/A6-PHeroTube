
books = [
    { title: "C", author: "Bjarne" , shit: {author: 'fahim', age: 20}},
    { title: "Java", author: "James", shit: {author: 'fahim', age: 20}},
    { title: "Python", author: "Guido" , shit: {author: 'fahim', age: 20}},
    { title: "Java", author: "James" },
    { title: "Java", author: "James" },
    { title: "Java", author: "James" },
];
let newObj = {}
books.forEach((book) => {
    newObj[book.title] = book;
    // console.log(newObj);
})
let b =Object.values(newObj)
console.log(b);
for(i in b){
    // console.log(b);
}

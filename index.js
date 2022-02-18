const { HashTable } = require("./hashTable");

const myTable = new HashTable();
myTable.setItem("A", "bob");
myTable.setItem("B", "maya");
myTable.setItem("C", "dor");

console.log(myTable.table);

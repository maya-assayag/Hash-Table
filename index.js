const { HashTable } = require("./hashTable");
const hashTable = new HashTable();
hashTable.setItem("K", { ky: 1 });

console.log(hashTable.getItem("K"));
hashTable.removeItem("K");
console.log(hashTable.table);

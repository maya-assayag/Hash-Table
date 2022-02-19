const { HashTable } = require("../../hashTable");
const { hashStringToInt } = require("../../hashTable");
describe("Add item function", () => {
  let hashTable;
  let key;
  let value;

  beforeEach(() => {
    hashTable = new HashTable();
    key = "Key";
    value = "Value";
  });

  afterEach(() => {
    hashTable.removeItem(key);
  });

  it("sanity test", () => {
    hashTable.setItem(key, value);
    const res = hashTable.getItem(key);

    expect(res).toBe(value);
  });

  it("should not set identical item more than once", () => {
    hashTable.setItem(key, value);
    hashTable.setItem(key, value);
    const index = hashStringToInt(key, hashTable.table.length);
    let res = hashTable.table[index].filter(
      pair => pair[0] === key && pair[1] === value
    );

    expect(res.length).toBe(1);
  });

  it("should avoid collisions by resize the table when it get over 80% in size", () => {
    const tableSize = 2;
    hashTable = new HashTable(tableSize);
    hashTable.setItem(key, value);
    key = "key2";
    hashTable.setItem(key, value);
    key = "key3";
    hashTable.setItem(key, value);

    expect(hashTable.table.length).toBe(tableSize * 2);
  });

  it("should solve collisions by chaning the items", () => {
    const tableSize = 2;
    hashTable = new HashTable(tableSize);

    hashTable.setItem(key, value);
    key = "yek";
    hashTable.setItem(key, value);
    key = "kye";
    hashTable.setItem(key, value);

    const index = hashStringToInt(key, hashTable.table.length);

    expect(hashTable.table[index].length).toBe(3);
  });
});

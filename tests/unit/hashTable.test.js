const { HashTable } = require("../../hashTable");
const { hashStringToInt } = require("../../hashTable");
describe("hash table class", () => {
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

    expect(res[0]).toBe(value);
  });

  it("should return all items with same key", () => {
    hashTable.setItem(key, value);

    value = "Value1";
    hashTable.setItem(key, value);

    const res = hashTable.getItem(key);

    expect(res.length).toBe(2);
  });

  it("should remove item when call removeItem function", () => {
    hashTable.setItem(key, value);
    hashTable.removeItem(key);

    const index = hashStringToInt(key, hashTable.table.length);
    const res = hashTable.table[index].find(
      item => item.key === key && item.value === value
    );

    expect(res).toBe(undefined);
  });

  it("should remove item when call removeItem function with key and value", () => {
    hashTable.setItem(key, value);
    hashTable.removeItem(key, value);

    const index = hashStringToInt(key, hashTable.table.length);
    const res = hashTable.table[index].find(
      item => item.key === key && item.value === value
    );

    expect(res).toBe(undefined);
  });

  it("should return indecative message when try remove does not exsit item", () => {
    const res = hashTable.removeItem(key);

    expect(res).toBe("This item was not found");
  });

  it("should return indecative message when try get does not exsit item", () => {
    const res = hashTable.getItem(key);

    expect(res).toBe("This item was not found");
  });

  it("should return indecative message when try get does not exsit item but in this key index has item", () => {
    hashTable.setItem(key, value);
    key = "eyk";
    const res = hashTable.getItem(key);

    expect(res).toBe("This item was not found");
  });

  it("should not set identical item,same key and value, more than once", () => {
    hashTable.setItem(key, value);
    hashTable.setItem(key, value);

    const index = hashStringToInt(key, hashTable.table.length);

    let res = hashTable.table[index].filter(
      pair => pair.key === key && pair.value === value
    );

    expect(res.length).toBe(1);
  });

  it("should return indicative message when set identical item,same key and value, more than once", () => {
    hashTable.setItem(key, value);
    const res = hashTable.setItem(key, value);

    expect(res).toBe("This item is already indexed");
  });

  it("should return indicative message when trying to index a non number key", () => {
    key = { type: "notNymber" };
    const res = hashTable.setItem(key, value);

    expect(res).toBe("This typeof key should be String or Number.");
  });

  it("should return indicative message when trying to get a non number key", () => {
    key = { type: "notNymber" };
    const res = hashTable.getItem(key);

    expect(res).toBe("This typeof key should be String or Number.");
  });

  it("should a typeof number key", () => {
    key = 1;
    hashTable.setItem(key, value);
    const res = hashTable.getItem(key);

    expect(res[0]).toBe(value);
  });

  it("should set items with same key and different value, more than once", () => {
    hashTable.setItem(key, value);

    value = "Value2";
    hashTable.setItem(key, value);

    const index = hashStringToInt(key, hashTable.table.length);

    let res = hashTable.table[index].filter(pair => pair.key === key);

    expect(res.length).toBe(2);
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

  it("should copy items from previous table to resize table when table resize after get over 80% in size", () => {
    const tableSize = 2;
    hashTable = new HashTable(tableSize);
    hashTable.setItem(key, value);

    const secondKey = "key2";
    hashTable.setItem(secondKey, value);

    previousTableItemIndex = hashStringToInt(key, hashTable.table.length);
    const res = hashTable.table[previousTableItemIndex].find(
      item => item.key === key && item.value === value
    );

    expect(res.key).toBe(key);
    expect(res.value).toBe(value);
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

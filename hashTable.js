function hashStringToInt(str, tableSize) {
  let hash = 17;

  for (let i = 0; i < str.length; i++) {
    hash = (13 * hash * str.charCodeAt(i)) % tableSize;
  }

  return hash;
}

class HashTable {
  constructor(size = 101) {
    this.table = new Array(size);
    this.itemsCounter = 0;
    this.loadFactor = this.itemsCounter / this.table.length;
  }

  resize = () => {
    const newTable = new Array(this.table.length * 2);
    this.table.forEach(item => {
      if (item) {
        item.forEach(([key, value]) => {
          const index = hashStringToInt(key, newTable.length);
          if (newTable[index]) {
            newTable[index] = [[key, value], ...newTable[index]];
          } else {
            newTable[index] = [[key, value]];
          }
        });
      }
    });
    this.table = newTable;
  };

  setItem = (key, value) => {
    ++this.itemsCounter;
    const loadFactor = this.itemsCounter / this.table.length;
    if (loadFactor > 0.8) {
      this.resize();
    }
    const index = hashStringToInt(key, this.table.length);
    if (this.table[index]) {
      for (let item of this.table[index]) {
        if (item[0] === key && item[1] === value) {
          return "This item is already indexed";
        }
      }
      this.table[index] = [[key, value], ...this.table[index]];
    } else {
      this.table[index] = [[key, value]];
    }
  };

  getItem = key => {
    const index = hashStringToInt(key, this.table.length);

    if (!this.table[index]) {
      return "This item was not found";
    }
    const res = this.table[index].filter(item => item[0] === key); //O(n)

    if (!res || res.length === 0) {
      return "This item was not found";
    }

    return res.map(item => item[1]);
  };

  removeItem = key => {
    const index = hashStringToInt(key, this.table.length);

    if (!this.table[index]) {
      return "This item was not found";
    }

    this.table[index] = [...this.table[index].filter(item => item[0] !== key)]; //O(n)
  };
}

module.exports = { HashTable, hashStringToInt };

import linkedList from "./linkedList.mjs";
import node from "./node.mjs";

export default function HashMap(capacity = 16) {
  const LOAD_FACTOR = 0.75;
  let buckets = Array.from({ length: capacity }, () => linkedList()); // initialize buckets with a specified capacity and each element in the array is a new instance of a linked-list.

  let size = 0;

  return {
    hash(key) {
      let hashCode = 0;

      const primeNumber = 31;

      for (let i = 0; i < key.length; i++) {
        hashCode =
          (primeNumber * hashCode + key.charCodeAt(i)) % buckets.length;
      }

      return hashCode;
    },
    set(key, value) {
      size++;
      let hashCode = this.hash(key);
      if (key === "First") {
        console.log(hashCode);
      }

      if (hashCode < 0 || hashCode >= buckets.length) {
        throw new Error("Trying to access index out of bound");
      }
      const currentBucket = buckets[hashCode];
      if (currentBucket.contains(value)) {
        const nodeIndex = currentBucket.find(value);
        const node = currentBucket.at(nodeIndex);
        if (node !== null && node.key === key) {
          // if key exist just update the value
          node.value = value;
        }
      } else {
        const newNode = node(value, key);
        currentBucket.append(newNode);
      }

      this.checkHighLoad();
      return;
    },
    get(key) {
      const hashCode = this.hash(key);
      const currentBucket = buckets[hashCode];

      if (currentBucket.head() !== null) {
        const value = currentBucket.getValueByKey(key);
        if (value !== null) {
          return value;
        }
      }
      return null;
    },
    has(key) {
      const hashCode = this.hash(key);
      const currentBucket = buckets[hashCode];
      if (
        currentBucket.head() !== null &&
        currentBucket.getValueByKey(key) !== null
      ) {
        return true;
      } else {
        return false;
      }
    },
    remove(key) {
      if (!this.has(key)) {
        return false;
      }
      const hashCode = this.hash(key);
      const bucket = buckets[hashCode];
      const value = this.get(key);
      if (value === null) {
        return false;
      }
      const index = bucket.find(value);
      if (index === null) {
        return false;
      }
      bucket.removeAt(index);
      size--;
      return true;
    },

    length() {
      return size;
    },
    clear() {
      buckets.forEach((bucket) => {
        while (bucket.head() !== null) {
          bucket.pop();
        }
      });
      size = 0;
    },
    keys() {
      let keyArray = [];
      buckets.forEach((bucket) => {
        let currentNode = bucket.head();
        while (currentNode !== null) {
          keyArray.push(currentNode.key);
          currentNode = currentNode.nextNode;
        }
      });
      return keyArray;
    },
    values() {
      let valueArray = [];
      buckets.forEach((bucket) => {
        let currentNode = bucket.head();
        while (currentNode !== null) {
          valueArray.push(currentNode.value);
          currentNode = currentNode.nextNode;
        }
      });
      return valueArray;
    },
    entries() {
      const valueArray = this.values();
      const keyArray = this.keys();

      let entriesArray = [];

      for (let i = 0; i < valueArray.length; i++) {
        let entry = [];
        entry.push(keyArray[i]);
        entry.push(valueArray[i]);
        entriesArray.push(entry);
      }
      return entriesArray;
    },
    checkHighLoad() {
      if (size / buckets.length > LOAD_FACTOR) {
        this.resizeBucket();
      } else {
        return;
      }
    },
    resizeBucket() {
      const oldBuckets = buckets;
      buckets = Array.from({ length: buckets.length * 2 }, () => linkedList());
      size = 0;

      oldBuckets.forEach((bucket) => {
        for (let i = 0; i < bucket.size(); i++) {
          const node = bucket.at(i);
          this.set(node.key, node.value);
        }
      });
    },
  };
}

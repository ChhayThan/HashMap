import node from "./node.mjs";

export default function linkedList(headNode = null) {
  let listHead = headNode;
  return {
    append(node) {
      if (listHead === null) {
        this.prepend(node);
      } else {
        let tmpNode = listHead;
        while (tmpNode.nextNode !== null) {
          tmpNode = tmpNode.nextNode;
        }
        tmpNode.nextNode = node;
      }
    },
    prepend(node) {
      if (listHead === null) {
        listHead = node;
      } else {
        let tmpNode = listHead;
        listHead = node;
        listHead.nextNode = tmpNode;
      }
    },
    size() {
      let size = 0;
      let tmpNode = listHead;
      while (tmpNode !== null) {
        size++;
        tmpNode = tmpNode.nextNode;
      }
      return size;
    },
    head() {
      return listHead;
    },
    tail() {
      let tmpNode = listHead;
      while (tmpNode.nextNode !== null) {
        tmpNode = tmpNode.nextNode;
      }

      return tmpNode;
    },
    at(index) {
      let tmpNode = listHead;
      for (let i = 0; i < index; i++) {
        tmpNode = tmpNode.nextNode;
        if (tmpNode === null) {
          return `IndexOutOfBound: ${index}`;
        }
      }
      return tmpNode;
    },
    pop() {
      let tmpNode = listHead;
      if (tmpNode === null) {
        return "Empty List";
      } else if (tmpNode.nextNode === null) {
        listHead = null;
        return tmpNode;
      } else {
        while (tmpNode.nextNode.nextNode !== null) {
          tmpNode = tmpNode.nextNode;
        }
        const nodeToRemove = tmpNode.nextNode;
        tmpNode.nextNode = null;
        return nodeToRemove;
      }
    },
    contains(value) {
      let tmpNode = listHead;
      while (tmpNode !== null) {
        if (tmpNode.value === value) {
          return true;
        }
        tmpNode = tmpNode.nextNode;
      }
      return false;
    },
    find(value) {
      let tmpNode = listHead;
      let index = 0;
      while (tmpNode !== null) {
        if (tmpNode.value === value) {
          return index;
        }
        tmpNode = tmpNode.nextNode;
        index++;
      }
      return null;
    },
    toString() {
      let tmpNode = listHead;
      if (tmpNode === null) {
        return null;
      }
      let result = "";
      while (tmpNode !== null) {
        result += `( ${tmpNode.value} ) -> `;
        tmpNode = tmpNode.nextNode;
      }

      return result + "( null )";
    },
    insertAt(value, index) {
      if (listHead === null) {
        prepend(value);
        return;
      }
      let currentNode = listHead;
      let prevNode = null;
      for (let i = 0; i < index; i++) {
        prevNode = currentNode;
        currentNode = currentNode.nextNode;
        if (currentNode === null) {
          break;
        }
      }
      const newNode = node(value);
      prevNode.nextNode = newNode;
      newNode.nextNode = currentNode;
    },

    removeAt(index) {
      if (listHead === null) {
        return "Empty List";
      } else if (index === 0) {
        listHead = listHead.nextNode;
        return;
      }
      let currentNode = listHead;
      let prevNode = null;
      for (let i = 0; i < index; i++) {
        prevNode = currentNode;
        currentNode = currentNode.nextNode;
        if (currentNode === null) {
          return `IndexOutOfBound: ${index}`;
        }
      }
      prevNode.nextNode = currentNode.nextNode;
    },
    getValueByKey(key) {
      let tmpNode = listHead;
      while (tmpNode !== null) {
        if (tmpNode.key === key) {
          return tmpNode.value;
        }
        tmpNode = tmpNode.nextNode;
      }
      return null;
    },
  };
}

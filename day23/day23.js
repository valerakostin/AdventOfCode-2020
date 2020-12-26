const day23 = () => {
  const input = '598162734'.split('').map(x => +x);

  class Node {
    constructor(value, next = null) {
      this.value = value;
      this.next = next;
    }
  }

  class CircularList {
    constructor(data) {
      this.head = new Node(data[0]);
      this.lookup = new Map();
      this.lookup.set(data[0], this.head);
      let current = this.head;
      for (let i = 1; i < data.length; i++) {
        const n = new Node(data[i]);
        this.lookup.set(data[i], n);
        current.next = n;
        current = n;
      }
      current.next = this.head;
      this.last = current;
      this.current = this.head;
    }

    next() {
      this.current = this.current.next;
      return this.current;
    }
    value() {
      return this.current.value;
    }

    removeNext(n) {
      const pick = this.current.next;
      let node = pick;

      for (let i = 0; i < n - 1; i++) {
        node = node.next;
      }
      const last = node.next;

      this.current.next = last;
      node.next = null;
      return pick;
    }

    insertAfterValue(value, node) {
      const n = this.lookup.get(value);
      const old = n.next;
      n.next = node;

      let next = n;
      while (next.next) {
        next = next.next;
      }
      next.next = old;
    }

    getNodeFor(value) {
      return this.lookup.get(value);
    }
  }

  const compute = (data, rounds) => {
    const list = new CircularList(data);
    const max = data.length;
    for (let i = 0; i < rounds; i++) {
      const value = list.value();
      let destination = value - 1;

      const picked = list.removeNext(3);
      const p1 = picked.value;
      const p2 = picked.next.value;
      const p3 = picked.next.next.value;

      if (
        destination === p1 ||
        destination === p2 ||
        destination === p3 ||
        destination == 0
      ) {
        while (destination > 0) {
          destination--;
          if (destination !== p1 && destination !== p2 && destination !== p3)
            break;
        }

        if (destination === 0) {
          if (max !== p1 && max !== p2 && max !== p3) destination = max;
          else if (max - 1 !== p1 && max - 1 !== p2 && max - 1 !== p3)
            destination = max - 1;
          else if (max - 2 !== p1 && max - 2 !== p2 && max - 2 !== p3)
            destination = max - 2;
        }
      }
      list.insertAfterValue(destination, picked);
      list.next();
    }
    return list;
  };

  const task1 = () => {
    const list = compute(input, 100);
    let node = list.getNodeFor(1);
    node = node.next;
    let str = '';
    while (node.value != 1) {
      str += node.value;
      node = node.next;
    }
    return str;
  };

  const task2 = () => {
    const data = [...input];

    for (let i = 10; i <= 1000000; i++) data.push(i);
    const list = compute(data, 10000000);
    let node = list.getNodeFor(1);
    const v1 = node.next.value;
    const v2 = node.next.next.value;
    console.log(v1, v2);
    return v1 * v2;
  };

  console.log(`Day 23: Crab Cups: 
Task 1: ${task1()}
Task 2: ${task2()} `);
};

console.time('Time:');
day23();
console.timeEnd('Time:');

'use strict';

class ListNode {
    constructor(value, next) {
        this._value = value;
        this._next = next;
    }
    get value() {
        return this._value;
    }

    set value(val) {
        this._value = val;
    }

    get next() {
        return this._next;
    }

    set next(nextNode) {
        this._next = nextNode;
    }
}

class LinkedList {
    constructor() {
        this._length = 0;
        this._first = null;
        this._last = null;
    }

    get first() {
        if (!this._first) {
            return null;
        }
        return this._first.value;
    }

    get last() {
        if (!this._last) {
            return null;
        }
        return this._last.value;
    }

    get lengtht() {
        return this._length;
    }

    nullValidation(argument) {
        if (!argument) {
            throw 'Provide at least one element to append!';
        }
    }
    indexValidation(index) {
        if (index===null) {
            throw 'Please provide an index!';
        } else if (index > this._length || index < 0) {
            throw `Index must be between 0 and ${this._length}`;
        }
    }

    append(...args) {
        this.nullValidation(args);

        if (!this._first) {
            let node = new ListNode(args[0], null)
            this._first = node;
            this._last = node;
            this._length+=1;
            args.splice(0, 1);
        }

        for (let i = 0; i < args.length; i += 1) {
            let nodeToApend = new ListNode(args[i], null);

            if (!this._first.next) {
                this._first.next = nodeToApend;
            } else {
                this._last.next = nodeToApend;
            }

            this._last = nodeToApend;
            this._length += 1;
        }
        return this;
    }

    prepend(...args) {
        this.nullValidation(args);

         if (!this._first) {
            let node = new ListNode(args[length - 1], null)
            this._first = node;
            this._last = node;
            this._length+=1;
            args.splice(args.length - 1, 1);
        }

        for (let i = args.length - 1; i >= 0; i -= 1) {
            let nodeToPrepend = new ListNode(args[i], this._first);

            this._first = nodeToPrepend;
            this._length += 1;
        }

        return this;
    }
    
    insert(index, ...args) {
        this.indexValidation(index);
        if (!args.length) {
            throw 'Provide at least one element to append!';
        }

        if (!this._first) {
            let node = new ListNode(args[args.length - 1], null)
            this._first = node;
            this._last = node;
            this._length+=1;
            args = args.splice(args.length - 1, 1);
        }

        for (let i = 0; i < args.length; i += 1) {
            let nodeBeforeIndex, nodeAfterIndex;
            if (index === 0) {
                nodeBeforeIndex = null;
                nodeAfterIndex = this._first;
            } else {
                let currentNode = this._first
                for (let j = 0; j < index - 1; j += 1) {
                    currentNode.next
                }
                nodeBeforeIndex = currentNode;
                nodeAfterIndex = currentNode.next;
            }

            let node = new ListNode(args[args.length - i], nodeAfterIndex);
            if (!nodeAfterIndex) {
                this._last = node;
            }
            nodeBeforeIndex.next = node;
            node.next = nodeAfterIndex;

            this._length += 1;
        }
        return this;
    }

    at(index, value) {
        this.indexValidation(index);
        if (index) {
            let currentNode = this._first;
            for (let i = 0; i < index; i += 1) {
                currentNode = currentNode.next;
            }
            if (!value) {
                return currentNode.value;
            } else {
                currentNode.value = value;
            }
        }
    }

    removeAt(index){
        this.indexValidation(index);
        let elementAtIndex=this._first;
        for(let i=0; i<index;i+=1){
            elementAtIndex.next;
        }
        return this;
    }

    toArray() {
       let values=[];
       for(let value of this){
           values.push(value);
       }
       return values;
    }

    toString(){
        let valuesAsString=this.toArray();
        let result =valuesAsString.join(' -> ');
        return result;
    }

    *[Symbol.iterator]() {
        let currentNode = this._first;

        while (currentNode) {
            yield currentNode.value;
            currentNode = currentNode.next;
        }
    }
}


module.exports = LinkedList;
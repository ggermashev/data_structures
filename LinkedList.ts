class ListNode<T> {
    private _next: ListNode<T>;
    private _prev: ListNode<T>;
    private _value: T

    constructor(value: T, next?: ListNode<T>, prev?: ListNode<T>) {
        this.next = next ?? null
        this.prev = prev ?? null
        this.value = value
    }

    set next(next: ListNode<T>) {
        this._next = next
    }

    set prev(prev: ListNode<T>) {
        this._prev = prev
    }

    set value(value: T){
        this._value = value
    }

    get next() {
        return this._next
    }

    get prev() {
        return this._prev
    }

    get value() {
        return this._value
    }
}


export class LinkedList<T> {
    private head: ListNode<T>
    private tail: ListNode<T>
    private _length: number

    constructor() {
        this.head = null
        this.tail = null
        this._length = 0
    }

    get length() {
        return this._length
    }

    append(value: T) {
        if (!this.head) {
            this.head = new ListNode<T>(value)
            this.tail = this.head
            this._length = 1
        } else {
            let node: ListNode<T> = new ListNode<T>(value, null, this.tail)
            this.tail.next = node
            this.tail = node
            this._length += 1
        }
    }

    prepand(value: T) {
        if (!this.head) {
            this.head = new ListNode<T>(value)
            this.tail = this.head
            this._length = 1
        } else {
            let node: ListNode<T> = new ListNode<T>(value, this.head, null)
            this.head.prev = node
            this.head = node
            this._length += 1
        }
    }

    removeFront() {
        if (this.length == 1) {
            this.head = this.tail = null
            this._length = 0
        } else if (this.length > 1) {
            this.head = this.head.next
            this.head.prev = null
            this._length -= 1
        } else {
            throw new Error("length is 0")
        }
    }

    removeBack() {
        if (this.length == 1) {
            this.head = this.tail = null
            this._length = 0
        } else if (this.length > 1) {
            this.tail = this.tail.prev
            this.tail.next = null
            this._length -= 1
        } else {
            throw new Error("length is 0")
        }
    }

    insert(value: T, index: number) {
        if (this.length == 0) {
            this.append(value)
        } else {
            if (index == 0) {
                this.prepand(value)
            } else if (index == this.length) {
                this.append(value)
            } else {
                let current_node = this.head
                let current_index = 0
                while (current_index < index) {
                    current_node = current_node.next
                    current_index += 1
                }
                let node = new ListNode(value, current_node, current_node.prev)
                current_node.prev.next = node
                current_node.prev = node
                this._length += 1

            }
        }
    }

    removeByIndex(index: number) {
        if (this.length == 0) {
            throw new Error("length is 0")
        }
        if (index >= this.length) {
            throw new Error("index out of range")
        }
        if (index == 0) {
            this.removeFront()
            return
        }
        if (index == this.length - 1) {
            this.removeBack()
            return
        }
        let current_index = 0
        let current_node = this.head
        while (current_index < index) {
            current_node = current_node.next
            current_index += 1
        }
        current_node.prev.next = current_node.next
        current_node.next.prev = current_node.prev
        this._length -= 1
    }

    removeByValue(value: T) {
        let current_node = this.head
        let current_index = 0
        while (current_node) {
            if (current_node.value == value) {
                if (current_index == 0) {
                    this.removeFront()
                    return
                }
                if (current_index == this.length - 1) {
                    this.removeBack()
                    return
                }
                current_node.prev.next = current_node.next
                current_node.next.prev = current_node.prev
                this._length -= 1
                return
            }
            current_index += 1
            current_node = current_node.next
        }
    }

    getValue(index: number) {
        if (index < 0 || index >= this.length) {
            throw new Error("index out of range")
        }
        let current_index = 0
        let current_node = this.head
        while (current_index < index) {
            current_index += 1
            current_node = current_node.next
        }
        return current_node.value
    }


    getFirst() {
        return this.head.value
    }

    getLast() {
        return this.tail.value
    }

    getValueByCondition(condition: (node: ListNode<T>) => boolean) {
        let current_node = this.head
        while (current_node) {
            if (condition(current_node)) {
                return current_node.value
            }
            current_node = current_node.next
        }
        return null
    }

    toString() {
        let res: string = ""
        let current_node = this.head
        let begin = true
        while (current_node !== null) {
            if (begin) {
                res += current_node.value.toString()
                begin = false
            } else {
                res += `, ${current_node.value.toString()}`
            }
            current_node = current_node.next
        }
        res = `[${res}]`
        return res
    }
}
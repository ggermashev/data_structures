"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LinkedList = void 0;
var ListNode = /** @class */ (function () {
    function ListNode(value, next, prev) {
        this.next = next !== null && next !== void 0 ? next : null;
        this.prev = prev !== null && prev !== void 0 ? prev : null;
        this.value = value;
    }
    Object.defineProperty(ListNode.prototype, "next", {
        get: function () {
            return this._next;
        },
        set: function (next) {
            this._next = next;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListNode.prototype, "prev", {
        get: function () {
            return this._prev;
        },
        set: function (prev) {
            this._prev = prev;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(ListNode.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: false,
        configurable: true
    });
    return ListNode;
}());
var LinkedList = /** @class */ (function () {
    function LinkedList() {
        this.head = null;
        this.tail = null;
        this._length = 0;
    }
    Object.defineProperty(LinkedList.prototype, "length", {
        get: function () {
            return this._length;
        },
        enumerable: false,
        configurable: true
    });
    LinkedList.prototype.append = function (value) {
        if (!this.head) {
            this.head = new ListNode(value);
            this.tail = this.head;
            this._length = 1;
        }
        else {
            var node = new ListNode(value, null, this.tail);
            this.tail.next = node;
            this.tail = node;
            this._length += 1;
        }
    };
    LinkedList.prototype.prepand = function (value) {
        if (!this.head) {
            this.head = new ListNode(value);
            this.tail = this.head;
            this._length = 1;
        }
        else {
            var node = new ListNode(value, this.head, null);
            this.head.prev = node;
            this.head = node;
            this._length += 1;
        }
    };
    LinkedList.prototype.removeFront = function () {
        if (this.length == 1) {
            this.head = this.tail = null;
            this._length = 0;
        }
        else if (this.length > 1) {
            this.head = this.head.next;
            this.head.prev = null;
            this._length -= 1;
        }
        else {
            throw new Error("length is 0");
        }
    };
    LinkedList.prototype.removeBack = function () {
        if (this.length == 1) {
            this.head = this.tail = null;
            this._length = 0;
        }
        else if (this.length > 1) {
            this.tail = this.tail.prev;
            this.tail.next = null;
            this._length -= 1;
        }
        else {
            throw new Error("length is 0");
        }
    };
    LinkedList.prototype.insert = function (value, index) {
        if (this.length == 0) {
            this.append(value);
        }
        else {
            if (index == 0) {
                this.prepand(value);
            }
            else if (index == this.length) {
                this.append(value);
            }
            else {
                var current_node = this.head;
                var current_index = 0;
                while (current_index < index) {
                    current_node = current_node.next;
                    current_index += 1;
                }
                var node = new ListNode(value, current_node, current_node.prev);
                current_node.prev.next = node;
                current_node.prev = node;
                this._length += 1;
            }
        }
    };
    LinkedList.prototype.removeByIndex = function (index) {
        if (this.length == 0) {
            throw new Error("length is 0");
        }
        if (index >= this.length) {
            throw new Error("index out of range");
        }
        if (index == 0) {
            this.removeFront();
            return;
        }
        if (index == this.length - 1) {
            this.removeBack();
            return;
        }
        var current_index = 0;
        var current_node = this.head;
        while (current_index < index) {
            current_node = current_node.next;
            current_index += 1;
        }
        current_node.prev.next = current_node.next;
        current_node.next.prev = current_node.prev;
        this._length -= 1;
    };
    LinkedList.prototype.removeByValue = function (value) {
        var current_node = this.head;
        var current_index = 0;
        while (current_node) {
            if (current_node.value == value) {
                if (current_index == 0) {
                    this.removeFront();
                    return;
                }
                if (current_index == this.length - 1) {
                    this.removeBack();
                    return;
                }
                current_node.prev.next = current_node.next;
                current_node.next.prev = current_node.prev;
                this._length -= 1;
                return;
            }
            current_index += 1;
            current_node = current_node.next;
        }
    };
    LinkedList.prototype.getValue = function (index) {
        if (index < 0 || index >= this.length) {
            throw new Error("index out of range");
        }
        var current_index = 0;
        var current_node = this.head;
        while (current_index < index) {
            current_index += 1;
            current_node = current_node.next;
        }
        return current_node.value;
    };
    LinkedList.prototype.getFirst = function () {
        return this.head.value;
    };
    LinkedList.prototype.getLast = function () {
        return this.tail.value;
    };
    LinkedList.prototype.getValueByCondition = function (condition) {
        var current_node = this.head;
        while (current_node) {
            if (condition(current_node)) {
                return current_node.value;
            }
            current_node = current_node.next;
        }
        return null;
    };
    LinkedList.prototype.toString = function () {
        var res = "";
        var current_node = this.head;
        var begin = true;
        while (current_node !== null) {
            if (begin) {
                res += current_node.value.toString();
                begin = false;
            }
            else {
                res += ", ".concat(current_node.value.toString());
            }
            current_node = current_node.next;
        }
        res = "[".concat(res, "]");
        return res;
    };
    return LinkedList;
}());
exports.LinkedList = LinkedList;

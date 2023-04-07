"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = void 0;
var LinkedList_1 = require("./LinkedList");
var Link = /** @class */ (function () {
    function Link(from, to, cost) {
        this.from = from;
        this.to = to;
        this.cost = cost;
    }
    Link.prototype.toString = function () {
        var res = "from: ".concat(this.from.value.toString(), " to: ").concat(this.to.value.toString(), " cost: ").concat(this.cost);
        return res;
    };
    return Link;
}());
var Way = /** @class */ (function (_super) {
    __extends(Way, _super);
    function Way(from, to, cost, totalCost, chain) {
        var _this = _super.call(this, from, to, cost) || this;
        _this.totalCost = totalCost !== null && totalCost !== void 0 ? totalCost : cost;
        // console.log(from.toString())
        if (!chain) {
            _this._chain = new LinkedList_1.LinkedList();
            _this._chain.append(from);
            _this._chain.append(to);
        }
        else {
            if (chain.getValueByCondition(function (list_node) {
                return list_node.value.value == to.value;
            })) {
                return null;
            }
            _this._chain = chain.copy();
            _this._chain.append(to);
        }
        return _this;
    }
    Object.defineProperty(Way.prototype, "totalCost", {
        get: function () {
            return this._totalCost;
        },
        set: function (cost) {
            this._totalCost = cost;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Way.prototype, "chain", {
        get: function () {
            return this._chain;
        },
        enumerable: false,
        configurable: true
    });
    Way.prototype.toString = function () {
        if (this.chain) {
            return "totalCost: ".concat(this.totalCost, " chain: ").concat(this.chain.toString(), "\n");
        }
        else {
            return "";
        }
    };
    return Way;
}(Link));
var GraphNode = /** @class */ (function () {
    function GraphNode(value) {
        this.value = value;
        this._links = new LinkedList_1.LinkedList();
    }
    Object.defineProperty(GraphNode.prototype, "value", {
        get: function () {
            return this._value;
        },
        set: function (value) {
            this._value = value;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(GraphNode.prototype, "links", {
        get: function () {
            return this._links;
        },
        enumerable: false,
        configurable: true
    });
    GraphNode.prototype.addLink = function (node, cost) {
        var link = new Link(this, node, cost);
        if (!this.links.getValueByCondition(function (node_list) {
            return node_list.value.to === link.to;
        })) {
            this.links.append(link);
        }
        else {
            throw new Error("Link already exists");
        }
    };
    GraphNode.prototype.addDualLink = function (node, cost) {
        var link1 = new Link(this, node, cost);
        var link2 = new Link(node, this, cost);
        if (!this.links.getValueByCondition(function (node_list) {
            return node_list.value.to === link1.to;
        }) &&
            !node.links.getValueByCondition(function (node_list) {
                return node_list.value.to === link2.to;
            })) {
            this.links.append(link1);
            node.links.append(link2);
        }
        else {
            throw new Error("Dual link already exists");
        }
    };
    GraphNode.prototype.removeLink = function (node) {
        var link = this.links.getValueByCondition(function (list_node) {
            if (list_node.value.to === node) {
                return true;
            }
        });
        if (!link)
            throw new Error("no such link");
        this.links.removeByValue(link);
    };
    GraphNode.prototype.removeDualLink = function (node) {
        var _this = this;
        var link1 = this.links.getValueByCondition(function (list_node) {
            if (list_node.value.to === node) {
                return true;
            }
        });
        var link2 = node.links.getValueByCondition(function (list_node) {
            if (list_node.value.to === _this) {
                return true;
            }
        });
        if (!link1 || !link2) {
            throw new Error("no such links");
        }
        this.links.removeByValue(link1);
        node.links.removeByValue(link2);
    };
    GraphNode.prototype.toString = function () {
        var res = "\n".concat(this.value.toString(), " links:").concat(this.links.toString());
        return res;
    };
    return GraphNode;
}());
var Graph = /** @class */ (function () {
    function Graph() {
        this.nodes = new LinkedList_1.LinkedList();
    }
    Graph.prototype.addNode = function (value) {
        this.nodes.append(new GraphNode(value));
        this.count += 1;
    };
    Graph.prototype.removeNode = function (value) {
        var node = this.nodes.getValueByCondition(function (nd) {
            return nd.value.value == value;
        });
        this.nodes.removeByValue(node);
        var current_node = this.nodes.head;
        while (current_node) {
            try {
                current_node.value.removeLink(node);
            }
            catch (e) {
            }
            current_node = current_node.next;
        }
    };
    Graph.prototype.addLink = function (from, to, cost) {
        var node_from = this.nodes.getValueByCondition(function (list_node) { return list_node.value.value === from; });
        var node_to = this.nodes.getValueByCondition(function (list_node) { return list_node.value.value === to; });
        // console.log(node_from.toString())
        node_from.addLink(node_to, cost);
    };
    Graph.prototype.addDualLink = function (from, to, cost) {
        var node_from = this.nodes.getValueByCondition(function (list_node) { return list_node.value.value == from; });
        var node_to = this.nodes.getValueByCondition(function (list_node) { return list_node.value.value == to; });
        node_from.addDualLink(node_to, cost);
    };
    Graph.prototype.removeLink = function (from, to) {
        var node_from = this.nodes.getValueByCondition(function (list_node) { return list_node.value.value == from; });
        var node_to = this.nodes.getValueByCondition(function (list_node) { return list_node.value.value == to; });
        node_from.removeLink(node_to);
    };
    Graph.prototype.removeDualLink = function (from, to) {
        var node_from = this.nodes.getValueByCondition(function (list_node) { return list_node.value.value == from; });
        var node_to = this.nodes.getValueByCondition(function (list_node) { return list_node.value.value == to; });
        node_from.removeDualLink(node_to);
    };
    Graph.prototype.toString = function () {
        return this.nodes.toString();
    };
    Graph.prototype.getShortestWay = function (from, to) {
        var current_node = this.nodes.getValueByCondition(function (list_node) {
            return list_node.value.value == from;
        });
        var queue = new LinkedList_1.LinkedList();
        queue.append(current_node);
        var ways = new LinkedList_1.LinkedList();
        var _loop_1 = function () {
            var current_link = queue.getFirst().links.head;
            queue.removeFront();
            while (current_link) {
                var continue_ways = ways.getValuesByCondition(function (list_node) {
                    return list_node.value.to.value === current_link.value.from.value;
                });
                if (continue_ways.length === 0) {
                    var next_way = new Way(current_link.value.from, current_link.value.to, current_link.value.cost);
                    if (next_way.from.value !== to) {
                        ways.prepend(next_way);
                        queue.append(current_link.value.to);
                    }
                }
                else {
                    var way = continue_ways.head;
                    while (way) {
                        // ways.removeByValue(way.value)
                        var next_way = new Way(current_link.value.from, current_link.value.to, current_link.value.cost, way.value.totalCost + current_link.value.cost, way.value.chain);
                        if (next_way.from.value !== to) {
                            ways.prepend(next_way);
                            queue.append(current_link.value.to);
                        }
                        way = way.next;
                    }
                }
                current_link = current_link.next;
            }
        };
        while (queue.length > 0) {
            _loop_1();
        }
        var min_way = ways.head;
        var current_way = ways.head;
        while (current_way) {
            if (current_way.value.to.value == to) {
                if (current_way.value.totalCost < min_way.value.totalCost) {
                    min_way = current_way;
                }
            }
            current_way = current_way.next;
        }
        return min_way.value.chain;
    };
    return Graph;
}());
exports.Graph = Graph;

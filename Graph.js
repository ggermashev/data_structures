"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Graph = void 0;
var LinkedList_1 = require("./LinkedList");
var Link = /** @class */ (function () {
    function Link(to, cost) {
        this.to = to;
        this.cost = cost;
    }
    Link.prototype.toString = function () {
        var res = "to: ".concat(this.to.value.toString(), " cost: ").concat(this.cost);
        return res;
    };
    return Link;
}());
var GraphNode = /** @class */ (function () {
    function GraphNode(value) {
        this.value = value;
        this.links = new LinkedList_1.LinkedList();
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
    GraphNode.prototype.addLink = function (node, cost) {
        var link = new Link(node, cost);
        if (!this.links.getValueByCondition(function (node_list) { return node_list.value.to === link.to; })) {
            this.links.append(link);
        }
        else {
            throw new Error("Link already exists");
        }
    };
    GraphNode.prototype.addDualLink = function (node, cost) {
        var link1 = new Link(node, cost);
        var link2 = new Link(this, cost);
        if (!this.links.getValueByCondition(function (node_list) { return node_list.value.to === link1.to; }) &&
            !node.links.getValueByCondition(function (node_list) { return node_list.value.to === link2.to; })) {
            this.links.append(link1);
            node.links.append(link2);
        }
        else {
            throw new Error("Dual link already exists");
        }
    };
    GraphNode.prototype.removeLink = function (node) {
        var link = this.links.getValueByCondition(function (list_node) { if (list_node.value.to === node) {
            return true;
        } });
        if (!link)
            throw new Error("no such link");
        this.links.removeByValue(link);
    };
    GraphNode.prototype.removeDualLink = function (node) {
        var _this = this;
        var link1 = this.links.getValueByCondition(function (list_node) { if (list_node.value.to === node) {
            return true;
        } });
        var link2 = node.links.getValueByCondition(function (list_node) { if (list_node.value.to === _this) {
            return true;
        } });
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
    return Graph;
}());
exports.Graph = Graph;

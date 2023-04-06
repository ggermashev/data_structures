import {LinkedList} from "./LinkedList";

class Link<T> {
    to: GraphNode<T>
    cost: number

    constructor(to:GraphNode<T>, cost: number) {
        this.to = to
        this.cost = cost
    }

    toString() {
        let res = `to: ${this.to.value.toString()} cost: ${this.cost}`
        return res
    }
}

class GraphNode<T> {
    private _value: T
    private links: LinkedList<Link<T>>

    set value(value: T) {
        this._value = value
    }

    get value() {
        return this._value
    }

    constructor(value: T) {
        this.value = value
        this.links = new LinkedList<Link<T>>()
    }


    addLink(node: GraphNode<T>, cost: number) {
        let link = new Link<T>(node, cost)
        if (!this.links.getValueByCondition(node_list => {return node_list.value.to === link.to})) {
            this.links.append(link)
        } else {
            throw new Error("Link already exists")
        }
    }

    addDualLink(node: GraphNode<T>, cost: number) {
        let link1 = new Link<T>(node, cost)
        let link2 = new Link(this, cost)
        if (!this.links.getValueByCondition(node_list => {return node_list.value.to === link1.to}) &&
            !node.links.getValueByCondition(node_list => {return node_list.value.to === link2.to})) {
            this.links.append(link1)
            node.links.append(link2)
        } else {
            throw new Error("Dual link already exists")
        }

    }

    removeLink(node: GraphNode<T>) {
        let link = this.links.getValueByCondition((list_node) => {if (list_node.value.to === node) {return true}})
        if (!link) throw new Error("no such link")
        this.links.removeByValue(link)
    }

    removeDualLink(node: GraphNode<T>) {
        let link1 = this.links.getValueByCondition((list_node) => {if (list_node.value.to === node) {return true}})
        let link2 = node.links.getValueByCondition((list_node) => {if (list_node.value.to === this) {return true}})
        if (!link1 || !link2) {
            throw new Error("no such links")
        }
        this.links.removeByValue(link1)
        node.links.removeByValue(link2)
    }

    toString() {
        let res = `\n${this.value.toString()} links:${this.links.toString()}`
        return res
    }
}


export class Graph<T> {
    nodes: LinkedList<GraphNode<T>>
    count: number

    constructor() {
        this.nodes = new LinkedList<GraphNode<T>>()
    }

    addNode(value: T) {
        this.nodes.append(new GraphNode(value))
        this.count += 1
    }

    removeNode(value: T) {
        let node = this.nodes.getValueByCondition(nd => {return nd.value.value == value})
        this.nodes.removeByValue(node)
        let current_node = this.nodes.head
        while (current_node) {
            try {
                current_node.value.removeLink(node)
            } catch (e) {}
            current_node = current_node.next
        }
    }

    addLink(from: T, to:T, cost: number) {
        let node_from = this.nodes.getValueByCondition((list_node) => list_node.value.value === from)
        let node_to = this.nodes.getValueByCondition((list_node) => list_node.value.value === to)
        // console.log(node_from.toString())
        node_from.addLink(node_to, cost)
    }

    addDualLink(from: T, to: T, cost: number) {
        let node_from = this.nodes.getValueByCondition((list_node) => list_node.value.value == from)
        let node_to = this.nodes.getValueByCondition((list_node) => list_node.value.value == to)
        node_from.addDualLink(node_to, cost)
    }

    removeLink(from: T, to: T) {
        let node_from = this.nodes.getValueByCondition((list_node) => list_node.value.value == from)
        let node_to = this.nodes.getValueByCondition((list_node) => list_node.value.value == to)
        node_from.removeLink(node_to)
    }

    removeDualLink(from: T, to: T) {
        let node_from = this.nodes.getValueByCondition((list_node) => list_node.value.value == from)
        let node_to = this.nodes.getValueByCondition((list_node) => list_node.value.value == to)
        node_from.removeDualLink(node_to)
    }

    toString() {
        return this.nodes.toString()
    }
}
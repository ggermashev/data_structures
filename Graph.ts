import {LinkedList} from "./LinkedList";


class Link<T> {
    public from: GraphNode<T>
    public to: GraphNode<T>
    public cost: number

    constructor(from: GraphNode<T>, to: GraphNode<T>, cost: number) {
        this.from = from
        this.to = to
        this.cost = cost
    }

    toString() {
        let res = `from: ${this.from.value.toString()} to: ${this.to.value.toString()} cost: ${this.cost}`
        return res
    }
}


class Way<T> extends Link<T> {
    private _totalCost: number
    private _chain: LinkedList<GraphNode<T>>
    private length: number

    constructor(from: GraphNode<T>, to: GraphNode<T>, cost: number, totalCost?: number, chain?: LinkedList<GraphNode<T>>) {
        super(from, to, cost);
        this.totalCost = totalCost ?? cost
        // console.log(from.toString())
        if (!chain) {
            this._chain = new LinkedList<GraphNode<T>>()
            this._chain.append(from)
            this._chain.append(to)
        } else {
            if (chain.getValueByCondition(list_node => {
                return list_node.value.value == to.value
            })) {
                return null
            }
            this._chain = chain.copy()
            this._chain.append(to)
        }
    }

    set totalCost(cost: number) {
        this._totalCost = cost
    }

    get totalCost() {
        return this._totalCost
    }

    get chain() {
        return this._chain
    }

    toString() {
        if (this.chain) {
            return `totalCost: ${this.totalCost} chain: ${this.chain.toString()}\n`
        } else {
            return ""
        }
    }
}


class GraphNode<T> {
    private _value: T
    private _links: LinkedList<Link<T>>

    set value(value: T) {
        this._value = value
    }

    get value() {
        return this._value
    }

    get links() {
        return this._links
    }

    constructor(value: T) {
        this.value = value
        this._links = new LinkedList<Link<T>>()
    }


    addLink(node: GraphNode<T>, cost: number) {
        let link = new Link<T>(this, node, cost)
        if (!this.links.getValueByCondition(node_list => {
            return node_list.value.to === link.to
        })) {
            this.links.append(link)
        } else {
            throw new Error("Link already exists")
        }
    }

    addDualLink(node: GraphNode<T>, cost: number) {
        let link1 = new Link<T>(this, node, cost)
        let link2 = new Link(node, this, cost)
        if (!this.links.getValueByCondition(node_list => {
                return node_list.value.to === link1.to
            }) &&
            !node.links.getValueByCondition(node_list => {
                return node_list.value.to === link2.to
            })) {
            this.links.append(link1)
            node.links.append(link2)
        } else {
            throw new Error("Dual link already exists")
        }

    }

    removeLink(node: GraphNode<T>) {
        let link = this.links.getValueByCondition((list_node) => {
            if (list_node.value.to === node) {
                return true
            }
        })
        if (!link) throw new Error("no such link")
        this.links.removeByValue(link)
    }

    removeDualLink(node: GraphNode<T>) {
        let link1 = this.links.getValueByCondition((list_node) => {
            if (list_node.value.to === node) {
                return true
            }
        })
        let link2 = node.links.getValueByCondition((list_node) => {
            if (list_node.value.to === this) {
                return true
            }
        })
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
        let node = this.nodes.getValueByCondition(nd => {
            return nd.value.value == value
        })
        this.nodes.removeByValue(node)
        let current_node = this.nodes.head
        while (current_node) {
            try {
                current_node.value.removeLink(node)
            } catch (e) {
            }
            current_node = current_node.next
        }
    }

    addLink(from: T, to: T, cost: number) {
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

    getShortestWay(from: T, to: T) {
        let current_node = this.nodes.getValueByCondition(list_node => {
            return list_node.value.value == from
        })
        let queue = new LinkedList<GraphNode<T>>()
        queue.append(current_node)
        let ways = new LinkedList<Way<T>>()
        while (queue.length > 0) {
            let current_link = queue.getFirst().links.head
            queue.removeFront()
            while (current_link) {
                let continue_ways = ways.getValuesByCondition(list_node => {
                    return list_node.value.to.value === current_link.value.from.value
                })

                if (continue_ways.length === 0) {
                    let next_way = new Way(current_link.value.from, current_link.value.to, current_link.value.cost)
                    if (next_way.from.value !== to) {
                        ways.prepend(next_way)
                        queue.append(current_link.value.to)
                    }
                } else {
                    let way = continue_ways.head
                    while (way) {
                        // ways.removeByValue(way.value)
                        let next_way = new Way(current_link.value.from, current_link.value.to, current_link.value.cost,
                            way.value.totalCost + current_link.value.cost, way.value.chain)
                        if (next_way.from.value !== to) {
                            ways.prepend(next_way)
                            queue.append(current_link.value.to)
                        }
                        way = way.next
                    }
                }
                current_link = current_link.next
            }
        }
        let min_way = ways.head
        let current_way = ways.head
        while (current_way) {
            if (current_way.value.to.value == to) {
                if (current_way.value.totalCost < min_way.value.totalCost) {
                    min_way = current_way
                }
            }
            current_way = current_way.next
        }
        return min_way.value.chain
    }

}
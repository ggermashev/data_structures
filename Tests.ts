import {LinkedList} from "./LinkedList";
import {Graph} from "./Graph";

function testLinkedList() {
    let list = new LinkedList<number>()
    list.append(2)
    list.append(3)
    list.prepend(1)
    list.insert(4,1)
    console.log("Добавили",list.toString())
    list.removeFront()
    list.removeBack()
    console.log("Удалили первый и последний",list.toString())
    list.insert(5,1)
    console.log("Добавили второй элемент", list.toString())
    console.log("Второй элемент", list.getValue(1))
    console.log("Первый элемент", list.getFirst())
    console.log("Последний элемент", list.getLast())
}

function testGraph() {
    try {
        let graph = new Graph<number>()
        graph.addNode(1)
        graph.addNode(2)
        graph.addNode(3)
        graph.addLink(1, 2, 1)
        graph.addLink(1, 3, 2)
        graph.addLink(2, 3, 3)
        console.log(graph.toString())
        graph.removeLink(1, 3)
        console.log("удалили 1-3\n", graph.toString())
        graph.addDualLink(1, 3, 4)
        console.log("Добавили двойную связь 1-3\n", graph.toString())
        try {
            graph.addLink(1, 3, 5)
            console.log("Повторно добавили связь 1-3\n", graph.toString())
        } catch(e) {console.log(e.message)}
        graph.removeNode(3)
        console.log("Удалили узел 3", graph.toString())
        graph.removeNode(2)
        console.log("Удалили узел 2", graph.toString())
        graph.removeNode(1)
        console.log("Удалили узел 1", graph.toString())
        graph.addNode(1)
        graph.addNode(2)
        graph.addNode(3)
        graph.addNode(4)
        graph.addLink(1,2,1)
        graph.addLink(2,4,2)
        graph.addLink(4,3, 1)
        graph.addLink(1,4,5)
        console.log("Добавили связи", graph.toString())
        let shortestWay = graph.getShortestWay(1,4)
        console.log("Кратчайший путь 1-4:\n", shortestWay.toString())
    } catch(e) {
        console.log(e.message)
    }
}


// testLinkedList()
testGraph()
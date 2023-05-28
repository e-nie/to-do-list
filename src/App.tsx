import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v4} from "uuid";
import {AddItemForm} from "./AddItemForm";

export type FilterValuesType = 'all' | 'completed' | 'active'
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

type TasksStateType = {
    [key: string]: Array<TaskType>
}

function App() {

    function removeTask(id: string, todolistId: string) {
        let tasks = tasksObj[todolistId]
        let filteredTasks = tasks.filter(t => t.id !== id)
        tasksObj[todolistId] = filteredTasks
        setTasks({...tasksObj})
    }

    function addTask(title: string, todolistId: string) {
        let newTask = {id: v4(), title: title, isDone: false}
        let tasks = tasksObj[todolistId]
        let newTasks = [newTask, ...tasks]
        tasksObj[todolistId] = newTasks
        setTasks({...tasksObj})
    }


    const changeStatus = (taskId: string, isDone: boolean, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.isDone = isDone
            setTasks({...tasksObj})
        }
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todolistId: string) => {
        let tasks = tasksObj[todolistId]
        let task = tasks.find(t => t.id === taskId)
        if (task) {
            task.title = newTitle
            setTasks({...tasksObj})
        }
    }

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId)
        if (todolist) {
            todolist.filter = value
            setTodolists([...todolists])
        }
    }

    let todolistId1 = v4()
    let todolistId2 = v4()

    let [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to buy', filter: 'all'},
    ])

    let removeTodolist = (todolistId: string) => {
        let filteredTodolist = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(filteredTodolist)
        delete tasksObj[todolistId]
        setTasks({...tasksObj})
    }

    const changeTodolistTitle = (id: string, newTitle: string) => {
        const todolist = todolists.find(tl => tl.id === id)
        if(todolist) {
            todolist.title = newTitle
            setTodolists([...todolists])
        }
    }

    let [tasksObj, setTasks] = useState<TasksStateType>({
        [todolistId1]: [
            {id: v4(), title: 'HTML&CSS', isDone: true},
            {id: v4(), title: 'Redux', isDone: false},
            {id: v4(), title: 'REST API', isDone: false},
            {id: v4(), title: 'GraphQL', isDone: false},
            {id: v4(), title: 'Unit Tests', isDone: false},
            {id: v4(), title: 'AWS', isDone: false},
        ],
        [todolistId2]: [
            {id: v4(), title: 'Book', isDone: false},
            {id: v4(), title: 'Course', isDone: false},
            {id: v4(), title: 'Oranges', isDone: false},
            {id: v4(), title: 'Abo', isDone: false},
            {id: v4(), title: 'Milk', isDone: false},
        ]
    })

    function addToDolist(title: string) {
        let todolist: TodolistType = {
            id: v4(),
            filter: "all",
            title: title
        }
        setTodolists([todolist, ...todolists])
        setTasks({
            ...tasksObj,
            [todolist.id]: []
        })
    }

    return (
        <div className = "App">
            <AddItemForm addItem = {addToDolist} />
            {
                todolists.map((tl) => {
                    let tasksForTodolist = tasksObj[tl.id]
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(t => t.isDone)
                    }
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(t => !t.isDone)
                    }
                    return <Todolist
                        key = {tl.id}
                        id = {tl.id}
                        title = {tl.title}
                        tasks = {tasksForTodolist}
                        removeTask = {removeTask}
                        changeFilter = {changeFilter}
                        addTask = {addTask}
                        changeTaskStatus = {changeStatus}
                        changeTaskTitle = {changeTaskTitle}
                        filter = {tl.filter}
                        removeTodolist = {removeTodolist}
                        changeTodolistTitle={changeTodolistTitle}
                    />
                })
            }
        </div>
    );
}

export default App;

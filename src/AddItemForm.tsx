import React, {ChangeEvent, KeyboardEvent, useState} from "react";

type addItemFormPropsType = {
    addItem: (title: string) => void
 }
export const AddItemForm = (props: addItemFormPropsType) => {
    let [newTaskTitle, setNewTaskTitle] = useState('')
    let [error, setError] = useState<string | null>(null)
    const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value)
    }
    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const addTask = () => {
        debugger
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Field is required')
        }
    }
    return <div>
        <input value = {newTaskTitle}
               onChange = {onNewTitleChangeHandler}
               onKeyPress = {onKeyPressHandler}
               className = {error ? 'error' : ''} />
        <button onClick = {addTask}> +</button>
        {error && <div className = 'error-message'>{error}</div>}
    </div>
}
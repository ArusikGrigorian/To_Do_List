import React from 'react';
import "../App.css";
import AddTask from "./AddTask";
import TodoList from "./TodoList";
// import Search from './Search';
// import Filter from './Filter';
import uniqId from 'uniqid';
import { db, auth } from '../firebase';


class ToDoApp extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            searchValue: "",
            inputValue: "",
            tasks: [],

            filterValue: "all"
        }
    }

    async componentDidMount() {
        try {
            const todoRef = db.collection('users').doc(auth.currentUser.uid);
            const collection = await todoRef.get();
            //     debugger
            //     const tasksFromDb = [];

            //     collection.docs.forEach(doc => {
            //         const task = {
            //             id: doc.id,
            //             ...doc.data()
            //         };
            //         tasksFromDb.push(task)
            //     })

            this.setState({
                tasks: collection.data().toDoItems
            })

        } catch (e) {
            //alert(e.message)
        }
    }

    onFilterChange = (filterValue) => {
        this.setState({
            filterValue
        })
    }
    handleInput = (e) => {
        this.setState({ searchValue: e.target.value });
    };

    handleChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };

    handleClick = () => {
        const newData = {

            name: this.state.inputValue,
            done: false,
            deleted: false,
            id: uniqId()
        }
        const id = uniqId();
        db.collection('users').doc(auth.currentUser.uid).update({
            email: auth.currentUser.email,
            toDoItems: [...this.state.tasks, newData]
        })
            .then(() => {
                const newTasks = [...this.state.tasks];
                newTasks.push({
                    ...newData,
                    id
                });
                this.setState({
                    tasks: newTasks,
                    inputValue: ""
                })

            }).catch(() => alert('something went wrong'))

    };
    onTaskToggle = (id) => {
        const newTasks = [...this.state.tasks];
        const current = newTasks.find(item => item.id === id);
        const currentIndex = newTasks.indexOf(current);
        db.collection('todo-items').doc(id).update({
            done: !current.done
        }).then(() => {
            newTasks.splice(currentIndex, 1, {
                ...current,
                done: !current.done
            });

            this.setState({ tasks: newTasks })

        }).catch(() => alert('can not update'));


    };
    onTaskDelete = (id) => {
        const exactRef = db.collection('todo-items').doc(id).delete()
            .then(() => {
                const newTasks = [...this.state.tasks];
                const currentIndex = newTasks.findIndex(item => item.id === id);
                // newTasks[currentIndex].deleted = true;
                newTasks.splice(currentIndex, 1)

                this.setState({ tasks: newTasks })
                alert('delete success')
            }).catch(() => {
                alert('can not delete')
            });


    };


    render() {

        return (
            <>
                <AddTask handleClick={this.handleClick} handleChange={this.handleChange}
                    inputValue={this.state.inputValue} />
                {/* <Search handleInput={this.handleInput} searchValue={this.state.searchValue} />
<Filter onFilterChange={this.onFilterChange} /> */}
                <TodoList onTaskDelete={this.onTaskDelete} onTaskToggle={this.onTaskToggle}
                    tasks={this.state.tasks} searchValue={this.state.searchValue}
                    filterValue={this.state.filterValue} />
            </>
        );

    }

}

export default ToDoApp;
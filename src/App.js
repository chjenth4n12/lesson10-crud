import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm';
import TaskControl from './components/TaskControl';
import TaskList from './components/TaskList';
// import _ from 'lodash';
import { findIndex, filter } from 'lodash';

class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            tasks : [],//id: unique, name, status
            isDisplayForm : false,
            taskEditing : null,
            filterName : '', 
            filterStatus : -1,
            keyWord : '',
            sortBy : 'name',
            sortValue : 1
        }
    }

    componentWillMount () {
        if (localStorage && localStorage.getItem('tasks')) {
            var task = JSON.parse(localStorage.getItem('tasks'));
            this.setState({
                tasks : task
            });
        }
    }

    s4() {
        return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
    }

    generateID () {
        return this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
    }
    
    onToggleForm = () => {
        if (this.state.isDisplayForm && this.state.taskEditing !== null) {
            this.setState ({
                isDisplayForm : true,
                taskEditing : null
            });
        } else {
            this.setState ({
                isDisplayForm : !this.state.isDisplayForm,
                taskEditing : null
            });
        }
    }

    onCloseForm = () => {
        this.setState ({
            isDisplayForm : false
        });
    }

    onShowForm = () => {
        this.setState ({
            isDisplayForm : true
        });
    }

    onSubmit = (state) => {
        var { tasks } = this.state;
        if (state.id !== '') {
            var index = this.findIndex(state.id);
            if (index !== -1) {
                tasks[index] = state;
            }
        } else {
            state.id = this.generateID();
            tasks.push(state);
        }
        this.setState ({
            tasks : tasks,
            taskEditing : null
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    onClickStatus = (id) => {
        var { tasks } = this.state;
        // tu viet
        // var index = this.findIndex(id);
        //dung thu vien lodash
        // var index = _.findIndex(tasks, (task) => {
        //     return task.id === id;
        // });
        //dung thu vien lodash
        var index = findIndex(tasks, (task) => {
            return task.id === id;
        });
        if (index !== -1) {
            tasks[index].status = !tasks[index].status;
            this.setState({
                tasks : tasks
            });
        }
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    findIndex = (id) => {
        var { tasks } = this.state;
        var result = -1;
        tasks.forEach((task, index) => {
            if (task.id === id) {
                result = index;
            }
        });
        return result;
    }

    onDeleteItem = (id) => {
        var { tasks } = this.state;
        var index = this.findIndex(id);
        if (index !== -1) {
            //Phương thức splice() thay đổi phần tử của mảng bằng cách xóa phần tử đang tồn tại và/hoặc thêm phần tử mới.
            tasks.splice(index, 1);
            //Phương thức unshift() thêm một hoặc nhiều phần tử vào vị trí đầu mảng sau đó trả về chiều dài của mảng mới.
            //tasks.unshift();
            this.setState({
                tasks : tasks
            });
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        this.onCloseForm();
    }

    onUpdate = (task) => {
        var { tasks } = this.state;
        var index = this.findIndex(task.id);
        var taskEditing = tasks[index];
        this.setState({
            taskEditing : taskEditing
        });
        this.onShowForm();
    }

    onFilter = (filterName, filterStatus) => {
        filterStatus = parseInt(filterStatus, 10);
        this.setState ({
            filterName : filterName.toLowerCase(),
            filterStatus: filterStatus
        });
    }

    onSearch = (keyWord) => {
        this.setState({
            keyWord : keyWord.toLowerCase()
        });
    }

    onSort = (sortBy, sortValue) => {
        this.setState ({
            sortBy : sortBy,
            sortValue : sortValue
        });
    }

    render() {

        var { tasks, isDisplayForm, taskEditing, keyWord, filterName, filterStatus, sortBy, sortValue } = this.state; // var tasks = this.state.tasks; var isDisplayForm = this.state.isDisplayForm;
        if (filterName) {
            tasks = tasks.filter((task) =>{
                return task.name.toLowerCase().indexOf(filterName) !== -1;
            });
        }
        tasks = tasks.filter((task) => {
            if (filterStatus === -1) {
                return task;
            } else {
                return task.status === (filterStatus === 1 ? true : false);
            }
        });
        if (keyWord) {
            // tasks = tasks.filter((task) => {
            //     return task.name.toLowerCase().indexOf(keyWord) !== -1;
            // });
            // tasks = _.filter(tasks, (task) => {
            //     return task.name.toLowerCase().indexOf(keyWord) !==-1;
            // });
            tasks = filter(tasks, (task) => {
                return task.name.toLowerCase().indexOf(keyWord) !==-1;
            });
        }
        if (sortBy === 'name') {
            tasks.sort((a, b) => {
                if (a.name > b.name) return sortValue;
                else if (a.name < b.name) return -sortValue;
                else return 0;
            });
        } else {
            tasks.sort((a, b) => {
                if (a.status > b.status) return -sortValue;
                else if (a.status < b.status) return sortValue;
                else return 0;
            });
        }
        var elmTaskForm = isDisplayForm ? <TaskForm onSubmit={ this.onSubmit } onCloseForm={ this.onCloseForm } task={ taskEditing }/> : '';
        return (
        
            <div className="container">
                <div className="text-center">
                    <h1>Quản Lý Công Việc</h1><hr/>
                </div>
                <div className="row">
                    <div className={ isDisplayForm === true ? 'col-xs-4 col-sm-4 col-md-4 col-lg-4' : ''}>
                        {/*Form*/}
                        { elmTaskForm }
                    </div>
                    <div className={ isDisplayForm === true ? 'col-xs-8 col-sm-8 col-md-8 col-lg-8' : 'col-xs-12 col-sm-12 col-md-12 col-lg-12' }>
                        <button type="submit" className="btn btn-primary" onClick={ this.onToggleForm }>
                            <span className="fa fa-plus mr-5"></span>Thêm Công Việc
                        </button>
                        {/* Search - Sort */}
                        <TaskControl onSearch={ this.onSearch } onSort={ this.onSort } sortBy={ sortBy } sortValue={ sortValue }/>
                        {/* List */}
                        <div className="row mt-15">
                            <TaskList 
                                tasks={ tasks } 
                                onUpdateStatus={ this.onClickStatus } 
                                onDeleteItem={ this.onDeleteItem } 
                                onUpdate={ this.onUpdate }
                                onFilter={ this.onFilter }
                            />
                        </div>
                    </div>
                </div>
            </div>
        
        );
    }
}

export default App;

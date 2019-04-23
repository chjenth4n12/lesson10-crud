import React, { Component } from 'react';

class TaskItem extends Component {

    onUpdateStatus = () => {
        this.props.onUpdateStatus(this.props.task.id);
    }

    onDeleteItem = () => {
        this.props.onDeleteItem(this.props.task.id);
    }

    onUpdate = () => {
        this.props.onUpdate(this.props.task);
    }

    render() {

        var { task, index } = this.props;

        return (
            <tr>
                <td>{ index + 1 }</td>
                <td>{ task.name }</td>
                <td className="text-center">
                    <span 
                        className={ task.status === true ? 'label label-success' : 'label label-danger' }
                        onClick={this.onUpdateStatus}
                    >
                        { task.status === true ? 'Kích Hoạt' : 'Ẩn' }
                    </span>
                </td>
                <td className="text-center">
                    <button type="submit" className="btn btn-warning" onClick={ this.onUpdate }>
                        <span className="fa fa-pencil mr-5"></span>Sửa
                    </button>&nbsp;
                    <button type="submit" className="btn btn-danger" onClick={ this.onDeleteItem }>
                        <span className="fa fa-trash mr-5"></span>Xóa
                    </button>
                </td>
            </tr>
        );
    }
}

export default TaskItem;

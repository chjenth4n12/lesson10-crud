import React, { Component } from 'react';

class TaskForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id : '',
            name : '',
            status : false
        }
    }

    onClose = () => {
        this.props.onCloseForm();
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value = target.value;
        if (name === 'status') {
            value = target.value === 'true' ? true : false;
        }
        this.setState ({
            [name] : value
        });
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.onSubmit(this.state);
        //cancel and close form
        this.onClear();
        this.onClose();
    }

    onClear = () => {
        this.setState({
            name : '',
            status : false
        });
    }

    componentWillMount() {
        if (this.props.task) {
            this.setState ({
                id : this.props.task.id,
                name : this.props.task.name,
                status : this.props.task.status
            });
        }
    }

    componentWillReceiveProps (props) {
        if (props && props.task) {
            this.setState ({
                id : props.task.id,
                name : props.task.name,
                status : props.task.status
            });
        } else if (!props.task) {
            this.setState ({
                id : '',
                name : '',
                status : false
            });
        }
    }

    render() {

        var { id } = this.state;

        return (
            <div className="panel panel-warning">
                <div className="panel-heading">
                        <h3 className="panel-title">
                            { id ? 'Cập Nhật Công Việc' : 'Thêm Công Việc' }
                            <span 
                                className="fa fa-times-circle text-right"
                                onClick={ this.onClose }
                            ></span>
                        </h3>
                </div>
                <div className="panel-body">
                    <form onSubmit={ this.onSubmit }>
                        <div className="form-group">
                            <label>Tên</label>
                            <input type="text" className="form-control" id="" name="name" value={this.state.name} onChange={this.onChange} />
                        </div>
                        <label>Trang Thái</label>
                        <select name="status" className="form-control" value={this.state.status} onChange={this.onChange}>
                            <option value={true}>Kích Hoạt</option>
                            <option value={false}>Ẩn</option>
                        </select><br/>
                        <div className="text-center">
                            <button type="submit" className="btn btn-warning">
                                <span className="fa fa-plus mr-5"></span>Lưu
                            </button>&nbsp;
                            <button type="button" className="btn btn-danger" onClick={this.onClear}>
                                <span className="fa fa-close mr-5"></span>Hủy
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default TaskForm;

const React = require('react');
const ActionCreator = require('../actions/TodoActionCreators');
const mui = require('material-ui');

let {Checkbox} = mui;

let Task = React.createClass({
  getDefaultProps() {
    return {
      task: {
        title: ''
      }
    };
  },

  handleToggle(task) {
    if (this.refs.checkbox.isChecked()) {
      task.completed = true;
      ActionCreator.completeTask(task);
    }
  },

  render() {
    let {task} = this.props;
    return (
      <Checkbox name="checkboxName" ref="checkbox" value="on" label={task.title} onCheck={this.handleToggle.bind(this, task)}/>
    );
  }
});

module.exports = Task;

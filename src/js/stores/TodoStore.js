const AppDispatcher = require('../dispatchers/AppDispatcher');
const Constants = require('../constants/AppConstants');
const BaseStore = require('./BaseStore');
const assign = require('object-assign');

// data storage
let _data = [];

// add private functions to modify data
function addItem(title, completed=false) {
  _data.push({title, completed});
}
function removeItem(task) {
  var index = _data.indexOf(task);
  _data.splice(index, 1);
}
function removeAll() {
  _data.splice(0, _data.length);
}

// Facebook style store creation.
let TodoStore = assign({}, BaseStore, {

  // public methods used by Controller-View to operate on data
  getAll() {
    return {
      tasks: _data
    };
  },

  // register store with dispatcher, allowing actions to flow through
  dispatcherIndex: AppDispatcher.register(function(payload) {
    let action = payload.action;
    switch(action.type) {
      case Constants.ActionTypes.ADD_TASK:
        let text = action.text.trim();
        // NOTE: if this action needs to wait on another store:
        // AppDispatcher.waitFor([OtherStore.dispatchToken]);
        // For details, see: http://facebook.github.io/react/blog/2014/07/30/flux-actions-and-the-dispatcher.html#why-we-need-a-dispatcher
        if (text !== '') {
          addItem(text);
          TodoStore.emitChange();
        }
        break;
      case Constants.ActionTypes.REMOVE_ALL:
        removeAll();
        TodoStore.emitChange();
        break;
      case Constants.ActionTypes.COMPLETE_TASK:
        let task = action.task;
        removeItem(task);
        TodoStore.emitChange();
        console.log(task);
        break;
      // add more cases for other actionTypes...
    }
  })

});

module.exports = TodoStore;

var AppDispatcher = require('../dispatchers/AppDispatcher');
var Constants = require('../constants/AppConstants');

module.exports = {

  addItem: function(text) {
    AppDispatcher.handleViewAction({
      type: Constants.ActionTypes.ADD_TASK,
      text: text
    });
  },

  clearList: function() {
      AppDispatcher.handleViewAction({
        type: Constants.ActionTypes.REMOVE_ALL
    });
  },

  completeTask: function(task) {
      AppDispatcher.handleViewAction({
        type: Constants.ActionTypes.COMPLETE_TASK,
        task: task
    });
  }

};

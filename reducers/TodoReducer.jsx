const initialState = {
  list: [],
};
const TodoReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TODO":
      const { id, data } = action.payload;
      return {
        ...state,
        list: [
          ...state.list,
          {
            id: id,
            data: data,
          },
        ],
      };

    case "DELETE_TODO":
      const newList = state.list.filter((value) => value.id !== action.id);
      return {
        ...state,
        list: newList,
      };
    case "REMOVE_COMPLETED_TODO":
      const incompleteTasks = state.list.filter((value) => !value.checked);
      return {
        ...state,
        list: incompleteTasks,
      };
    case "TOGGLE_TODO_CHECK":
      const updatedList = state.list.map((task) =>
        task.id === action.id ? { ...task, checked: !task.checked } : task
      );
      return {
        ...state,
        list: updatedList,
      };
    case "SET_TODO_LIST":
      return {
        ...state,
        list: action.payload,
      };
    default:
      return state;
  }
};

export default TodoReducer;

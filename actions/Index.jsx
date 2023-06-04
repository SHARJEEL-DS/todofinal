export const addTodo=(data)=>
{
    return {
        type:"ADD_TODO",
        payload:{
            id: new Date().getTime().toString(),
            data:data
        }
    }
}
 

export const deleteTodo = (id) =>{
    return {
        type:"DELETE_TODO",
        id
    }
}

export const removeTodo = () => {
    return {
      type: "REMOVE_COMPLETED_TODO"
    };
  };

export const toggleTodoCheck = (id) => {
    return {
      type: "TOGGLE_TODO_CHECK",
      id
    };
  };
export const setTodoList = (list) => {
  return {
    type: "SET_TODO_LIST",
    payload: list,
  };
};
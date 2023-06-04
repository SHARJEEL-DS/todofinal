import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { GetServerSideProps } from "next";
// import { resetServerContext } from "react-beautiful-dnd";
// import { DndWrapper } from "../../components/DndWrapper";/

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import {
  addTodo,
  deleteTodo,
  removeTodo,
  toggleTodoCheck,
  setTodoList,
} from "/actions/Index";


import {AiOutlineCloseCircle} from "react-icons/ai"

const Todo = () => {
  const [inputData, setInputData] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const list = useSelector((state) => state.TodoReducer.list);
  const dispatch = useDispatch();

  const handleForm = (e) => {
    e.preventDefault();
    dispatch(addTodo(inputData), setInputData(""));
    setInputData("");
  };

  const handleActiveFilter = () => {
    setActiveFilter("active");
  };
  const handleCompletedFilter = () => {
    setActiveFilter("completed");
  };
  const handleAllFilter = () => {
    setActiveFilter("all");
  };
  const handleClearCompleted = () => {
    dispatch(removeTodo());
  };
  useEffect(() => {
    const savedList = localStorage.getItem("todoList");
    if (savedList) {
      dispatch(setTodoList(JSON.parse(savedList)));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem("todoList", JSON.stringify(list));
  }, [list]);
  const uncheckedTasksCount = list.filter((task) => !task.checked).length;

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const items = Array.from(list);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    dispatch(setTodoList(items));

  };

  return (
    <div className="  pt-[40px] grid sm:grid-cols-1 sm:px-2 grid-cols-3 ">
      <div></div>
      <div>
        <div className="mt-28">
          <p className="  text-[35px] font-bold tracking-[10px] sm:[15px] text-white ">
            todo
          </p>
        </div>
        <div className="bg-white rounded-[7px] ">
          <form onSubmit={handleForm} action="">
            <input
              type="text"
              placeholder="enter your todo"
              value={inputData}
              onChange={(e) => setInputData(e.target.value)}
              className="w-[100%] pl-4 py-4 rounded-[13px]  "
            />
          </form>
        </div>
        <div className=" mt-[20px] rounded-[13px] bg-white">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="todoList">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {list.map((value, index) => (
                    <Draggable
                      key={value.id}
                      draggableId={value.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          {activeFilter === "active" && value.checked ? null : (
                            <>
                              {activeFilter === "completed" &&
                              !value.checked ? null : (
                                <div
                                  className="flex border-b-1 field rounded-[4px] border flex-row py-3 px-3 items-center text-sm font-medium  leading-5
                             hover:bg-gray-100"
                                >
                                  <div className="flex items-center">
                                    <input
                                      type="checkbox"
                                      className="rounded-[4px] border-[1px] border-[#9CA3AF]  text-[20px] "
                                      onChange={() =>
                                        dispatch(toggleTodoCheck(value.id))
                                      }
                                      checked={value.checked}
                                    />
                                  </div>

                                  <div className="w-[80%]  ">
                                    <p
                                      className={`pl-[10px] text-[15px] ${
                                        value.checked ? "line-through" : ""
                                      }`}
                                    >
                                      {value.data}
                                    </p>
                                  </div>

                                  <div
                                    className="flex delete w-[30%] items-center justify-end"
                                    onClick={() =>
                                      dispatch(deleteTodo(value.id))
                                    }
                                  >
                                    <AiOutlineCloseCircle />
                                  </div>
                                </div>
                              )}
                            </>
                          )}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="flex flex-row py-3 justify-between px-2">
            <div>
              <p>
                {uncheckedTasksCount} item{uncheckedTasksCount !== 1 ? "s" : ""}{" "}
                left
              </p>
            </div>
            <div>
              {" "}
              <button
                className={activeFilter === "all" ? "text-[#6F96E2]" : ""}
                onClick={handleAllFilter}
              >
                All
              </button>
              <button
                className={
                  activeFilter === "active" ? "mx-4 text-[#6F96E2]" : "mx-4"
                }
                onClick={handleActiveFilter}
              >
                Active
              </button>
              <button
                onClick={handleCompletedFilter}
                className={activeFilter === "completed" ? "text-[#6F96E2]" : ""}
              >
                Completed
              </button>
            </div>
            <div>
              <button onClick={handleClearCompleted}>Clear Completed</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Todo;


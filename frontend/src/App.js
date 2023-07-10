import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import LoadingSpinner from "../src/components/UIElements/LoadingSpinner";
import {
  addToDo,
  getAllToDo,
  updateToDo,
  deleteToDo,
  baseUrl,
} from "./utils/HandleApi";

import classes from "./App.module.css";
function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [emptyToDo, setIsEmpty] = useState(false);
  const [addingToDo, setIsAdding] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  useEffect(() => {
    try {
      axios.get(baseUrl).then(({ data }) => {
        setToDo(data);
        setIsLoaded(true);
        if (data.length === 0) {
          setIsLoading(false);
          setIsEmpty(true);
        }
        if (data.length > 0) {
          setIsLoading(false);
          setIsEmpty(false);
        }
      });
    } catch (error) {
      console.error("Can not get data", error);
    }
  }, [toDo.length]);

  const actionToDo = async (e) => {
    if (!isUpdating && text.trim().length > 0) {
      setIsAdding(true);
      addToDo(text, setText, setToDo, setIsAdding);
    }
    if (isUpdating && text.trim().length > 0) {
      setIsAdding(true);
      updateToDo(toDoId, text, setToDo, setText, setIsUpdating, setIsAdding);
    }
    if (text.trim().length === 0) alert("Can not add empty field");
    setIsEmpty(false);
  };

  const updateMode = (_id, text) => {
    setIsUpdating(true);
    setText(text);
    setToDoId(_id);
  };
  const exitUpdating = () => {
    setIsUpdating(false);
    setText("");
  };
  const changeInputHandler = (event) => {
    setText(event.target.value);
  };

  return (
    <div className={classes.app}>
      <div className={classes.container}>
        <h1>ToDo App</h1>
        <div className={classes.top}>
          <input
            type="text"
            placeholder="Add ToDos..."
            value={text}
            onChange={changeInputHandler}
            autoFocus
          />

          <div className={classes.add} onClick={actionToDo}>
            {isUpdating ? "Update" : "Add"}
          </div>
          {isUpdating && (
            <div className={classes.add} onClick={exitUpdating}>
              Exit
            </div>
          )}
        </div>
        <div className={classes.list}>
          {!isLoading ? (
            toDo.map((item) => (
              <ToDo
                key={item._id}
                text={item.text}
                updateMode={() => updateMode(item._id, item.text)}
                deleteToDo={() => deleteToDo(item._id, setToDo, setIsAdding)}
              />
            ))
          ) : (
            <LoadingSpinner />
          )}
          {addingToDo && <LoadingSpinner />}
          {emptyToDo && <div className={classes.top}>No todos</div>}
        </div>
      </div>
    </div>
  );
}

export default App;

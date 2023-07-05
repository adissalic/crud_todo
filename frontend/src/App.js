import React from "react";
import { useEffect, useState } from "react";
import ToDo from "./components/ToDo";
import { addToDo, getAllToDo, updateToDo, deleteToDo } from "./utils/HandleApi";

import classes from "./App.module.css";
function App() {
  const [toDo, setToDo] = useState([]);
  const [text, setText] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [toDoId, setToDoId] = useState("");

  useEffect(() => {
    getAllToDo(setToDo);
  }, []);

  const actionToDo = (e) => {
    if (!isUpdating && text !== "") {
      addToDo(text, setText, setToDo);
    }
    if (isUpdating && text !== "") {
      updateToDo(toDoId, text, setToDo, setText, setIsUpdating);
    } else return alert("Can not add empty field");
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
  return (
    <div className={classes.app}>
      <div className={classes.container}>
        <h1>ToDo App</h1>
        <div className={classes.top}>
          <input
            type="text"
            placeholder="Add ToDos..."
            value={text}
            onChange={(e) => setText(e.target.value)}
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
          {toDo.map((item) => (
            <ToDo
              key={item._id}
              text={item.text}
              updateMode={() => updateMode(item._id, item.text)}
              deleteToDo={() => deleteToDo(item._id, setToDo)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

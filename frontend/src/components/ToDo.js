import React from "react";
import { BiEdit } from "react-icons/bi";
import { AiFillDelete } from "react-icons/ai";
import classes from "./ToDo.module.css";


const ToDo = ({ text, updateMode, deleteToDo }) => {

      return (
    <div className={classes.todo}>
      <div className={classes.text}>{text}</div>
      <div className={classes.icons}>
        <BiEdit className={classes.icon} onClick={updateMode} />
        <AiFillDelete className={classes.icon} onClick={deleteToDo} />
      </div>
      
    </div>
  );
};

export default ToDo;

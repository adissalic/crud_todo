import axios from "axios";

const baseUrl =
  "https://crud-todo-wrw1.onrender.com" || "http://localhost:4000";

const getAllToDo = (setToDo) => {
  try {
    axios.get(baseUrl).then(({ data }) => {
      setToDo(data);
    });
  } catch (error) {
    console.error("Can not get data", error);
  }

};
const addToDo = (text, setText, setToDo, setIsAdding) => {
  axios
    .post(`${baseUrl}/save`, { text })
    .then((data) => {
      console.log("Success, added", text);
      setText("");
      getAllToDo(setToDo);
      setIsAdding(false);
    })
    .catch((err) => console.log(err));
};

const updateToDo = (
  toDoId,
  text,
  setToDo,
  setText,
  setIsUpdating,
  setIsAdding
) => {
  axios
    .patch(`${baseUrl}/update`, { _id: toDoId, text })
    .then((data) => {
      console.log("Success, updated", text);
      setText("");
      getAllToDo(setToDo);
      setIsUpdating(false);
      setIsAdding(false);
    })
    .catch((err) => console.log(err));
};

const deleteToDo = (_id, setToDo, setIsAdding) => {
  setIsAdding(true);
  axios
    .delete(`${baseUrl}/delete`, { data: { _id } })
    .then(() => {
      console.log("Deleted");
      getAllToDo(setToDo);
      setIsAdding(false);
    })
    .catch((err) => console.log(err));
};

export { getAllToDo, addToDo, updateToDo, deleteToDo, baseUrl };

import axios from "axios";

const baseUrl =
  "https://crud-todo-wrw1.onrender.com" || "http://localhost:4000";

const getAllToDo = async (setToDo, setIsLoading, setIsEmpty) => {
  setIsLoading(true);
  axios.get(baseUrl).then(({ data }) => {
    setToDo(data);
    setIsLoading(false);
    if (data.length < 1) {
      setIsEmpty(true);
    } else setIsEmpty(false);
  });
};
const addToDo = (text, setText, setToDo, setIsLoading) => {
  axios
    .post(`${baseUrl}/save`, { text })
    .then((data) => {
      console.log("Success, added", text);
      setText("");
      getAllToDo(setToDo);
      setIsLoading(false);
    })
    .catch((err) => console.log(err));
};

const updateToDo = (
  toDoId,
  text,
  setToDo,
  setText,
  setIsUpdating,
  setIsLoading
) => {
  axios
    .patch(`${baseUrl}/update`, { _id: toDoId, text })
    .then((data) => {
      console.log("Success, updated", text);
      setText("");
      setIsUpdating(false);
      getAllToDo(setToDo);
      setIsLoading(false);
    })
    .catch((err) => console.log(err));
};

const deleteToDo = (_id, setToDo) => {
  axios
    .delete(`${baseUrl}/delete`, { data: { _id } })
    .then(() => {
      console.log("Deleted");
      getAllToDo(setToDo);
    })
    .catch((err) => console.log(err));
};

export { getAllToDo, addToDo, updateToDo, deleteToDo };

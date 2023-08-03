import "../main.css";

import { Calendar } from "primereact/calendar";

import { InputText } from "primereact/inputtext";
import SavedTask from "./SavedTask";
import { useEffect, useState } from "react";
import { updateDoc } from "firebase/firestore";
import { arrayRemove } from "firebase/firestore";
import { auth } from "./FirebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import { Toast } from "primereact/toast";
import { useRef } from "react";

const History = () => {
  const toast = useRef(null);
  const user = auth.currentUser;
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchFilter, setSearchFilter] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const savedTasksRef = doc(db, "tasks", user.uid + "S");
  const [savedTasks, setSavedTasks] = useState([]);

  const getSavedTasks = async () => {
    const docSnap = await getDoc(savedTasksRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setSavedTasks(docSnap.data().tasks);
    } else {
      console.log("No such document!");
    }
  };
  useEffect(() => {
    getSavedTasks();
  }, []);

  const handleFilterChange = (e) => {
    setSearchFilter(e.target.value);
  };

  const formatDate = (dateString) => {
    const [day, month, year] = dateString.split(".");
    return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
  };
  const checkDates = () => {
    if (startDate == "" || endDate == "") {
      showInfo("Dates are not picked");
      return false;
    } else {
      const start = formatDate(
        startDate.getDate() +
          "." +
          (startDate.getUTCMonth() + 1) +
          "." +
          startDate.getFullYear() +
          "."
      );

      const end = formatDate(
        endDate.getDate() +
          "." +
          (endDate.getUTCMonth() + 1) +
          "." +
          endDate.getFullYear() +
          "."
      );
      if (start <= end) {
        return true;
      } else {
        showInfo("Start date needs to be smaller than end date.");
        return false;
      }
    }
  };

  const filterResults = async () => {
    const dateOK = checkDates(startDate, endDate);
    if (searchFilter === "") {
      showInfo("Please enter a search word");
    } else if (dateOK) {
      if (isSearching) {
        const user = auth.currentUser;
        const taskRef = doc(db, "tasks", user.uid + "S");

        const docSnap = await getDoc(taskRef);
        const data = docSnap.data();
        setSearchFilter("");
        setIsSearching(false);
        setSavedTasks(data.tasks);
      } else {
        setIsSearching(true);
        const user = auth.currentUser;
        const taskRef = doc(db, "tasks", user.uid + "S");

        const docSnap = await getDoc(taskRef);
        const data = docSnap.data();
        const filteredTasks = data.tasks.filter((task) => {
          const taskDate = formatDate(task.date);
          return (
            ((taskDate >= startDate && taskDate <= endDate) ||
              taskDate.getTime() === startDate.getTime() ||
              taskDate.getTime() === endDate.getTime()) &&
            task.description.includes(searchFilter)
          );
        });

        setSavedTasks(filteredTasks);
        if (filteredTasks.length == 0) {
          showInfo("No tasks matched the criteria.");
        }
      }
    }
  };

  const showInfo = (message) => {
    toast.current.show({
      severity: "info",
      summary: "Info",
      detail: message,
    });
  };

  const showSuccess = (message) => {
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: message,
      life: 3000,
    });
  };
  const showError = (message) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: message,
      life: 3000,
    });
  };

  const editDescription = async (newDescription, timer, date, description) => {
    console.log(newDescription, timer, date, description);
    try {
      const user = auth.currentUser;
      const taskRef = doc(db, "tasks", user.uid + "S");

      const docSnap = await getDoc(taskRef);
      const data = docSnap.data();

      const targetIndex = data.tasks.findIndex(
        (task) =>
          task.timer === timer &&
          task.date === date &&
          task.description === description
      );

      if (targetIndex !== -1) {
        data.tasks[targetIndex].description = newDescription;

        await updateDoc(taskRef, { tasks: data.tasks });
        setSavedTasks(data.tasks);
        if (isSearching) {
          setIsSearching(!isSearching);
          setSearchFilter("");
        }

        showSuccess("Description edited successfully!");
      } else {
        console.log("Task not found with the specified criteria.");
      }
    } catch (error) {
      showError("Error happened during decription editing.");
    }
  };

  const deleteTaskFromFirestore = async (description, timer, date) => {
    console.log(description, timer, date);
    try {
      const user = auth.currentUser;
      const taskRef = doc(db, "tasks", user.uid + "S");

      const docSnap = await getDoc(taskRef);
      const data = docSnap.data();

      const updatedTasks = data.tasks.filter(
        (task, i) =>
          task.timer !== timer ||
          task.description !== description ||
          task.date !== date
      );

      await updateDoc(taskRef, { tasks: updatedTasks });

      setSavedTasks(updatedTasks);
      if (isSearching) {
        setIsSearching(!isSearching);
        setSearchFilter("");
      }

      showSuccess("Task deleted successfully!");
    } catch (error) {
      showError("Error during deleting task happened.");
    }
  };

  return (
    <div className="history">
      <div className="history-heading">
        <h2>Trackers History</h2>
      </div>
      <Toast ref={toast} position="top-right" />
      <div className="datesDesc">
        <div className="firstCalendar">
          <h5>Start date</h5>
          <Calendar
            className="calendar"
            value={startDate}
            onChange={(e) => setStartDate(e.value)}
            dateFormat="dd/mm/yy"
            showIcon
          />
        </div>
        <div>
          <h5>End date</h5>
          <Calendar
            className="calendar"
            value={endDate}
            onChange={(e) => setEndDate(e.value)}
            dateFormat="dd/mm/yy"
            showIcon
          />
        </div>
        <div className="third">
          <h5>Description contains</h5>
          <span className="p-input-icon-right">
            <i
              className={isSearching ? "pi pi-times" : "pi pi-search"}
              onClick={filterResults}
            />
            <InputText
              className="search"
              value={searchFilter}
              onChange={handleFilterChange}
              placeholder="Search"
              style={{
                marginLeft: "40px",
              }}
            />
          </span>
        </div>
      </div>
      <div className="finishedList">
        <div className="first">
          <h4>Date</h4>
        </div>
        <div className="second">
          <h4>Description</h4>
        </div>
        <div className="third">
          <h4>Time tracked</h4>
        </div>
        <div className="forth">
          <h4>Action</h4>
        </div>
      </div>
      {savedTasks.map((task, index) => {
        return (
          <SavedTask
            key={index}
            index={index}
            timer={task.timer}
            description={task.description}
            date={task.date.toString()}
            onDelete={(description, timer, date) =>
              deleteTaskFromFirestore(description, timer, date)
            }
            onEditDescription={(newDescription, timer, date, description) =>
              editDescription(newDescription, timer, date, description)
            }
          />
        );
      })}
    </div>
  );
};
export default History;

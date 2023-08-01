import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import { Button } from "primereact/button";
import NewTask from "./NewTask";
import { flushSync } from "react-dom";
import { makeAutoObservable } from "mobx";
import { makePersistable } from "mobx-persist-store";

import { Calendar } from "primereact/calendar";

import { Toast } from "primereact/toast";

import { InputText } from "primereact/inputtext";

const Trackers = () => {
  const [taskList, setTaskList] = useState([]);
  const toast = useRef(null);
  const [date, setDate] = useState(null);
  const [isEditing, setEditingIndex] = useState(false);
  const [isDescVisible, setIsDescVisible] = useState(false);
  const [description, setDescription] = useState();
  const [activeTaskIndex, setActiveTaskIndex] = useState(null);
  const [stoppedTasks, setStoppedTasks] = useState([]);

  const formatTime = (seconds) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, "0")}:${mins
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };
  useEffect(() => {
    console.log(activeTaskIndex);
    console.log(stoppedTasks);
    if (activeTaskIndex === taskList.length) {
      setActiveTaskIndex(taskList.length - 1);
      console.log(activeTaskIndex);
    }
  }, [taskList]);

  useEffect(() => {
    if (activeTaskIndex !== null) {
      const timerInterval = setInterval(() => {
        setTaskList((prevTasks) =>
          prevTasks.map((task, index) => {
            if (index === activeTaskIndex) {
              return { ...task, timer: task.timer + 1 };
            }
            return task;
          })
        );
      }, 1000);

      return () => {
        clearInterval(timerInterval);
      };
    }
  }, [activeTaskIndex]);

  const newTimer = () => {
    setIsDescVisible(!isDescVisible);
  };

  const handleUpdateDescription = (index, newDescription) => {
    setTaskList((prevTaskList) => {
      const updatedTaskList = [...prevTaskList];
      updatedTaskList[index].description = newDescription;
      return updatedTaskList;
    });
  };

  const handleStopTask = (taskData, index) => {
    const updatedTaskList = taskList.filter((task, i) => i !== index);
    setTaskList(updatedTaskList);
    setStoppedTasks((prevStoppedTasks) => [
      ...prevStoppedTasks,
      { ...taskData },
    ]);
    if (index === activeTaskIndex) setActiveTaskIndex(null);
    console.log(activeTaskIndex);
  };

  const stopAllTimers = () => {
    setStoppedTasks((prevStoppedTasks) => [
      ...prevStoppedTasks,
      ...taskList.map((task) => ({
        ...task,
      })),
    ]);
    setTaskList([]);
    setActiveTaskIndex(null);
  };
  const handleDeleteTask = (index) => {
    setTaskList((prevTasks) => prevTasks.filter((_, i) => i !== index));

    if (index === activeTaskIndex) {
      setActiveTaskIndex(null);
    } else if (activeTaskIndex === taskList.length - 1) {
      setActiveTaskIndex(taskList.length - 2);
    }
    console.log(taskList);
  };

  const handleEditDescription = (index) => {
    setEditingIndex(!isEditing);
  };

  const addNewTask = () => {
    if (description === "" || date === null) {
      showError("You have to pick date and enter description");
    } else {
      flushSync(() => {
        setTaskList([
          ...taskList,
          { timer: 0, description: description, date: date },
        ]);
        setActiveTaskIndex(taskList.length);
      });
    }
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const showError = (error) => {
    toast.current.show({
      severity: "error",
      summary: "Error",
      detail: error,
      life: 3000,
    });
  };

  return (
    <div className="trackersContainer">
      <Toast ref={toast} />
      <div className="upperContainer">
        <div className="create">
          <Calendar
            className="calendar"
            value={date}
            onChange={(e) => setDate(e.value)}
            dateFormat="dd/mm/yy"
            showIcon
          />
        </div>

        <div className="buttons">
          <Button
            className="btnStart"
            label="Start new timer"
            onClick={newTimer}
            icon="pi pi-stopwatch"
            style={{
              width: "166px",
              height: "36px",
              backgroundColor: "#FF5722",
              borderRadius: "3px",
              border: "1px solid var(--orange, #FF5722)",
              flexShrink: "0",
            }}
          />
          <Button
            className="btnStop"
            label="Stop all"
            icon="pi pi-stop-circle"
            onClick={stopAllTimers}
            style={{
              width: "166px",
              height: "36px",
              flexShrink: "0",
              backgroundColor: "#181846",
              borderRadius: "3px",
              border: "1px solid var(--port-gore, #181846)",
              marginLeft: "15px",
            }}
          />
        </div>
        {isDescVisible && (
          <div className="newInput">
            <span className="p-input-icon-right">
              <i
                onClick={addNewTask}
                className="pi  pi-check-circle"
                style={{ fontSize: "1.7rem" }}
              />
              <InputText
                className="p-inputtext-lg"
                placeholder="Enter description"
                value={description}
                onChange={handleDescriptionChange}
                style={{
                  width: "500px",
                  height: "70px",
                }}
              />
            </span>
          </div>
        )}
      </div>

      <svg
        width="1170"
        height="70"
        viewBox="0 0 1170 70"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0.25 8C0.25 3.71979 3.71979 0.25 8 0.25H1162C1166.28 0.25 1169.75 3.71979 1169.75 8V69.75H0.25V8Z"
          fill="#F9F9FD"
          stroke="#ECEDF5"
          strokeWidth="0.5"
        />
        <text x="30" y="45">
          Time logged
        </text>
        <text x="250" y="45">
          Description
        </text>
        <text x="970" y="45">
          Actions
        </text>
      </svg>
      {taskList.map((task, index) => {
        return (
          <NewTask
            key={index}
            date={task.date}
            isEditing={isEditing}
            timer={formatTime(task.timer)}
            description={task.description}
            isActive={index === activeTaskIndex}
            onDelete={() => handleDeleteTask(index)}
            onEditDescription={() => handleEditDescription(index)}
            onUpdateDescription={(newDescription) =>
              handleUpdateDescription(index, newDescription)
            }
            index={index}
            onStop={(taskData) => handleStopTask(taskData, index)}
            setActiveTaskIndex={setActiveTaskIndex}
          />
        );
      })}
    </div>
  );
};
export default Trackers;

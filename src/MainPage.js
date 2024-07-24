import "./App.css";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Chip,
  MenuItem,
  Popover,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Link } from "react-router-dom";

const colorMap = { low: "blue", medium: "green", high: "red" };

function MainPage() {
  const [tasks, setTasks] = useState([]);
  const [showNewTaskPopup, setShowNewTaskPopup] = useState(false);
  const [level, setLevel] = useState("low");
  const [taskName, setTaskName] = useState("");
  const [completedTasks, setCompletedTasks] = useState(0);
  const [productivityRate, setProductivityRate] = useState(0);

  const handlePriorityChange = (event) => {
    setLevel(event.target.value);
  };

  const handleTaskSubmit = (taskName, level) => {
    axios
      .post("/task", {
        title: taskName,
        description: "hello",
        status: "todo",
        priority: level,
      })
      .then(() => {})
      .catch(() => {});

    setTaskName("");
    setLevel("low");
  };

  const handleTaskDelete = (taskId) => {
    axios
      .delete(`/task/${taskId}`)
      .then(() => {})
      .catch(() => {});
  };

  const handleTaskCompletion = (taskId) => {
    const task = tasks.find((t) => t._id === taskId);
    if (!task) return;

    const newStatus = task.status === "done" ? "todo" : "done";

    axios
      .put(`/task/${taskId}`, {
        title: task.taskName,
        description: "hello",
        priority: task.priority,
        status: newStatus,
      })
      .then(() => {})
      .catch(() => {});
  };

  useEffect(() => {
    const newCompletedTasks = tasks.filter((x) => x.status === "done").length;
    setCompletedTasks(newCompletedTasks);
    if (tasks.length !== 0) {
      const productivityRate = (newCompletedTasks / tasks.length) * 100;
      setProductivityRate(productivityRate);
    } else {
      setProductivityRate(0);
    }
  }, [tasks]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get("/task/user")
        .then((response) => {
          const data = response.data.map((x) => ({
            taskName: x.title,
            ...x,
          }));

          setTasks(data);
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  console.log(tasks);

  return (
    <div className="App">
      <Box
        borderBottom="2px solid black"
        px={2}
        py={2}
        backgroundColor="#16151B"
        color="white"
        display="flex"
        justifyContent="flex-start"
        fontWeight="bold"
        fontSize={24}
      >
        Procrastination Tracker
      </Box>
      <header className="App-header">
        <Box
          border="8px solid #16151B"
          height={500}
          width={500}
          borderRadius={"100%"}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          gap={4}
          className="rotating-border"
          mb={4}
          mt={12}
        >
          <Box color="white" fontWeight="bold" fontSize="30px">
            Productivity Rate
          </Box>
          <Box display="flex" justifyContent="center" gap={4}>
            <Box display="flex" flexDirection="column" gap={8}>
              <Box fontWeight="bold" fontSize="80px">
                {isNaN(productivityRate) ? "0" : productivityRate} %
              </Box>
              <Box display="flex" gap={8} fontSize="18px">
                <Box color={"green"}>
                  {completedTasks}/{tasks.length} completed
                </Box>
                <Box color={"red"}>
                  {tasks.length - completedTasks}/{tasks.length} incomplete
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          width={750}
          position="relative"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
        >
          {showNewTaskPopup && (
            <Box
              width="400px"
              height="300px"
              backgroundColor="#16151B"
              position="absolute"
              sx={{ bottom: "20%", right: "20%", boxShadow: 3 }}
              border="2px solid black"
              borderRadius="50px"
              p={4}
              display="flex"
              flexDirection="column"
              gap={4}
            >
              <Box width="100%" display="flex" flexDirection="column" gap={4} position="relative">
                <CloseIcon
                  onClick={() => {
                    setTaskName("");
                    setLevel("Low");
                    setShowNewTaskPopup(false);
                  }}
                  sx={{
                    position: "absolute",
                    top: "0",
                    right: "0px",
                    color: "white",
                    cursor: "pointer",
                  }}
                />
                <Box
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="start"
                  gap={2}
                >
                  <Box fontSize={18}>Task Name: </Box>
                  <Box width="100%">
                    <TextField
                      label="Enter Task Name"
                      value={taskName}
                      onChange={(e) => setTaskName(e.target.value)}
                      sx={{
                        width: "100%",
                        outline: "0",
                        border: "2px solid gray",
                        backgroundColor: "#ECEAEA",
                        input: { color: "black" },
                      }}
                    />
                  </Box>
                </Box>
                <Box
                  width="100%"
                  display="flex"
                  flexDirection="column"
                  justifyContent="flex-start"
                  alignItems="start"
                  gap={2}
                >
                  <Box fontSize={18}>Priority: </Box>
                  <Box width="100%">
                    <Select
                      sx={{
                        width: "100%",
                        border: "2px solid gray",
                        backgroundColor: "#ECEAEA",
                        color: "black",
                      }}
                      value={level}
                      onChange={handlePriorityChange}
                    >
                      <MenuItem value={"low"}>Low</MenuItem>
                      <MenuItem value={"medium"}>Medium</MenuItem>
                      <MenuItem value={"high"}>High</MenuItem>
                    </Select>
                  </Box>
                </Box>
                <Box width="100%" display="flex" justifyContent="space-evenly">
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "green" }}
                    onClick={() => handleTaskSubmit(taskName, level)}
                  >
                    Create
                  </Button>
                  <Button
                    variant="contained"
                    sx={{ backgroundColor: "red" }}
                    onClick={() => {
                      setTaskName("");
                      setLevel("Low");
                      setShowNewTaskPopup(false);
                    }}
                  >
                    Cancel
                  </Button>
                </Box>
              </Box>
            </Box>
          )}

          <Box width="100%" justifyContent="space-between" alignItems="center" display="flex">
            <Link style={{ display: "block", color: "white" }} to="/leaderboard">
              Go to leaderboard
            </Link>
            <Box color="white" fontWeight="bold" fontSize="30px" mb={4}>
              Tasks
            </Box>
            <Box>
              <PlaylistAddIcon
                sx={{ color: "white", fontSize: "30px" }}
                variant="contained"
                onClick={() => setShowNewTaskPopup(true)}
                cursor="pointer"
              />
            </Box>
          </Box>

          <TaskList
            tasks={tasks}
            handleTaskCompletion={handleTaskCompletion}
            handleTaskDelete={handleTaskDelete}
          />
        </Box>
      </header>
    </div>
  );
}

const TaskList = ({ tasks, handleTaskCompletion, handleTaskDelete }) => {
  return (
    <Box display="flex" flexDirection="column" gap={4} width="100%">
      {tasks.map((task) => (
        <Box
          key={task._id}
          sx={{
            cursor: task.status === "done" ? "not-allowed" : "default",
          }}
          height={60}
          p={1}
          backgroundColor="#FFA533"
          borderRadius="12px"
        >
          <Box
            display="flex"
            flexDirection="row"
            alignItems="start"
            justifyContent="center"
            color="white"
            fontWeight="bold"
            pb={1}
          >
            <Box width="100%" display="flex" justifyContent="space-between" alignItems="center">
              <Box
                width={"50%"}
                display="flex"
                justifyContent="flex-start"
                gap={4}
                alignItems="center"
              >
                <Box>
                  <Checkbox
                    color="success"
                    checked={task.status === "done"}
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
                    onClick={() => handleTaskCompletion(task._id)}
                  />
                </Box>
                <Box>{task.taskName}</Box>
              </Box>
              <Box width="20%" display="flex" justifyContent="center" gap={2}>
                <Chip
                  label={task.priority}
                  sx={{
                    backgroundColor: colorMap[task.priority],
                    color: "white",
                    width: "120px",
                  }}
                />
                <DeleteIcon cursor="pointer" onClick={() => handleTaskDelete(task._id)} />
              </Box>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export default MainPage;

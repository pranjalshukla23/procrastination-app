import logo from "./logo.svg";
import "./App.css";
import { Box, Checkbox, Chip } from "@mui/material";
import PlaylistAddIcon from '@mui/icons-material/PlaylistAdd';

function App() {
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
                58%
              </Box>
              <Box display="flex" gap={8} fontSize="18px">
                <Box color={"green"}>0/3 completed</Box>
                <Box color={"red"}>3/3 incompleted</Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box
          width={750}
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
        >
          <Box
            width="100%"
            justifyContent="space-between"
            alignItems="center"
            display="flex"
          >
            <Box color="white" fontWeight="bold" fontSize="30px" mb={4}>
              Tasks
            </Box>
            <Box>
              <PlaylistAddIcon sx={{color: "white", fontSize: "30px"}}/>
            </Box>
          </Box>

          <Box display="flex" flexDirection="column" gap={4} width="100%">
            <Box
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
                <Box
                  width="100%"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box
                    width={"50%"}
                    display="flex"
                    justifyContent="flex-start"
                    gap={4}
                    alignItems="center"
                  >
                    <Box>
                      {" "}
                      <Checkbox
                        color="success"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
                      />
                    </Box>
                    <Box>Buy Groceries</Box>
                  </Box>
                  <Box width="20%">
                    <Chip
                      label="High"
                      sx={{
                        backgroundColor: "red",
                        color: "white",
                        width: "120px",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
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
                <Box
                  width="100%"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box
                    width={"50%"}
                    display="flex"
                    justifyContent="flex-start"
                    gap={4}
                    alignItems="center"
                  >
                    <Box>
                      {" "}
                      <Checkbox
                        color="success"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
                      />
                    </Box>
                    <Box>Read books</Box>
                  </Box>
                  <Box width="20%">
                    <Chip
                      label="Medium"
                      sx={{
                        backgroundColor: "green",
                        color: "white",
                        width: "120px",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box
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
                <Box
                  width="100%"
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Box
                    width={"50%"}
                    display="flex"
                    justifyContent="flex-start"
                    gap={4}
                    alignItems="center"
                  >
                    <Box>
                      {" "}
                      <Checkbox
                        color="success"
                        sx={{ "& .MuiSvgIcon-root": { fontSize: 32 } }}
                      />
                    </Box>
                    <Box>Walk 50 KM</Box>
                  </Box>
                  <Box width="20%">
                    <Chip
                      label="Low"
                      sx={{
                        backgroundColor: "blue",
                        color: "white",
                        width: "120px",
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </header>
    </div>
  );
}

export default App;

import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";

import axios from "axios";

function LeaderboardPage() {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      axios
        .get("/leaderboard")
        .then((response) => {
          setLeaderboard(response.data);
        })
        .catch((error) => {
          setLeaderboard([]);
          console.error("Error fetching data:", error);
        });
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

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
        Leaderboard
      </Box>
      <header className="App-header">
        <Box
          width={750}
          position="relative"
          display="flex"
          flexDirection="column"
          alignItems="flex-start"
        >
          <Box color="white" fontWeight="bold" fontSize="30px" mb={4}>
            Leaderboard
          </Box>
          <Box display="flex" flexDirection="column" gap={4} width="100%">
            {leaderboard.map((user, index) => (
              <Box
                key={index}
                height={60}
                p={1}
                backgroundColor="#966363"
                borderRadius="12px"
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="space-between"
                color="white"
                fontWeight="bold"
              >
                <Box>{user.username}</Box>
                <Box>
                  {user.completed_tasks}/{user.total_tasks} completed
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </header>
    </div>
  );
}

export default LeaderboardPage;

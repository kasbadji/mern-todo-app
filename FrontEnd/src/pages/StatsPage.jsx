import { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { getTasks } from '../api/tasks';


function StatsPage() {
  const [percent, setPercent] = useState(0);
  const [total, setTotal] = useState(0);
  const [completed, setCompleted] = useState(0);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await getTasks();
        const tasks = res.data;
        const done = tasks.filter(t => t.completed).length;
        setTotal(tasks.length);
        setCompleted(done);
        setPercent(tasks.length ? Math.round((done / tasks.length) * 100) : 0);
      } catch (err) {
        console.error(err);
      }
    };
    fetchTasks();
  }, []);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
        mt: 4,
      }}
    >
      <Typography variant="h5" gutterBottom>
        Task Completion Statistics
      </Typography>

      <Gauge
        value={percent}
        valueMax={100}
        startAngle={-110}
        endAngle={110}
        sx={{
          width: 250,
          height: 250,
          [`& .${gaugeClasses.valueText}`]: {
            fontSize: 40,
            transform: 'translate(0, 0)',
          },
        }}
        text={() => `${percent}%`}
      />

      <Typography variant="body1" sx={{ mt: 2 }}>
        {completed} / {total} tasks completed
      </Typography>
    </Box>
  );
}

export default StatsPage;

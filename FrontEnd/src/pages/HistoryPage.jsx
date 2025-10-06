import { useEffect, useState } from 'react';
import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { getTasks } from '../api/tasks';

function HistoryPage() {
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await getTasks();
        const done = res.data.filter(t => t.completed);
        setCompletedTasks(done);
      } catch (err) {
        console.error(err);
      }
    };
    fetch();
  }, []);

  return (
    <Box sx={{ textAlign: 'center', mt: 5 }}>
      <Typography variant="h5" gutterBottom>
        Completed Tasks History
      </Typography>
      <List sx={{ width: '60%', mx: 'auto' }}>
        {completedTasks.length === 0 ? (
          <Typography variant="body2">No completed tasks yet.</Typography>
        ) : (
          completedTasks.map(t => (
            <ListItem key={t._id}>
              <ListItemText
                primary={t.title}
                secondary={new Date(t.updatedAt).toLocaleString()}
              />
            </ListItem>
          ))
        )}
      </List>
    </Box>
  );
}

export default HistoryPage;

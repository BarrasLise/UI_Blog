import  React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const Loading = () => {
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
          setProgress((prevProgress) => (prevProgress >= 100 ? 0 : prevProgress + 10));
        }, 8000);
        return () => {
            clearInterval(timer);
          };
        }, []
    );

    return (
        <Box
        sx={{
            display: 'flex',
            color: 'error',
        }}
        >
        <CircularProgress  color="primary" value={progress} />
        </Box>
    );
};
export default Loading;
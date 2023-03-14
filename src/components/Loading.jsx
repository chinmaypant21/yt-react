import { Height } from '@mui/icons-material';
import { Box } from '@mui/material'
import LinearProgress from '@mui/material/LinearProgress'
import { display } from '@mui/system';

const Loading = () => {
    return (
        <Box 
            sx={{
                color:'red',
                backgroundColor: 'var(--loading-bg)',
                width: '100%',
                position:'absolute',
                right: 0,
                zIndex:'2'

                // position:'sticky'
                // height: '100%',
            }}>
            <LinearProgress color='inherit'/>
        </Box>
    )
}

export default Loading;
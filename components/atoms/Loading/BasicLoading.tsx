import { CircularProgress } from "@mui/material";
import { Box } from "@mui/system";

export const BasicLoading = () => {
    return (
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <CircularProgress />
        </Box>
    );
}
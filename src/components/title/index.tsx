import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';

import { ChowIcon } from '../icons'
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

type TitleProps = {
    collapsed: boolean;
};

export const Title: React.FC<TitleProps> = ({ collapsed }) => {
    return (
        <Link to="/" style={{ textDecoration: "none" }}>
            <Box
                sx={{
                    height: "72px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "text.primary",
                    padding: "12px 16px",
                }}
            >
                {collapsed ? <ChowIcon width={30} height={30} /> : (
                  <Grid container spacing={2} alignItems="center">
                    <ChowIcon width={30} height={30} />
                    <Typography
                      variant="h6"
                      component="h1"
                      color="#007bff"
                      noWrap
                      sx={{
                        marginLeft: "8px",
                        fontWeight: "bold",
                      }}
                    >
                      ChowBase
                    </Typography>
                </Grid>
                )}
            </Box>
        </Link>
    );
};

// import { observer } from 'mobx-react';
import { useState } from 'react';
import { Outlet, Link } from "react-router-dom";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Details from "../details/Details"


function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

function PageAdmin() {
    const [value, setValue] = useState();
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Details />
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label="basic tabs example"
                    >
                        <Tab
                            label="Services"
                            component={Link}
                            to="./services"
                            {...a11yProps(0)}
                        />
                        <Tab
                            label="Meetings"
                            component={Link}
                            to="./meetings"
                            {...a11yProps(1)}
                        />
                    </Tabs>
                </Box>
                <Outlet />
            </Box>

        </>

    )
}

export default PageAdmin


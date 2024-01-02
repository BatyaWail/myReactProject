import Button from '@mui/material/Button';
import { Link } from "react-router-dom"
import Details from "../details/Details"
import MyStore from "../../store/MyStore"
import Services from "../services1/Services";
import { useState } from 'react';
import AddMeeting from '../addMeeting/AddMeeting';

function User() {
    const[isPress,setIsPress]=useState(false);
    MyStore.setIsAdmin(false);
    return (
        <>
            <Details ></Details>
            {/* <Link to="./admin">enter as admin</Link> */}
            <Services></Services>
            <Button variant="contained" onClick={() => setIsPress(true)} >
                add meet
            </Button>
            {isPress?
            <AddMeeting setIsOpen={setIsPress}></AddMeeting>
            :<></>
            }
        </>
    )
}

export default User
import MyStore from "../../store/MyStore";
import * as React from 'react';
import Button from '@mui/material/Button';
// import SendIcon from '@mui/icons-material/Send';
import { useState, useEffect } from "react";
import { observer } from "mobx-react";
import DetailsStore from "../../store/DetailsStore";
import DetailsEdit2 from "../detailsEdit/DetailsEdit2";
import './Details.css'
const Details = (observer((props) => {
    const [isEdit, setisEdit] = useState(false)
   
    useEffect(() => {
        DetailsStore.initialbusinessServices()
    }, []);
    return (
        <>
            <img src={DetailsStore.detailsEdit.logo} id="logo" />
            <div id="mydiv">
            <h2 className="details"> {DetailsStore.detailsEdit.name} </h2>

                <div className="details"> קוד עסק: {DetailsStore.detailsEdit.id} </div>
                <div className="details">כתובת: {DetailsStore.detailsEdit.address}</div>
                <div className="details"> טלפון: {DetailsStore.detailsEdit.phone}</div>
                <div className="details">בעל העסק: {DetailsStore.detailsEdit.owner}</div>
                <div className="details"> עוד קצת עלינו: {DetailsStore.detailsEdit.description}</div>
            </div>
            {MyStore.isAdmin && MyStore.isLogin ?
                <>
                    <Button variant="contained" onClick={() => setisEdit(true)} >
                        לעריכת פרטי העסק
                    </Button>
                    {isEdit ?
                        <DetailsEdit2 setisEdit={setisEdit} />
                        : <></>
                    }
                </>
                : <></>
            }
        </>
    )
}))
export default Details

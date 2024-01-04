import { useEffect, useState } from 'react';
import { observer } from "mobx-react"
import DetailsStore from '../../store/DetailsStore'
import './services.css'
import MyStore from '../../store/MyStore';
import AddService from "../addService/AddService"
import ServiceStore from '../../store/ServiceStore';
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Button, CardActionArea, CardActions } from '@mui/material';

const Services = (observer(() => {

    const [isOpen, SetIsOpen] = useState(false);

    useEffect(() => {
        ServiceStore.getServices()
    }, []);
    return (
        <>
            <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-evenly' }}>
                {
                    ServiceStore.serviceArr.map((x1, key) => (//איפה שמים את ה-key
                        <>
                            <Card sx={{ width: 400 }} style={{margin: '2vh'}}>
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="200vh"
                                        image={x1.img}
                                        id="cardImg"
                                        alt="לא נמצאה תמונה לשירות זה! נא בדוק את הניתוב ונסה שוב                     "
                                    />
                                    <CardContent >
                                        <Typography gutterBottom variant="h4" component="div">
                                             {x1.name}
                                        </Typography>
                                        <Typography gutterBottom variant="h5" component="div">
                                            קוד ציור: {x1.id}
                                        </Typography>
                                        <Typography gutterBottom variant="h7" component="div">
                                            מחיר:  {x1.price}
                                        </Typography>
                                        <Typography gutterBottom variant="h7" component="div">
                                             משך זמן:  {x1.duration}
                                        </Typography>
                                        <Typography gutterBottom variant="h9" component="div">
                                           {x1.description}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </>
                    ))
                }
            </Box>
            {MyStore.isAdmin ?
                <Button variant="contained" onClick={() => SetIsOpen(true)} >
                    add service
                </Button>
                : <></>
            }
            {isOpen ?
                <AddService setIsOpen={SetIsOpen}></AddService>
                : <></>
            }
        </>
    )
}))
export default Services

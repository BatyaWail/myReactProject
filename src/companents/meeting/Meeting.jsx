
import { useEffect, useState } from 'react';
import { observer } from "mobx-react"
import MeetingStore from '../../store/MeetingStore';
import './Meeting.css'
import ServiceStore from '../../store/ServiceStore';
//
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
//
import Box from '@mui/material/Box';
import { Button, CardActionArea, CardActions } from '@mui/material';

const Meeting = (observer(() => {

  const [isOpen, SetIsOpen] = useState(false);

  const getColr = (datetime) => {
    const today = new Date();
    const myDate = new Date(datetime);
    const x = myDate.getTime() - today.getTime()//datediff
    const diffDays = Math.ceil(x / (1000 * 3600 * 24));
    if (diffDays === 1)//today
      return 0
    if (diffDays <= 7)//this week
      return 1
    if (diffDays > 7)//future
      return 2
    // return -1
  }

  useEffect(() => {
    MeetingStore.getMeeting()
  }, []);
  return (
    <>
      <Box style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-evenly' }}>
        {
          MeetingStore.meetingArr.map((x1, key) => (
            <>
              <div className={getColr(x1.dateTime) === 0 ? `red` : getColr(x1.dateTime) === 1 ? `orange` : `green`}>
                <Card sx={{ width: 345 }}>
                  <CardActionArea>
                    <CardContent >
                      <Typography gutterBottom variant="h4" component="div">
                        סוג שירות: {x1.serviceType}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        קוד פגישה: {x1.id}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        הזמן:  {x1.dateTime}
                      </Typography>
                      <Typography gutterBottom variant="h5" component="div">
                         שם לקוח :  {x1.clientName}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        טלפון :  {x1.clientPhone}
                      </Typography>
                      <Typography gutterBottom variant="h6" component="div">
                        מייל :  {x1.clientEmail}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </div>
            </>
          ))

        }
      </Box>
    </>
  )
}))
export default Meeting

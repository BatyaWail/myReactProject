import { useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import Stack from '@mui/joy/Stack';
import Typography from '@mui/material/Typography';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import Swal from 'sweetalert2'
import dayjs from 'dayjs';
import MeetingStore from '../../store/MeetingStore';
import ServiceStore from '../../store/ServiceStore';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const AddMeeting = (observer((props) => {

  const [meeting, setmeeting] = useState({
    id: '',
    serviceType: '',
    dateTime: null,
    clientName: '',
    clientPhone: '',
    clientEmail: '',
  })
  // MeetingStore.addCountId()
  const handleDateTimeChange = (dateTime) => {
    const formattedDateTime = dateTime.format('YYYY-MM-DDTHH:mm:ss');
    setmeeting((meeting) => ({
      ...meeting,
      dateTime: formattedDateTime,
    }));
    const e = { target: { name: 'dateTime', value: formattedDateTime } };
    setmeeting((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const handleAddMeeting = (event) => {
    const { name, value } = event.target;
    setmeeting({ ...meeting, [name]: value });
    console.log(name)
    console.log(value)
  };
  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    props.setIsOpen(false)
    setOpen(false)
  }
  const save = async () => {
    if (!ServiceStore.serviceArr.find(x => x.id == meeting.serviceType)) {
      Swal.fire({
        title: "Error! id not correct!",
        icon:"error"
      })
    }
    else if (meeting.clientName !== '' && meeting.clientEmail !== '' && meeting.clientPhone !== '') {
      await MeetingStore.saveMeeting(meeting);
      if (MeetingStore.isAddingMeetingGood) {
        Swal.fire({
          title: "you successed",
          icon: "success",
        })
        MeetingStore.getMeeting()
      }
      else
        Swal.fire({
          title: "the date is apear, please try again",
          icon: "warning"
        });
    }
    handleClose();
  }
  useEffect(() => {
    setOpen(true);
  }, []);
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          add meeting
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
        </IconButton>
        <DialogContent dividers>
          <Typography gutterBottom>
            <Stack spacing={2}>
              <TextField
                id="id"
                label="id"
                name="id"
                type='number'
                onChange={handleAddMeeting}
              />
              <TextField
                id="serviceType"
                label="serviceType"
                name="serviceType"
                type='number'
                onChange={handleAddMeeting}
              />
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  renderInput={(props) => (
                    <TextField
                      {...props}
                      variant="outlined"
                      className="inputs"
                      name="dateTime"
                      sx={{ mb: 3, mx: 4 }}
                      label="Meeting Date and Time"
                    />
                  )}
                  value={meeting.dateTime}
                  onChange={handleDateTimeChange}
                  disablePast
                  required
                />
              </LocalizationProvider>
              <TextField
                id="clientName"
                label="clientName"
                name="clientName"
                type='text'
                onChange={handleAddMeeting}
              />
              <TextField
                id="clientPhone"
                label="clientPhone"
                name="clientPhone"
                type='tel'
                onChange={handleAddMeeting}
              />
              <TextField
                id="clientEmail"
                label="clientEmail"
                name="clientEmail"
                type='email'
                onChange={handleAddMeeting}
              />
            </Stack>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={save}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
}
))
export default AddMeeting
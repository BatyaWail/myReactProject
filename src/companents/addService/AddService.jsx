import { useEffect,useState } from 'react';
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
import ServiceStore from '../../store/ServiceStore';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const AddServies = (observer((props) => {

  const [service, setService] = useState({
    id:"",
    name:"",
    description:"",
    price:"",
    duration:"",
})

  const handleChangeService = (event) => {
    const { name, value } = event.target;
    setService({ ...service, [name]: value });
    console.log(name)
    console.log(value)
};
  const [open, setOpen] = React.useState(false);

  const handleClose=()=>{
    props.setIsOpen(false)
    setOpen(false)
  }
  const save=()=>{
    ServiceStore.saveService(service);
    handleClose()
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
          add new service!
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
                label="id"
                name="id"
                type='number'
                required
                onChange={handleChangeService}
              />
              <TextField
                label="name"
                name="name"
                required
                type='text'
                onChange={handleChangeService}
              />
              <TextField
                label="description"
                name="description"
                required
                type='text'
                onChange={handleChangeService}
              />
              <TextField
                label="price"
                name="price"
                required
                type='text'
                onChange={handleChangeService}
              />
              <TextField
                id="duration"
                label="duration"
                name="duration"
                type='number'
                onChange={handleChangeService}
              />
              <TextField
                label="image"
                name="image"
                type='text'
                onChange={handleChangeService}
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
}))
export default AddServies
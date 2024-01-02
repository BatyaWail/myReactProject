import { useEffect, useState } from 'react';
import { observer } from "mobx-react";
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
import DetailsStore from '../../store/DetailsStore';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
const DetailsEdit2 = (observer((props) => {

  const [details, setDetails] = useState({
    id: DetailsStore.detailsEdit.id,
    name: DetailsStore.detailsEdit.name,
    address: DetailsStore.detailsEdit.address,
    phone: DetailsStore.detailsEdit.phone,
    owner: DetailsStore.detailsEdit.owner,
    logo: DetailsStore.detailsEdit.logo,
    description: DetailsStore.detailsEdit.description,
  })
  const handleChangeDetails = (event) => {
    const { name, value } = event.target;
    setDetails({ ...details, [name]: value });
    console.log(name)
    console.log(value)
  };
  const [open, setOpen] = React.useState(false);
  
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    props.setisEdit(false)
    setOpen(false)
  }
  const save = () => {
    DetailsStore.saveDetails(details);
    handleClose()
  }

  useEffect(() => {
    handleClickOpen();
    console.log("inside use effect")
  }, []);
  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          set your details
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[600],
          }}
        >
        </IconButton>
        <DialogContent dividers>

          <Typography gutterBottom>
            <Stack spacing={2}>
              <TextField
                label="id"
                name="id"
                value={details.id}
                onChange={handleChangeDetails}
              />
              <TextField
                label="name"
                name="name"
                value={details.name}
                onChange={handleChangeDetails}
              />
              <TextField
                label="address"
                name="address"
                value={details.address}
                onChange={handleChangeDetails}
              />
              <TextField
                label="phone"
                name="phone"
                value={details.phone}
                onChange={handleChangeDetails}
              />
              <TextField
                label="owner"
                name="owner"
                value={details.owner}
                onChange={handleChangeDetails}
              />
              <TextField
                label="logo"
                name="logo"
                value={details.logo}
                onChange={handleChangeDetails}
              />
              <TextField
                label="description"
                name="description"
                value={details.description}
                onChange={handleChangeDetails}
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
export default DetailsEdit2
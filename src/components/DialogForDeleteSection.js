import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function DialogForDeleteSection({open,setOpen, sectionName, setDeleteDialogResponse}) {
const transformedText = sectionName.replace(/_/g, " ");
 
  const handleCancelDelete = () => {
    setDeleteDialogResponse(false);
    setOpen(false);
  };

  const handleConfirmDelete = () => {
    setDeleteDialogResponse(true);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby={`alert-Delete-cv-section-${sectionName}`}
        aria-describedby={"alert-dialog-dialog-for-deleting-cv-section"+sectionName}
      >
        <DialogTitle id={"alert-dialog-title-"+sectionName}>
          {`Delete ${transformedText} ?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id={"alert-dialog-description"+sectionName}>
            Once deleted the opeartion can not be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button  sx={{ backgroundColor: 'success.main', padding: 1 , textTransform:'none'}} variant="contained" onClick={handleCancelDelete} autoFocus>Cancel Delete</Button>
          <Button sx={{ backgroundColor: 'secondary.main', padding: 1 ,textTransform:'none'}} variant="contained" onClick={handleConfirmDelete} >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
  );
}

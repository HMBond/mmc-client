import { MouseEvent, ReactNode } from 'react';
import PropTypes from 'prop-types';
import {
  Button,
  TextField,
  Dialog as MuiDialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';
import { Box } from '@mui/system';

type DialogProps = {
  children?: ReactNode;
  onSubmit?: () => void;
  open: boolean;
  onClose: (
    event: {},
    reason: 'backdropClick' | 'escapeKeyDown' | 'cancelClick'
  ) => void;
  title: string;
  text?: string;
  actions?: ReactNode;
  submitLabel?: string;
  dividers?: boolean;
  [prop: string]: any;
};

function Dialog({
  children,
  onSubmit,
  open,
  onClose,
  title,
  text,
  actions,
  submitLabel = 'OK',
  dividers,
  ...props
}: DialogProps) {
  function handleCancelClick(event: MouseEvent) {
    onClose(event, 'cancelClick');
  }

  return (
    <MuiDialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      keepMounted
      {...props}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers={dividers}>
        {text && <DialogContentText>{text}</DialogContentText>}
        {children}
      </DialogContent>
      <DialogActions>
        <Box sx={{ mr: 'auto' }}>{actions}</Box>
        <Button onClick={handleCancelClick}>Cancel</Button>
        {onSubmit && <Button onClick={onSubmit}>{submitLabel}</Button>}
      </DialogActions>
    </MuiDialog>
  );
}

Dialog.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  open: PropTypes.bool.isRequired,
  title: PropTypes.string.isRequired,
  submitLabel: PropTypes.string,
  actions: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  dividers: PropTypes.bool,
};

export default Dialog;

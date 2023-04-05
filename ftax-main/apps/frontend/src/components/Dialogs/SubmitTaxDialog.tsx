import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
} from '@mui/material';
import React from 'react';

const SubmitTaxDialog = (props) => {
	const { onClose, value, open, handleSubmit, ...other } = props;

	return (
		<Dialog
			open={open}
			{...other}
			sx={{
				'& .MuiDialog-paper': { width: '80%', maxHeight: 435, p: 2 },
			}}>
			<DialogTitle>Submit Tax Record</DialogTitle>
			<DialogContent dividers>
				<DialogContentText>
					Confirmation will charge your payment method for ${value}. Do you want
					to submit this tax record?
				</DialogContentText>
			</DialogContent>
			<DialogActions>
				<Button onClick={onClose} variant="contained" color="secondary">
					Cancel
				</Button>
				<Button onClick={handleSubmit} variant="contained" color="secondary">
					Submit
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default SubmitTaxDialog;

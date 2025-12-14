import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface ConfirmationPopupProps {
  open: boolean;
  title: string;
  message?: string;
  onClose: () => void;
  onConfirm: () => void;
  confirmText?: string;
  isProcessing?: boolean;
  processingText?: string;
}

export const ConfirmationPopup = ({
  open,
  title,
  message,
  onClose,
  onConfirm,
  confirmText = "Continue",
  isProcessing = false,
  processingText = "Processing...",
}: ConfirmationPopupProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <Box sx={{ position: "relative" }}>
        <DialogTitle>{title}</DialogTitle>
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      {message && <DialogContent>{message}</DialogContent>}
      <DialogActions sx={{ px: 3, pb: 3 }}>
        <Button
          onClick={onConfirm}
          variant="contained"
          disabled={isProcessing}
          fullWidth
        >
          {isProcessing ? processingText : confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

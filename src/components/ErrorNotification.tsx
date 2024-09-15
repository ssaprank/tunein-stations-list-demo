import { Box, Button, Stack, Typography } from "@mui/material";

type Props = {
  title: string;
  description?: string;
  onTryAgain?: () => void;
  onClose?: () => void;
};

export const ErrorNotification = ({
  title,
  description,
  onTryAgain,
  onClose,
}: Props) => (
  <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }}
  >
    <Stack
      gap="2em"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography variant="h4" color="error">
        {title}
      </Typography>
      {description && <Typography variant="h5">{description}</Typography>}
      {onTryAgain && (
        <Button
          variant="contained"
          sx={{ width: "200px" }}
          onClick={onTryAgain}
        >
          Try again
        </Button>
      )}
      {onTryAgain && (
        <Button variant="outlined" sx={{ width: "200px" }} onClick={onClose}>
          Close
        </Button>
      )}
    </Stack>
  </Box>
);

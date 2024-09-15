import { Layout } from "./Layout";
import { notReachable } from "../../utils";
import { useFetchStations } from "../../api";
import Grid from "@mui/material/Grid2";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import { ErrorNotification } from "../../components";

export const HomePage = () => {
  const stationsQuery = useFetchStations();

  return (
    <Grid container spacing={2}>
      <Grid size={12}>
        <Stack direction="column">
          <Typography textAlign="center" variant="h3">
            Home
          </Typography>
          <Typography textAlign="center" variant="h5">
            Pick one of the stations to start listening to
          </Typography>
        </Stack>
      </Grid>
      <Grid size={12}>
        {(() => {
          switch (stationsQuery.status) {
            case "idle":
              return null;
            case "error":
              return (
                <ErrorNotification
                  title="There was an error fetching the radio stations"
                  onTryAgain={() => stationsQuery.refetch()}
                />
              );
            case "loading":
              return (
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              );
            case "success":
              return <Layout stations={stationsQuery.data} />;
            default:
              return notReachable(stationsQuery);
          }
        })()}
      </Grid>
    </Grid>
  );
};

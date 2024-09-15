import { Layout } from "./Layout";
import { notReachable } from "../../utils";
import { useFetchStations } from "../../api";
import { useParams } from "react-router";
import { useNavigate } from "react-router-dom";
import { Box, CircularProgress, Stack, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { ErrorNotification } from "../../components";

export const StationDetailsPage = () => {
  const stationsQuery = useFetchStations();
  const navigate = useNavigate();
  const { stationId: stationIdQueryParam } = useParams<{
    stationId: string;
  }>();

  return (
    <Grid container spacing={2}>
      {(() => {
        switch (stationsQuery.status) {
          case "idle":
            return null;
          case "error":
            return (
              <Grid size={12}>
                <ErrorNotification
                  title="There was an error fetching the radio stations"
                  onTryAgain={() => stationsQuery.refetch()}
                  onClose={() => navigate("/")}
                />
              </Grid>
            );
          case "loading":
            return (
              <Grid size={12}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <CircularProgress />
                </Box>
              </Grid>
            );
          case "success": {
            const station = stationsQuery.data.find(
              (station) => station.id === stationIdQueryParam
            );

            if (!station) {
              navigate("/404");
              return null;
            }

            return (
              <>
                <Grid size={12}>
                  <Stack direction="column">
                    <Typography textAlign="center" variant="h3">
                      {station.name}
                    </Typography>
                  </Stack>
                </Grid>
                <Grid size={12}>
                  <Layout station={station} />
                </Grid>
              </>
            );
          }
          default:
            return notReachable(stationsQuery);
        }
      })()}
    </Grid>
  );
};

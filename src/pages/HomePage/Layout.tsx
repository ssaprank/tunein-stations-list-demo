import React, { useMemo } from "react";
import { Station } from "../../types";
import {
  Box,
  IconButton,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { Link } from "react-router-dom";
import { getTopPopularStations } from "./helpers";
import StarIcon from "@mui/icons-material/Star";

type Props = {
  stations: Array<Station>;
};

export const Layout = ({ stations }: Props) => {
  const theme = useTheme();
  const largeScreenMatch = useMediaQuery(theme.breakpoints.up("lg"));

  const topPopularStationsIds = useMemo(
    () => getTopPopularStations(stations).map((station) => station.id),
    [stations]
  );

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <ImageList cols={largeScreenMatch ? 3 : 2}>
        {stations.map((station) => (
          <Link to={`station/${station.id}`}>
            <ImageListItem sx={{ maxWidth: "300px" }} key={station.id}>
              <img src={station.imgUrl} alt={station.name} loading="lazy" />
              <ImageListItemBar
                actionIcon={
                  topPopularStationsIds.includes(station.id) ? (
                    <IconButton sx={{ color: "yellow" }}>
                      <Stack direction="row" gap="0.5em">
                        <StarIcon />
                        <Typography>Top</Typography>
                      </Stack>
                    </IconButton>
                  ) : null
                }
                title={station.name}
                subtitle={station.description}
              />
            </ImageListItem>
          </Link>
        ))}
      </ImageList>
    </Box>
  );
};

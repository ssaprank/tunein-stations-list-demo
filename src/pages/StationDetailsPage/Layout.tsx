import React, { useEffect, useRef, useState } from "react";
import { Station } from "../../types";
import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Slider,
  Stack,
  Typography,
} from "@mui/material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import VolumeMuteIcon from "@mui/icons-material/VolumeMute";
import VolumeDownIcon from "@mui/icons-material/VolumeDown";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router";

type Props = {
  station: Station;
};

export const Layout = ({ station }: Props) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [volume, setVolume] = useState<number>(60);
  const [lastVolumeBeforeMute, setLastVolumeBeforeMute] = useState<number>(60);
  const [muted, setMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const navigate = useNavigate();

  const handleVolumeChange = (_event: Event, newValue: number | number[]) => {
    if (typeof newValue === "number") {
      setVolume(newValue);
    }
  };

  useEffect(() => {
    if (!audioRef.current) {
      return;
    }

    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }

    audioRef.current.volume = volume / 100;
  }, [isPlaying, audioRef, volume]);

  return (
    <Box padding="2em">
      <Stack direction="column" gap="1em" alignItems="center">
        <Typography variant="body2"> {station.description}</Typography>
        <Box sx={{ width: "50%", backgroundColor: blue[50], padding: "1em" }}>
          <Box>
            <Stack alignItems="center" direction="row">
              <Button onClick={() => setIsPlaying((prev) => !prev)}>
                {isPlaying ? <PauseIcon /> : <PlayArrowIcon />}
              </Button>
              <Box width="100%">
                <LinearProgress
                  color="primary"
                  value={100}
                  variant="determinate"
                />
              </Box>
            </Stack>
          </Box>
          <Box>
            <Stack direction="row" alignItems="center">
              <Button
                onClick={() => {
                  if (muted) {
                    setVolume(lastVolumeBeforeMute);
                    setMuted(false);
                  } else {
                    setLastVolumeBeforeMute(volume);
                    setVolume(0);
                    setMuted(true);
                  }
                }}
              >
                {muted || volume < 5 ? (
                  <VolumeMuteIcon />
                ) : volume < 40 ? (
                  <VolumeDownIcon />
                ) : (
                  <VolumeUpIcon />
                )}
              </Button>
              <Slider
                sx={{ maxWidth: "100px" }}
                aria-label="Volume"
                value={volume}
                onChange={handleVolumeChange}
              />
            </Stack>
          </Box>
        </Box>
      </Stack>
      <Stack direction="row-reverse" marginBlockStart="1em">
        <Button variant="outlined" onClick={() => navigate("/")}>
          <Stack direction="row" alignItems="center" gap="0.5em">
            <ArrowBackIcon />
            <Typography variant="body2">Back to list</Typography>
          </Stack>
        </Button>
      </Stack>
      <audio ref={audioRef} src={station.streamUrl}></audio>
    </Box>
  );
};

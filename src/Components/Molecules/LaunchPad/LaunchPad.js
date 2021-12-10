import React from 'react';
import { MidiButton } from '../..';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
import SkipNextIcon from '@mui/icons-material/SkipNext';
import './LaunchPad.css';

const Launchpad = () => {
  return (
    <div className="launch-pad">
      <MidiButton note="C3" channel={16}>
        <PlayArrowIcon />
      </MidiButton>
      <MidiButton note="D3" channel={16}>
        <StopIcon />
      </MidiButton>
      <MidiButton note="E3" channel={16}>
        <SkipPreviousIcon />
      </MidiButton>
      <MidiButton note="F3" channel={16}>
        <SkipNextIcon />
      </MidiButton>
    </div>
  );
};

export default Launchpad;

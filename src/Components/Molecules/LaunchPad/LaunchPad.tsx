import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { MidiButton } from '../..';
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
        <ArrowUpwardIcon />
      </MidiButton>
      <MidiButton note="F3" channel={16}>
        <ArrowDownwardIcon />
      </MidiButton>
    </div>
  );
};

export default Launchpad;

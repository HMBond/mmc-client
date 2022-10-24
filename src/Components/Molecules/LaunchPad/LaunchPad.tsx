import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import StopIcon from '@mui/icons-material/Stop';
import { MidiButton } from '../..';
import { DEFAULT_VELOCITY } from '../../../DEFINITION';
import './LaunchPad.css';

const Launchpad = () => {
  return (
    <div className="launch-pad">
      <MidiButton note="C3" channel={16} velocity={DEFAULT_VELOCITY}>
        <PlayArrowIcon />
      </MidiButton>
      <MidiButton note="D3" channel={16} velocity={DEFAULT_VELOCITY}>
        <StopIcon />
      </MidiButton>
      <MidiButton note="E3" channel={16} velocity={DEFAULT_VELOCITY}>
        <ArrowUpwardIcon />
      </MidiButton>
      <MidiButton note="F3" channel={16} velocity={DEFAULT_VELOCITY}>
        <ArrowDownwardIcon />
      </MidiButton>
    </div>
  );
};

export default Launchpad;

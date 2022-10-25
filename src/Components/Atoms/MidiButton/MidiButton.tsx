import { Button } from '@mui/material';
import PropTypes from 'prop-types';
import { ReactNode } from 'react';
import { useMidiContext, useStateContext } from '../../../context';
import { NoteMessage } from '../../../types/midi.types';
import { ButtonModuleConstructorArgs } from '../../../types/Module.types';
import { midiRawNumber } from '../../../utils/propTypeValidators';

type MidiButtonProps = ButtonModuleConstructorArgs & {
  children: ReactNode;
};

function MidiButton({ children, channel, note, velocity }: MidiButtonProps) {
  const [midi] = useMidiContext();
  const [state] = useStateContext();

  function handlePlayNote() {
    if (!note) return;
    midi.send({
      type: 'note',
      action: 'play',
      channel,
      note,
      velocity,
    } as NoteMessage);
  }

  function handleStopNote() {
    if (!note) return;
    midi.send({
      type: 'note',
      action: 'stop',
      channel,
      note,
    } as NoteMessage);
  }

  return (
    <Button
      sx={{
        minHeight: '3.5rem',
        minWidth: '3.5rem',
        '&.Mui-disabled': {
          color: '#eee',
          backgroundColor: 'rgba(200,200,200,0.5)',
        },
      }}
      disableElevation
      variant="contained"
      color="primary"
      disabled={(!midi.output && !midi.socket) || state.editMode}
      onMouseDown={() => handlePlayNote()}
      onMouseUp={() => handleStopNote()}
      onTouchStart={() => handlePlayNote()}
      onTouchEnd={() => handleStopNote()}
      onTouchCancel={() => handleStopNote()}
    >
      {children}
    </Button>
  );
}

MidiButton.propTypes = {
  channel: PropTypes.number,
  note: PropTypes.string.isRequired,
  velocity: midiRawNumber,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default MidiButton;

import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { midiRawNumber } from '../../propTypeValidators';
import { ButtonModuleConstructorArgs } from '../../../types/Module.types';
import { useMidiContext, useStateContext } from '../../../context';

type MidiButtonProps = ButtonModuleConstructorArgs & {
  children: ReactNode;
};

function MidiButton({ children, channel, note, velocity }: MidiButtonProps) {
  const { midiState } = useMidiContext();
  const { state } = useStateContext();

  function handlePlayNote() {
    if (!note) return;
    midiState.output?.channels[channel ? channel : 1].playNote(note, {
      rawAttack: velocity,
      rawRelease: velocity,
    });
  }

  function handleStopNote() {
    if (!note) return;
    midiState.output?.channels[channel ? channel : 1].stopNote(note);
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
      disabled={!midiState.output || state.editMode}
      onMouseDown={() => handlePlayNote()}
      onMouseUp={() => handleStopNote()}
      onMouseOut={() => handleStopNote()}
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

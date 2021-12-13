import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { MidiContext } from '../../';
import { midiRawNumber } from '../../../propTypeValidators';

const MAX_NOTE_ON_DURATION = 4000;

function MidiButton({ channel = 1, note, velocity, children }) {
  const { output } = useContext(MidiContext);

  function handlePlayNote() {
    output?.channels[channel].playNote(note, {
      duration: MAX_NOTE_ON_DURATION,
      rawAttack: velocity,
      rawRelease: velocity,
    });
  }

  function handleStopNote() {
    output?.channels[channel].stopNote(note);
  }

  return (
    <Button
      disableElevation
      variant="contained"
      color="secondary"
      disabled={!output}
      onMouseDown={() => handlePlayNote()}
      onMouseUp={() => handleStopNote()}
    >
      {children}
    </Button>
  );
}

MidiButton.propTypes = {
  channel: PropTypes.number,
  note: PropTypes.string.isRequired,
  velocity: midiRawNumber,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default MidiButton;

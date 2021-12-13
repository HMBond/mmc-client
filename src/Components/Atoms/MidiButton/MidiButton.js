import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';
import { MidiContext } from '../../';
import { midiRawNumber } from '../../../propTypeValidators';

function MidiButton({ channel, note, velocity, children }) {
  const { output } = useContext(MidiContext);

  function handlePlayNote() {
    output?.channels[channel ? channel : 1].playNote(note, {
      rawAttack: velocity,
      rawRelease: velocity,
    });
  }

  function handleStopNote() {
    output?.channels[channel ? channel : 1].stopNote(note);
  }

  return (
    <Button
      disableElevation
      variant="contained"
      color="primary"
      disabled={!output}
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default MidiButton;

import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { MidiContext } from '../../';
import { Button } from '@mui/material';

function MidiButton({ channel = 1, note, children }) {
  const { outputDevice } = useContext(MidiContext);

  function handlePlayNote() {
    outputDevice.channels[channel].playNote(note);
  }

  function handleStopNote() {
    outputDevice.channels[channel].stopNote(note);
  }

  return (
    <Button
      variant="outlined"
      disabled={!outputDevice}
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default MidiButton;

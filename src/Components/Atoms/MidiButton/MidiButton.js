import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { MidiContext } from '../../';
import { Button } from '@mui/material';

function MidiButton({ channel = 1, note, children }) {
  const { output } = useContext(MidiContext);

  function handlePlayNote() {
    output?.channels[channel].playNote(note);
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default MidiButton;

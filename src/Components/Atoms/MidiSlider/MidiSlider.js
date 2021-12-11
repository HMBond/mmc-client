import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Slider } from '@mui/material';
import { MidiContext } from '../../';

function MidiSlider({ channel }) {
  const { outputDevice } = useContext(MidiContext);

  function handlePitchbend(event, value) {
    outputDevice.channels[channel].sendPitchBend(value);
  }

  return (
    <Slider
      disabled={!outputDevice}
      orientation="vertical"
      onChange={handlePitchbend}
      min={-1}
      max={1}
      step={0.01}
    />
  );
}

MidiSlider.propTypes = {
  channel: PropTypes.number.isRequired,
};

export default MidiSlider;

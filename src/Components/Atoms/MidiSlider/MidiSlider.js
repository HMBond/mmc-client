import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Slider } from '@mui/material';
import { MidiContext } from '../../';

function MidiSlider({ channel, orientation = 'vertical' }) {
  const { output } = useContext(MidiContext);

  function handlePitchbend(event, value) {
    output?.channels[channel].sendPitchBend(value);
  }

  return (
    <Box sx={{ height: 250 }}>
      <Slider
        disabled={!output}
        orientation={orientation}
        onChange={handlePitchbend}
        min={-1}
        max={1}
        step={0.01}
      />
    </Box>
  );
}

MidiSlider.propTypes = {
  channel: PropTypes.number.isRequired,
};

export default MidiSlider;

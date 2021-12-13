import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Slider, Input } from '@mui/material';
import { MidiContext } from '../../';

function MidiSlider({ children, channel, label, orientation = 'vertical' }) {
  const { output } = useContext(MidiContext);

  function handleLabelChange() {
    // TODO: update module with new label
  }

  function handlePitchbend(event, value) {
    output?.channels[channel].sendPitchBend(value);
  }

  return (
    <Box sx={{ height: 250 }}>
      <Input onChange={handleLabelChange}>{children}</Input>
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
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default MidiSlider;

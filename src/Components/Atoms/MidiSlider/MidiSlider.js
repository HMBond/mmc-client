import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Slider, Input } from '@mui/material';
import { MidiContext } from '../../';

function MidiSlider({ children, channel, label, orientation }) {
  const { output } = useContext(MidiContext);

  function handleLabelChange() {
    // TODO: update module with new label
  }

  function handlePitchbend(event, value) {
    output?.channels[channel].sendPitchBend(value);
  }

  return (
    <Box sx={{ height: 250 }}>
      {false && <Input value={label} onChange={handleLabelChange} />}
      <Slider
        disabled={!output}
        orientation={orientation ? orientation : 'vertical'}
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

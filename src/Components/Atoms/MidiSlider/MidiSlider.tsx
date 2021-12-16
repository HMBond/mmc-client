import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Box, Slider, Input } from '@mui/material';
import { MidiContext, UserContext } from '../..';
import { MidiSliderModel } from '../../../Types/Module';

type MidiSliderProps = {
  children?: React.ReactNode;
  module: MidiSliderModel;
};

function MidiSlider({
  children,
  module,
  module: { id, channel, label, value, orientation, type },
}: MidiSliderProps) {
  const { output } = useContext<any>(MidiContext);
  const { updateModule } = useContext(UserContext)!;

  function handleLabelChange() {
    // TODO: update module with new label
  }

  function handlePitchbend(event: Event, value: number | number[]) {
    output?.channels[channel].sendPitchBend(value);
    if (updateModule)
      updateModule(id, {
        ...module,
        value,
      });
  }

  return (
    <Box sx={{ height: 250 }}>
      {false && <Input value={label} onChange={handleLabelChange} />}
      <Slider
        disabled={!output}
        orientation={orientation ? orientation : 'vertical'}
        value={value}
        onChange={handlePitchbend}
        min={-1}
        max={1}
        step={0.01}
      />
    </Box>
  );
}

MidiSlider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default MidiSlider;

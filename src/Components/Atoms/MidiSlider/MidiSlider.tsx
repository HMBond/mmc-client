import { useContext } from 'react';
import { Box, Slider } from '@mui/material';
import { MidiContext, UserContext } from '../..';
import { MidiSliderModel } from '../../../types/Module';

type MidiSliderProps = {
  module: MidiSliderModel;
};

function MidiSlider({
  module,
  module: { id, channel, value, orientation },
}: MidiSliderProps) {
  const { output } = useContext<any>(MidiContext);
  const { updateModule } = useContext(UserContext) || {};

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

export default MidiSlider;

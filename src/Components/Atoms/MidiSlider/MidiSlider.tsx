import { ReactNode, useContext } from 'react';
import { Box, Slider, Typography } from '@mui/material';
import { MidiContext, UserContext } from '../..';
import { SliderModule } from '../../../types/modules';

function MidiSlider(module: SliderModule) {
  const { id, channel, value, orientation, label } = module;
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

  function RenderSlider(): ReactNode {
    return (
      <>
        {label && <Typography component="label">{label}</Typography>}
        <Slider
          disabled={!output}
          orientation={orientation ? orientation : 'vertical'}
          value={value}
          onChange={handlePitchbend}
          min={-1}
          max={1}
          step={0.01}
        />
      </>
    );
  }

  return orientation === 'vertical' ? (
    <Box sx={{ height: 250 }}>{RenderSlider()}</Box>
  ) : (
    <Box sx={{ width: 250 }}>{RenderSlider()}</Box>
  );
}

export default MidiSlider;

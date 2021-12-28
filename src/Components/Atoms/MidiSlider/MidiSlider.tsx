import { useContext } from 'react';
import { Box, Slider, Typography } from '@mui/material';
import { MidiContext, UserContext } from '../..';
import { SliderModule } from '../../../types/modules';

function MidiSlider(module: SliderModule) {
  const { id, channel, value, orientation, label } = module;
  const { output } = useContext<any>(MidiContext);
  const { updateModule, editMode } = useContext(UserContext) || {};

  function handleChange(event: Event, value: number | number[]) {
    output?.channels[channel].sendPitchBend(value);
    if (updateModule)
      updateModule(id, {
        ...module,
        value,
      });
  }

  const style = orientation === 'horizontal' ? { width: 250 } : { height: 250 };

  return (
    <Box sx={style}>
      {label && <Typography component="label">{label}</Typography>}
      <Slider
        disabled={!output || editMode}
        orientation={orientation ? orientation : 'vertical'}
        value={value}
        onChange={handleChange}
        min={-1}
        max={1}
        step={0.01}
      />
    </Box>
  );
}

export default MidiSlider;

import { Box, Slider, Typography } from '@mui/material';
import { useMidiContext, useStateContext } from '../../../context';
import { SliderModule } from '../../../types/Module.types';

function MidiSlider(module: SliderModule) {
  const { id, channel, value, orientation, label } = module;
  const { midiState } = useMidiContext();
  const { state, dispatch } = useStateContext();

  function handleChange(event: Event, value: number | number[]) {
    midiState.output?.channels[channel].sendPitchBend(value);
    dispatch({
      type: 'UPDATE_MODULE',
      id,
      module: {
        ...module,
        value,
      },
    });
  }

  const style = orientation === 'horizontal' ? { width: 250 } : { height: 250 };

  return (
    <Box sx={style}>
      {label && <Typography component="label">{label}</Typography>}
      <Slider
        disabled={!midiState.output || state.editMode}
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

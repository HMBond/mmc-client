import { Slider } from '@mui/material';
import debounce from 'lodash/debounce';
import { useState } from 'react';
import { Label } from '../..';
import { SLIDER_DEBOUNCE_WAIT } from '../../../DEFINITION';
import { PitchbendMessage } from '../../../types/midi.types';
import { SliderModule } from '../../../types/Module.types';
import { useMidiContext, useStateContext } from '../../contextProviders/context';
import './MidiSlider.css';

const dispatchDebounced = debounce(
  (id, value, dispatch, module) =>
    dispatch({
      type: 'UPDATE_MODULE',
      id,
      module: {
        ...module,
        value,
      },
    }),
  SLIDER_DEBOUNCE_WAIT
);

function MidiSlider(module: SliderModule) {
  const { id, channel, value, orientation, label } = module;
  const [midi] = useMidiContext();
  const [state, dispatch] = useStateContext();
  const [localValue, setLocalValue] = useState<number | number[]>(value);

  function handleChange(event: Event, value: number | number[]) {
    midi.send({ type: 'pitchbend', channel, value } as PitchbendMessage);
    midi.output?.channels[channel].sendPitchBend(value);
    setLocalValue(value);
    dispatchDebounced(id, value, dispatch, module);
  }

  return (
    <div className={`midi-slider ${orientation}`}>
      {label && <Label>{label}</Label>}
      <Slider
        sx={{ color: 'white' }}
        disabled={(!midi.output && !midi.socket) || state.editMode}
        orientation={orientation || 'vertical'}
        value={localValue}
        onChange={handleChange}
        min={-1}
        max={1}
        step={0.01}
      />
    </div>
  );
}

export default MidiSlider;

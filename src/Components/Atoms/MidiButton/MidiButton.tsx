import PropTypes from 'prop-types';
import { ReactNode } from 'react';
import { NoteMessage } from '../../../types/midi.types';
import { ButtonModuleConstructorArgs } from '../../../types/Module.types';
import { midiRawNumber } from '../../../utils/propTypeValidators';
import { useMidiContext, useStateContext } from '../../contextProviders/context';

type MidiButtonProps = ButtonModuleConstructorArgs & {
  children: ReactNode;
};

function MidiButton({ children, channel, note, velocity }: MidiButtonProps) {
  const [midi] = useMidiContext();
  const [state] = useStateContext();

  function handlePlayNote() {
    midi.send({
      type: 'note',
      action: 'play',
      channel,
      note,
      velocity,
    } as NoteMessage);
  }

  function handleStopNote() {
    midi.send({
      type: 'note',
      action: 'stop',
      channel,
      note,
    } as NoteMessage);
  }

  return (
    <button
      disabled={(!midi.output && !midi.socket) || state.editMode}
      onMouseDown={() => handlePlayNote()}
      onMouseUp={() => handleStopNote()}
      onTouchStart={() => handlePlayNote()}
      onTouchEnd={() => handleStopNote()}
      onTouchCancel={() => handleStopNote()}
    >
      {children}
    </button>
  );
}

MidiButton.propTypes = {
  channel: PropTypes.number,
  note: PropTypes.string.isRequired,
  velocity: midiRawNumber,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default MidiButton;

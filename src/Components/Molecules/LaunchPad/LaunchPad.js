import React from 'react';
import { MidiButton } from '../..';

const Launchpad = () => {
  return (
    <div className="launchpad">
      <MidiButton note="C3" channel={16}>
        Play
      </MidiButton>
      <MidiButton note="D3" channel={16}>
        Stop
      </MidiButton>
      <MidiButton note="E3" channel={16}>
        Prev
      </MidiButton>
      <MidiButton note="F3" channel={16}>
        Next
      </MidiButton>
    </div>
  );
};

export default Launchpad;

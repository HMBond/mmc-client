const dummyInput: Input = { name: 'dummy' };
const dummyOutput: Output = { name: 'dummy' };

type WebMidiType = {
  enable: ({ sysex }: { sysex: boolean }) => void;
};

class WebMidi {
  enable = ({ sysex }: { sysex: boolean }): Promise<any> => {
    return new Promise(() => {});
  };
  enabled = false;
  inputs = [dummyInput];
  outputs = [dummyOutput];
  addListener = () => {};
  removeListener = () => {};
  getInputById(id: string) {
    return dummyInput;
  }
  getInputByName(id: string) {
    return dummyInput;
  }
  getOutputById(id: string) {
    return dummyOutput;
  }
  getOutputByName(id: string) {
    return dummyOutput;
  }
}

export const webMidi = new WebMidi();

export type Input = {
  name: string;
};
export type Output = {
  name: string;
};

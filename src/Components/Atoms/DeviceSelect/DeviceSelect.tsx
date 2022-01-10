import { Alert, FormControl, InputLabel, NativeSelect } from '@mui/material';
import PropTypes from 'prop-types';
import { ChangeEventHandler } from 'react';

function capitalizeFirstLetter(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

DeviceSelect.propTypes = {
  deviceType: PropTypes.string,
  devices: PropTypes.array,
  selected: PropTypes.any,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

type DeviceSelectProps = {
  deviceType: 'input' | 'output';
  devices: any[];
  selected: any;
  onChange: ChangeEventHandler<HTMLSelectElement>;
  disabled?: boolean;
};

function DeviceSelect(props: DeviceSelectProps) {
  const { deviceType, devices, selected, onChange, disabled } = props;
  if (!devices || devices.length === 0) {
    return <Alert severity="warning">No {deviceType} devices found!</Alert>;
  } else {
    return (
      <div>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor={`${deviceType}-select`}>
            {capitalizeFirstLetter(deviceType)} Device
          </InputLabel>
          <NativeSelect
            id={`${deviceType}-select`}
            value={selected && selected.id ? selected.id : ''}
            variant="outlined"
            inputProps={{
              onChange,
            }}
            disabled={disabled}
          >
            {devices.map((device) => (
              <option key={device.id} value={device.id}>
                {device.name}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </div>
    );
  }
}

export default DeviceSelect;

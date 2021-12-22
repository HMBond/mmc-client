import { ReactNode } from 'react';
import PropTypes from 'prop-types';
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';

function capitalizeFirstLetter(value: string): string {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

type DeviceSelectProps = {
  deviceTypeName: 'input' | 'output';
  devices: any[];
  selected: any;
  onChange: (event: SelectChangeEvent<string>, child: ReactNode) => void;
};

function DeviceSelect(props: DeviceSelectProps) {
  const { deviceTypeName, devices, selected, onChange } = props;
  if (!devices || devices.length === 0) {
    return <Alert severity="warning">No {deviceTypeName} devices found!</Alert>;
  } else {
    return (
      <div>
        <FormControl fullWidth>
          <InputLabel id={deviceTypeName + '-select-label'}>
            {capitalizeFirstLetter(deviceTypeName)} Device
          </InputLabel>
          <Select
            labelId={deviceTypeName + '-select-label'}
            id={deviceTypeName + '-select'}
            value={selected && selected.id ? selected.id : ''}
            label={deviceTypeName + ' Device'}
            onChange={onChange}
          >
            {devices.map((device) => (
              <MenuItem key={device.id} value={device.id}>
                {device.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
    );
  }
}

DeviceSelect.propTypes = {
  deviceTypeName: PropTypes.string,
  devices: PropTypes.array,
  selected: PropTypes.any,
  onChange: PropTypes.func,
};

export default DeviceSelect;

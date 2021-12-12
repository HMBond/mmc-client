import React from 'react';
import { WebMidi } from 'webmidi';
import {
  Alert,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

function capitalizeFirstLetter(value) {
  return value.charAt(0).toUpperCase() + value.slice(1);
}

function DeviceSelect({ deviceTypeName, devices, selected, onChange }) {
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

export default DeviceSelect;

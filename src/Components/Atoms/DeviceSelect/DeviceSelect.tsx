import { Alert, FormControl } from '@mui/material';
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

function DeviceSelect({ deviceType, devices, selected, onChange, disabled }: DeviceSelectProps) {
  if (!devices || devices.length === 0) {
    return <Alert severity="warning">No {deviceType} devices found!</Alert>;
  } else {
    return (
      <div>
        <FormControl fullWidth>
          <label htmlFor={`${deviceType}-select`}>{capitalizeFirstLetter(deviceType)} Device</label>
          <div className="select-with-chevron">
            <select
              id={`${deviceType}-select`}
              value={selected?.id ? selected.id : ''}
              disabled={disabled}
              onChange={onChange}
            >
              <option key="None" value={''}>
                None
              </option>
              {devices.map((device) => (
                <option key={device.id} value={device.id}>
                  {device.name}
                </option>
              ))}
            </select>
          </div>
        </FormControl>
      </div>
    );
  }
}

export default DeviceSelect;

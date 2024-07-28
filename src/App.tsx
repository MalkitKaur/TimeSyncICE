import { useState } from 'react';
import Select, { MultiValue } from 'react-select';
import { Slider, Typography, Box } from '@mui/material';
import { DateTime } from 'luxon';
import './App.css';

interface TimeZoneOption {
  value: string;
  label: string;
}

function App() {
  const localTime = DateTime.local();
  const [selectedTimeZones, setSelectedTimeZones] = useState<TimeZoneOption[]>([]);
  const [offset, setOffset] = useState<number>(0);

  const timeZonesOptions: TimeZoneOption[] = [
    { value: 'Europe/London', label: 'Europe/London' },
    { value: 'America/New_York', label: 'America/New_York' },
    { value: 'Asia/Tokyo', label: 'Asia/Tokyo' },
    { value: 'America/Los_Angeles', label: 'America/Los_Angeles' },
    { value: 'Australia/Sydney', label: 'Australia/Sydney' },
    { value: 'Europe/Berlin', label: 'Europe/Berlin' }
  ];

  const handleTimeZoneChange = (newValue: MultiValue<TimeZoneOption>) => {
    setSelectedTimeZones([...newValue]);
  };

  const handleSliderChange = (newValue: number | number[]) => {
    setOffset(newValue as number);
  };

  const timeFormat: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 360, py: 2, m: 'auto' }}>
      <Typography variant="h4">
        TimeSync ICE
      </Typography>
      <Typography sx={{ py: 2 }}>
        Your Local Time: {localTime.toLocaleString(timeFormat)}
      </Typography>
      <Select
        isMulti
        options={timeZonesOptions}
        getOptionLabel={(option) => option.label}
        getOptionValue={(option) => option.value}
        onChange={handleTimeZoneChange}
      />
      <Typography>
        Adjust All Selected Time Zones:
      </Typography>
      <Slider
        value={offset}
        onChange={(_, newValue) => handleSliderChange(newValue)}
        min={0}
        max={23}
        step={1}
        valueLabelDisplay="auto"
      />
      {selectedTimeZones.map(zone => (
        <Typography key={zone.value}>
          Time in {zone.label}: {' '}
          {DateTime.now().setZone(zone.value).plus({ hours: offset }).toLocaleString(timeFormat)}
        </Typography>
      ))}
    </Box>
  );
}

export default App;
# TimeSync In-Class Exercise

**Preparation:**

1. Install Node.js from [nodejs.org](https://nodejs.org).
2. Install NPX and create a new React project with TypeScript template:
    ```bash
    npm install -g npx
    npx create-react-app timesync-ice --template typescript
    ```
3. Install necessary libraries:
    ```bash
    npm install luxon react-select @mui/material @emotion/react @emotion/styled
    npm install -D @types/luxon
    ```
4. Start the development server:
    ```bash
    npm start
    ```

**Navigate to the project:**

- Visit `http://localhost:3000` to see the app running.

**Work on App.tsx:**

1. **Initial Imports and Setup**:
   - Import `useState` for managing state.
   - Import components from MUI for UI design.
   - Import `DateTime` from Luxon for date and time manipulation.
   
    ```typescript
    import { useState } from 'react';
    import Select, { MultiValue } from 'react-select';
    import { Slider, Typography, Box } from '@mui/material';
    import { DateTime } from 'luxon';
    import './App.css';
    ```

2. **Define the `TimeZoneOption` interface**:
   - Create an interface for timezone options to be used in the select component.
   
    ```typescript
    interface TimeZoneOption {
      value: string;
      label: string;
    }
    ```

3. **Component Function Setup**:
   - Define the component function and initialize state variables for selected time zones and a time offset.
   
    ```typescript
    function App() {
      const localTime = DateTime.local();
      const [selectedTimeZones, setSelectedTimeZones] = useState<TimeZoneOption[]>([]);
      const [offset, setOffset] = useState<number>(0);
    ```

4. **Time Zone Options**:
   - Create an array of timezone options for the select dropdown.
   
    ```typescript
    const timeZonesOptions: TimeZoneOption[] = [
      { value: 'Europe/London', label: 'Europe/London' },
      { value: 'America/New_York', label: 'America/New_York' },
      { value: 'Asia/Tokyo', label: 'Asia/Tokyo' },
      { value: 'America/Los_Angeles', label: 'America/Los_Angeles' },
      { value: 'Australia/Sydney', label: 'Australia/Sydney' },
      { value: 'Europe/Berlin', label: 'Europe/Berlin' }
    ];
    ```

5. **Handle Changes**:
   - Functions to handle changes in the select dropdown and slider.
   
    ```typescript
    const handleTimeZoneChange = (newValue: MultiValue<TimeZoneOption>) => {
      setSelectedTimeZones([...newValue]);
    };

    const handleSliderChange = (newValue: number | number[]) => {
      setOffset(newValue as number);
    };
    ```

6. **Rendering UI Components**:
   - Use MUI components to render the UI, including `Typography` for text, `Box` for layout, `Select` for time zone selection, and `Slider` for offset adjustment.
   - Map through selected time zones and display their adjusted times.
   
    ```typescript
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
    ```

7. **Export the Component**:
   - Export the App component as the default export.
   
    ```typescript
    export default App;
    ```

Now your `App.tsx` should look like this:

```typescript
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
```

export default App;

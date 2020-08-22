import * as React from 'react';
import {
  TextField,
  useMediaQuery,
  useTheme,
  IconButton
} from '@material-ui/core';
import { Clear, DateRange } from '@material-ui/icons';
import {
  DateRangeDelimiter,
  DateRangePicker as DateRangePickerUI
} from '@material-ui/pickers';
import { formatDate, isValidDateFormat, DATE_FORMAT } from '../utils';

function DateRangePicker({ setDateRange }) {
  const [selectedDate, setSelectedDate] = React.useState([null, null]);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs')) && 'mobile';

  const handleDateChange = (date = []) => {
    setSelectedDate(date);

    const isAllOfTruthy = !!date[0] && !!date[1];
    const isAllOfFalsy = !date[0] && !date[1];

    if (!isAllOfFalsy && !isAllOfTruthy) {
      return;
    }
    let fromDate, toDate;

    if (isAllOfFalsy) {
      setDateRange({ fromDate, toDate });
      return;
    }

    if (isAllOfTruthy) {
      fromDate = formatDate(date[0]);
      toDate = formatDate(date[1]);
    }
    isValidDateFormat(fromDate) &&
      isValidDateFormat(toDate) &&
      setDateRange({ fromDate, toDate });
  };

  const displayEndIconStart = () => {
    if (isMobile) {
      return null;
    } else {
      return selectedDate[0] ? (
        <IconButton
          style={{ padding: 4 }}
          onClick={() => handleDateChange([null, null])}
        >
          <Clear />
        </IconButton>
      ) : (
        <DateRange fontSize="small" />
      );
    }
  };
  const displayEndIconTo = () => {
    if (isMobile) {
      return null;
    } else {
      return selectedDate[1] ? (
        <IconButton
          style={{ padding: 4 }}
          onClick={() => handleDateChange([null, null])}
        >
          <Clear />
        </IconButton>
      ) : (
        <DateRange fontSize="small" />
      );
    }
  };

  return (
    <>
      <DateRangePickerUI
        inputFormat={DATE_FORMAT}
        clearable
        displayStaticWrapperAs={isMobile || 'desktop'}
        startText="Start Date"
        endText="End Date"
        dis
        value={selectedDate}
        onChange={(date) => {
          handleDateChange(date);
        }}
        renderInput={(startProps, endProps) => (
          <>
            <TextField
              size="small"
              {...startProps}
              helperText={false}
              InputProps={{
                endAdornment: displayEndIconStart()
              }}
            />
            <DateRangeDelimiter>{isMobile ? null : 'To'}</DateRangeDelimiter>
            <TextField
              size="small"
              {...endProps}
              helperText={false}
              InputProps={{
                endAdornment: displayEndIconTo()
              }}
            />
          </>
        )}
      />
      <style jsx global>
        {`
          @media (max-width: 599.95px) {
            .MuiPickersDateRangePickerInput-rangeInputsContainer {
              align-items: center;
              flex-direction: row;
            }
          }
        `}
      </style>
    </>
  );
}

export default DateRangePicker;

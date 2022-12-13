import moment, { Moment } from "moment";
import React from "react";

import { StaticDatePicker, PickersDay, LocalizationProvider, PickersDayProps, pickersDayClasses } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import TextField from "@mui/material/TextField";
import { change_selected_day, getMeetingsByDateAsync } from "../meeting/meetingsSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { getMonthStatisticsAsync, selectWorklogResultState, SUCCESS_WORKLOG_TIME } from "../worklog/worklogSlice";


export default function Calendar()  {   

  const writed = {
    color: "#02bd02",
    fontWeight: "bold",
    fontSize: 18,
    textDecoration: "underline"
  };

    const [value, setValue] = React.useState<Moment | null>(moment());
    const dispatch = useAppDispatch();
    const worklog_state = useAppSelector(selectWorklogResultState)

    const renderWeekPickerDay = (
        date: Moment,
        selectedDates: Array<Moment | null>,
        pickersDayProps: PickersDayProps<Moment>
      ) => {
        const matchedStyles = worklog_state.reduce((a, v) => {
          let worklog_day = moment(v.date)
          let isDone = worklog_day.isSame(date, 'date') && v.duration > SUCCESS_WORKLOG_TIME;
          if (isDone) {
            return writed
          }
          return a;
        }, {});
      
        return (
          <PickersDay
            {...pickersDayProps}
            sx={{
              ...matchedStyles,
              [`&&.${pickersDayClasses.selected}`]: {
                backgroundColor: "green"
              }
            }}
          />
        );
      };

    return<LocalizationProvider dateAdapter={AdapterMoment}>
            <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={value}
                renderDay={renderWeekPickerDay}
                onMonthChange={(newValue) => {
                  dispatch(getMonthStatisticsAsync({
                    day: newValue,
                    force: false
                  }))
                }}
                onChange={(newValue) => {
                    if (newValue) {
                        dispatch(change_selected_day(newValue.format('LL')));
                        dispatch(getMeetingsByDateAsync(newValue));
                        setValue(newValue);
                    }
                }}
                renderInput={(params) => <TextField {...params} />}
        />
    </LocalizationProvider>
}



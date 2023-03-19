import moment, { Moment } from "moment";
import React from "react";

import { StaticDatePicker, PickersDay, LocalizationProvider, PickersDayProps, pickersDayClasses } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import TextField from "@mui/material/TextField";
import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import { ClassesProps } from "../../../common/interfaces/commonComponentProps";
import { change_selected_day, getMeetingsByDateAsync } from "../meeting/meetingsSlice";
import { selectWorklogResultState, SUCCESS_WORKLOG_TIME, getMonthStatisticsAsync } from "../worklog/worklogSlice";


export default function Calendar(props: ClassesProps)  {   

  const writed = {
    color: "#02bd02",
    fontWeight: "bold",
    fontSize: 18,
    textDecoration: "underline"
  };

  const not_writed_full_time = {
    color: "#e8da13",
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
          let worklog_day = moment(v.date);
          let isSameDate = worklog_day.isSame(date, 'date');
          if (isSameDate && v.duration > SUCCESS_WORKLOG_TIME) {
            return writed
          }

          if (isSameDate && v.duration > 0) {
            return not_writed_full_time
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

    return<LocalizationProvider  dateAdapter={AdapterMoment}>
            <StaticDatePicker className={props.classes}
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



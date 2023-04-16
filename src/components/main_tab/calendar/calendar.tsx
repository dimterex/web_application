import moment, { Moment } from "moment";
import React from "react";

import { StaticDatePicker, PickersDay, LocalizationProvider, PickersDayProps, pickersDayClasses } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import TextField from "@mui/material/TextField";

import { change_selected_day, getMeetingsByDateAsync } from "../meeting/meetingsSlice";
import { SUCCESS_WORKLOG_TIME, getMonthStatisticsAsync } from "../worklog/worklogSlice";
import { Widget } from "../../../common/widget/baseWidget";
import { connect } from "react-redux";
import { RootState, AppDispatch } from "../../../app/store";
import { MonthTime } from "../../../api/statistics/messages/monthTimesResponse";

type Props = {
  data: Array<MonthTime>,
  getMonthStatisticsAsync: (value: Moment) => void,
  updateValue: (value: Moment) => void,
  initialize: () => void,
};

type State = {
  selectedDate: Moment,
}

const mapStateToProps = (state: RootState) => {
  return { 
    data: state.worklog.events
  };
};

const mapDispatchToProps = (dispatch: AppDispatch) => {
  return {
    initialize: async () => {
      const now = moment();
      dispatch(getMeetingsByDateAsync(now));
      dispatch(getMonthStatisticsAsync({
        day: now,
        force: false
      }));
    },
    getMonthStatisticsAsync: async (value: Moment) => {
      dispatch(getMonthStatisticsAsync({
        day: value,
        force: false
      }))

    },
    updateValue: async (value: Moment) =>  {
      dispatch(change_selected_day(value.format('LL')));
      dispatch(getMeetingsByDateAsync(value));
    }
  };
};


class Calendar extends React.Component<Props, State> {   
  constructor(props: Props) {
    super(props);
    this.props.initialize();
    this.state = { selectedDate: moment() }
  }

  writed = {
    color: "#02bd02",
    fontWeight: "bold",
    fontSize: 18,
    textDecoration: "underline"
  };

  not_writed_full_time = {
    color: "#e8da13",
    fontWeight: "bold",
    fontSize: 18,
    textDecoration: "underline"
  };

    renderWeekPickerDay = (date: Moment, selectedDates: Array<Moment | null>, pickersDayProps: PickersDayProps<Moment>) => {
        const matchedStyles = this.props.data.reduce((a, v) => {
          let worklog_day = moment(v.date);
          let isSameDate = worklog_day.isSame(date, 'date');
          if (isSameDate && v.duration > SUCCESS_WORKLOG_TIME) {
            return this.writed
          }

          if (isSameDate && v.duration > 0) {
            return this.not_writed_full_time
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

  render() { 
    return <Widget>
      <LocalizationProvider  dateAdapter={AdapterMoment}>
              <StaticDatePicker 
                  displayStaticWrapperAs="desktop"
                  value={this.state.selectedDate}
                  renderDay={this.renderWeekPickerDay}
                  onMonthChange={(newValue) => { this.props.getMonthStatisticsAsync(newValue)}}
                   
                  onChange={(newValue) => { 
                    if (newValue) {
                      this.props.updateValue(newValue)
                      this.setState({
                        selectedDate: newValue,
                      })
                    }
                   }}
                     
                  renderInput={(params) => <TextField {...params} />}
          />
      </LocalizationProvider>
    </Widget>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);

import React, { Component } from 'react';
import Context from '../../../MainContext';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from "react-icons/fa";
import Month from '../Month/Month.js';
import './Calendar.css';

export default class Calendar extends Component {
  static contextType = Context;

  componentDidMount() {
    const date = new Date().getDate();
    this.context.handleDayClick(date);
  }

  changeMonth = (direction) => {
    const newMonth = this.context.selectedDate.getMonth() + direction;
    const newFullDate = new Date(
      this.context.selectedDate.getFullYear(),
      newMonth,
      1
    );
    this.context.changeSelectedDate(newFullDate);

    this.context.changeSelectedMonth(newMonth);
  };

  changeYear = (direction) => {
    const newYear = this.context.selectedDate.getFullYear() + direction;
    const newFullDate = new Date(
      newYear,
      this.context.selectedDate.getMonth(),
      1
    );

    this.context.changeSelectedDate(newFullDate);

    this.context.changeSelectedYear(newYear);
  };

  render() {
    const { selectedDate } = this.context;

    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec"];

    const dateNumber = selectedDate.getDate();
    const monthNumber = selectedDate.getMonth();
    const yearNumber = selectedDate.getFullYear();
    const monthName = getMonthName(monthNumber);

    function getMonthName(index) {
      return months[index];
    }

    return (
      <div className="calendar-container">
        <div className="calendar-header">
          <button
            className="calendar-header-button"
            onClick={() => this.changeYear(-1)}>
            <FaAngleDoubleLeft></FaAngleDoubleLeft>
          </button>
          <button
            className="calendar-header-button"
            onClick={() => this.changeMonth(-1)}>
            <FaAngleLeft></FaAngleLeft>
          </button>
          <h2 className="calendar-container-title"> {`${monthName} ${yearNumber}`} </h2>
          <button
            className="calendar-header-button"
            onClick={() => this.changeMonth(1)}>
            <FaAngleRight></FaAngleRight>
          </button>
          <button
            className="calendar-header-button"
            onClick={() => this.changeYear(1)}>
            <FaAngleDoubleRight></FaAngleDoubleRight>
          </button>
        </div>
        <div className="SomeMonth">
          <Month
            date={dateNumber}
            month={monthNumber}
            year={yearNumber}
          />
        </div>
      </div>
    );
  }
}
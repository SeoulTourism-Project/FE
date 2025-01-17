import React from "react";

const Timetable = ({ date, schedules }) => {
  console.log(schedules);
  return (
    <div>
      <h2>{date.toDateString()}</h2>
    </div>
  );
};

export default Timetable;

import React, { Component } from 'react';

class Timer extends Component {

  twoDigits = num => (num > 9.99)? num : '0' + num;

  formatTime = s => {
    const hours = Math.floor(s % (3600 * 24) / 3600);
    const minutes = Math.floor(s % 3600 / 60);
    const seconds = (s % 60).toFixed(1);
    const n = this.twoDigits;
    return `${n(hours)}:${n(minutes)}:${n(seconds)}`;
  }

  render() {
    const { activeSplitIdx, isActive, onSplitClick, onTimerClick, splitsArray, timer, title } = this.props;
    const format = this.formatTime;
    const splitElements = (!splitsArray)? null : splitsArray.map((item, idx) => (
      <li className={`split${(idx === activeSplitIdx)? ' split--active' : ''}`} onClick={onSplitClick} key={idx} data-idx={idx}>
        {format(item.split)}
      </li>
    ));

    return (
      <div className="Timer">
        <h2 className="title">{title} used here</h2>
        <div className={`timer${isActive? ' timer--active' : ''}`} onClick={onTimerClick}>
          <div className="timer__face timer__face--front">{format(timer)}</div>
          <div className="timer__face timer__face--back"></div>
          <div className="timer__face timer__face--right"></div>
          <div className="timer__face timer__face--left"></div>
          <div className="timer__face timer__face--top"></div>
          <div className="timer__face timer__face--bottom"></div>
        </div>
        <ul>
          {splitElements}
        </ul>
      </div>
    );
  }
}

export default Timer;

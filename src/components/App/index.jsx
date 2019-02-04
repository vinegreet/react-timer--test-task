import React, { Component } from 'react';
import Timer from '../Timer';

console.log(new Date().toLocaleTimeString());

class App extends Component {
  state = {
    isActive: false,
    date: {
      splitsArray: [],
      timer: 0
    },
    interval: {
      splitsArray: [],
      timer: 0
    }
  }

  start = () => {
    const timerDateStart = Date.now() - this.state.date.timer * 1000;
    this.timerInterval = setInterval(() => {
      this.setState(prev => {
        const timerDate = ((Date.now() - timerDateStart) / 1000).toFixed(1);
        const timerInterval = (parseFloat(prev.interval.timer) + 0.1).toFixed(1);
        return {
          isActive: true,
          date: {
            ...prev.date,
            timer: timerDate
          },
          interval: {
            ...prev.interval,
            timer: timerInterval
          }
        };
      });
    }, 100);
  }

  stop = () => {
    clearInterval(this.timerInterval);
    this.setState({ isActive: false });
  }

  handleTimerClick = () => {
    const { isActive } = this.state;
    if (!isActive) {
      this.start();
      return;
    }
    this.setState(prev => {
      const { date, interval } = prev;
      let splitDate, splitInterval;
      splitDate = (!date.splitsArray.length)
        ? date.timer
        : date.timer - date.splitsArray[date.splitsArray.length - 1].timer;
      splitInterval = (!interval.splitsArray.length)
        ? interval.timer
        : interval.timer - interval.splitsArray[interval.splitsArray.length - 1].timer;
      return {
        date: {
          ...date,
          splitsArray: [...date.splitsArray, { timer: date.timer, split: splitDate }]
        },
        interval: {
          ...interval,
          splitsArray: [...interval.splitsArray, { timer: interval.timer, split: splitInterval }]
        }
      };
    });
  }

  handleSplitClick = e => {
    const idx = parseInt(e.target.dataset.idx);
    this.stop();
    this.setState(prev => ({
      date: {
        output: prev.date.splitsArray[idx].output,
        timer: prev.date.splitsArray[idx].timer,
        splitsArray: prev.date.splitsArray.slice(0, idx + 1)
      },
      interval: {
        output: prev.interval.splitsArray[idx].output,
        timer: prev.interval.splitsArray[idx].timer,
        splitsArray: prev.interval.splitsArray.slice(0, idx + 1)
      }
    }));
  }

  render() {
    const { date, interval, isActive } = this.state;
    return (
      <div className="App">
        <Timer title="Date.now()"
          isActive={isActive}
          timer={date.timer}
          splitsArray={date.splitsArray}
          onTimerClick={this.handleTimerClick}
          onSplitClick={this.handleSplitClick} />
        <Timer title="setInterval and incrementation"
          isActive={isActive}
          timer={interval.timer}
          splitsArray={interval.splitsArray}
          onTimerClick={this.handleTimerClick}
          onSplitClick={this.handleSplitClick} />
      </div>
    );
  }
}

export default App;

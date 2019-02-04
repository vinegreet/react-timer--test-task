## Timer

This test task contains two implementations of JavaScript Timer: using Date.now(), and using setInterval and incrementation.

The Date-based one is better, because it doesn't depend on browser attention. 

For example, when you switch tabs, the tab with Timer might be deleted from operative memory and the script execution will stop. When you'll come back to Timer tab, you'll notice that two timers have different timings. And the date-based one has the right timing.

----------------------------

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
function timer(id, deadline) {
    // const deadline = '2020-08-11';
    // const t = Date.parse(deadline) - Date.parse(new Date());
    // console.log(t); // 471733000
    // const days = Math.floor(t / (1000 * 60 * 60 * 24));
    // const hours = Math.floor((t / (1000 * 60 * 60) % 24));
    // const minutes = Math.floor((t / 1000 / 60) % 60);
    // const seconds = Math.floor((t / 1000) % 60);
    // console.log(days); // 5
    // console.log(hours); // 10
    // console.log(minutes); // 57
    // console.log(seconds); //56


    // create own object with data values between actual data and deadline
    function getTimeRemaining(endtime) {

        const t = Date.parse(endtime) - Date.parse(new Date());
        const days = Math.floor(t / (1000 * 60 * 60 * 24));
        const hours = Math.floor((t / (1000 * 60 * 60) % 24));
        const minutes = Math.floor((t / 1000 / 60) % 60);
        const seconds = Math.floor((t / 1000) % 60);

        return {
            'total': t,
            'days': days,
            'hours': hours,
            'minutes': minutes,
            'seconds': seconds
        };
    }

    // add zero to number
    function getZero(num) {
        if (num >= 0 && num < 10) {
            return `0${num}`;
        } else {
            return num;
        }
    }

    // getting Element of DOM and adding value them
    function setClock(selector, endtime) {

        const timer = document.querySelector(selector),
            days = timer.querySelector('#days'),
            hours = timer.querySelector('#hours'),
            minutes = timer.querySelector('#minutes'),
            seconds = timer.querySelector('#seconds'),
            timeInterval = setInterval(updateClock, 1000);

        updateClock();
    // write value in Elements
        function updateClock() {

            // getting object values
            const t = getTimeRemaining(endtime);

            // writting values in element
            days.innerHTML = getZero(t.days);
            hours.innerHTML = getZero(t.hours);
            minutes.innerHTML = getZero(t.minutes);
            seconds.innerHTML = getZero(t.seconds);

            // stop the timer when the time will be over
            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
        }

    }

    setClock(id, deadline);
}

// module.exports = timer;
export default timer;
//A NodeJS module created by Cannicide
//Javascript's native timekeeping-related functions are not the best,
//so I designed a Node module to simplify and extend vanilla JS
//time functions

/* -----------------------------TIME FUNCTIONS---------------------------------- */

//Cannicide's Boolean OR Logic Shortener (Logiq) method, simplifies || logic with preset values
/**
 * 
 * @param {Array} comparators - An array of comparator values to be used in an OR comparison with a selector
 */
function logiq(comparators) {
    /**
     * @param {*} selector - Selector to compare to preset comparator values
     */
    this.or = function(selector) {
        var isMatch = false;
        comparators.forEach((item, index) => {
            if (selector == item) {
                isMatch = true;
            }
        });
        return isMatch;
    };
}

const uhrs = new logiq(["hours", "hrs"]);
const umins = new logiq(["minutes", "mins"]);
const usecs = new logiq(["seconds", "secs"]);
const umils = new logiq(["milliseconds", "ms"]);

/**
 * 
 * @param {*} time - The time value which is measuring an amount of time, described in a unit provided in the unit parameter
 * @param {"hours" | "minutes" | "seconds" | "milliseconds" | "hrs" | "mins" | "secs" | "ms"} unit - The unit of measure that describes the time value
 *  
 */
function Unitime(time, unit) {

    /* 
        <----HOW IT WORKS---->
        The Unitime object allows for the simple conversion of any unit of time
        to any other usable unit of time in Javascript timers. Hours, minutes, seconds,
        and milliseconds are supported to cover most of the units necessary when working
        with Javascript timers.
    */

    this.ms = 0;
    this.secs = 0;
    this.mins = 0;
    this.hrs = 0;
    this.unit = "undefined";
    this.isUnitime = function() {
        return true;
    };
    this.isValid = true;
    if (uhrs.or(unit)) {
        //Unit == hours
        this.ms = ((time * 60) * 60) * 1000;
        this.secs = (time * 60) * 60;
        this.mins = time * 60;
        this.hrs = time;
        this.unit = "hrs";
    }
    else if (umins.or(unit)) {
        //Unit == minutes
        this.ms = (time * 60) * 1000;
        this.secs = time * 60;
        this.mins = time;
        this.hrs = time / 60;
        this.unit = "mins";
    }
    else if (usecs.or(unit)) {
        //Unit == seconds
        this.ms = time * 1000;
        this.secs = time;
        this.mins = this.secs / 60;
        this.hrs = this.mins / 60;
        this.unit = "secs";
    }
    else if (umils.or(unit)) {
        //Unit == milliseconds
        this.ms = time;
        this.secs = time / 1000;
        this.mins = this.secs / 60;
        this.hrs = this.mins / 60;
        this.unit = "ms";
    }
    else {
        //Unit == undefined
        this.ms = undefined;
        this.secs = undefined;
        this.mins = undefined;
        this.hrs = undefined;
        this.isValid = false;
        console.error("Error: The specified Unitime unit was not one of the valid units (hrs/mins/secs/ms) and returned undefined.");
    }

}

function Timer(ut) {

    /* 
        <----HOW IT WORKS---->
        Each timer object can run infinite timer functions simultaneously,
        including parallel timer-types and functions. The .clears() method
        clears all timers on the Timer object. All non-clearing timer methods, with
        the exception of the .before() and .after() methods, utilize native JS
        interval and timeout capabilities. Each method enhances the native options
        granted by these two basic timer-types, improving user coding efficiency.
        These timers are not absolutely precise, but they are as precise as possible
        in native JS and lie below one millisecond of error.
    */

    //Interval-type timers Array variable:
    var invs;
    //Timeout-type timers Array variable:
    var tims;

    //Clears/ends all running timer functions
    //[No timer-type]
    this.clears = function() {

    }
    //Clears/ends all running timer functions of the specified type on the current Timer object
    //[No timer-type]
    this.clearType = function(timerType) {
        
    }
    //Clears/ends all running timer functions of specified type after a specified amount of time (in Unitime)
    //[type = Timeout]
    this.clearOn = function(timerType, clearUt) {

    }
    //Endless interval timer, only stopped by .clears()
    //[type = Interval]
    this.interval = function(func) {

    };
    //Single-occurrence timeout timer, can be prevented by .clears()
    //[type = Timeout]
    this.wait = function(func) {

    };
    //Limited-use interval timer that is stopped when the specified increment value is hit, or by .clears()
    //[type = Interval]
    this.increment = function(func) {

    };
    //Executes function at a specified time, specified by a Date object
    //[type = Timeout]
    this.alarm = function(func) {

    }
    //Executes a function before another function is executed
    //[No timer-type]
    this.before = function(func1, func2) {

    }
    //Executes a function after another function is executed
    //[No timer-type]
    this.after = function(func1, func2) {

    }
    //Passes the time, in the specified Unitime unit, to a function as its only parameter
    //[type = Interval]
    this.stopwatch = function(func) {

    }

}

const tempus = {
    Timer: Timer,
    Unitime: Unitime
}

/*
    <----Unitime Benefits---->
    Unitime can be used by the user to convert between times, for
    example a conversion of seconds to hours:

        var secsToHrs = new Unitime(2, "secs").hrs;
        console.log(secsToHrs);

    This code takes in 2 seconds and converts it into the number of hours
    two seconds is equal to (a very small number). This conversion can
    not only be used by the user, but can (and is) also be used by Tempus
    in its Timer methods for precision timing. This is especially useful, as
    most native JS timers utilize milliseconds, and it is frustrating for some
    users to continuously do the mental math of hours -> milliseconds each time
    they want to use a timer. Unitime eliminates this wasted time, allowing all units
    of time to exist within one object, which has already translated the specified unit
    into all other usable units.


    <----Timer Benefits---->
    The Timer object not only simplifies native JS timer usage, it also adds onto them. New
    abilities such as stopwatch and alarm functionality that would require extensive code
    within setInterval/setTimeout methods only require 1-2 lines of code when using the Timer
    object. The native functionality and much more is available in far less lines of code, making
    Javascript timing more efficient and user-friendly. The usage of Unitime in conjuction with the
    Timer object also simplifies timer functionality, and allows for more precise timing with converted
    units of time.


    <----Tempus---->
    Tempus creates an efficient, precise, and effective Javascript temporal environment by utilizing a
    combination of Unitime and Timer objects. The Unitime object simplifies the description of time and
    its units. The Timer object simplifies and extends Javascript timing capabilities. The combination
    of the two creates an enhanced platform for time management in Javascript.

    The Unitime and Timer objects, as well as the Logiq simplifier, were created by Cannicide.
    The Tempus module was also created by Cannicide.
    Use the Tempus module as shown in the following example:

        const tempus = require("./tempus");
        const Unitime = tempus.Unitime;
        const Timer = tempus.Timer;

    Thank you for contributing and assisting in the creation of Tempus.
    Thanks to Tim Daniels (Apophis) for inspiring the Logiq simplifier.
    Thanks to the team at Muzzy NN Finder, who sponsored the creation of Tempus.
*/


//Tempus is currently a WIP, and most of the Timer methods need to be written
//Do not import/require this module as a dependency until it is finished and a stable version is released.
/*** module.exports = tempus; ***/
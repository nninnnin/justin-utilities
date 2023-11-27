"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const date_fns_1 = require("date-fns");
const react_1 = require("react");
const useTimer = (timeLeftAsSecond) => {
    const endAtRef = (0, react_1.useRef)(null);
    const intervals = (0, react_1.useRef)([]);
    const [timeLeft, setTimeLeft] = (0, react_1.useState)(0);
    const [isOver, setIsOver] = (0, react_1.useState)(false);
    function processTime(callback) {
        const timeout = setTimeout(() => {
            setTimeLeft((prev) => prev - 1000);
            const currentTime = (0, date_fns_1.getTime)(new Date());
            const isOver = callback() || endAtRef.current <= currentTime;
            if (isOver) {
                setIsOver(true);
                return;
            }
            processTime(callback);
        }, 1000);
        intervals.current.push(timeout);
    }
    // 처음에 설정되었던 시간으로 되돌려 카운트다운을 재시작한다
    const reset = (stopConditionCallback) => {
        if (intervals.current.length) {
            intervals.current.forEach((timeoutFunc) => clearTimeout(timeoutFunc));
        }
        setIsOver(false);
        const currentTime = (0, date_fns_1.getTime)(new Date());
        const timeLeft = timeLeftAsSecond * 1000;
        endAtRef.current = currentTime + timeLeft;
        setTimeLeft(timeLeft);
        processTime(stopConditionCallback);
    };
    // 남은 시간은 그대로 두고 시계를 멈춘다
    const stop = () => {
        if (intervals.current.length) {
            intervals.current.forEach((timeoutFunc) => clearTimeout(timeoutFunc));
        }
        setIsOver(true);
    };
    return {
        timeLeft,
        isOver,
        reset,
        stop,
    };
};
module.exports = {
    useTimer,
};

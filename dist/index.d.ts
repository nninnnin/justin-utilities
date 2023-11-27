export function useTimer(timeLeftAsSecond: number): {
  timeLeft: number;
  isOver: boolean;
  reset: (stopConditionCallback: () => boolean) => void;
  stop: () => void;
};

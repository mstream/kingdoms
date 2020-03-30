// @flow

export const minutesToDurationString = (
    {
        durationInMinutes,
    }: {
        durationInMinutes: number
    },
): string => {
    if (durationInMinutes < 0) {
        throw Error('duration cannot be negative');
    }
    if (durationInMinutes === 0) {
        return '0';
    }
    const hours = Math.floor(durationInMinutes / 60);
    const minutes = Math.floor(durationInMinutes % 60);

    const hoursStr = hours > 0 ? `${hours}h` : '';
    const minutesStr = minutes > 0 ? `${minutes}m` : '';
    const delimiterStr = hours > 0 && minutes > 0 ? ' ' : '';

    return `${hoursStr}${delimiterStr}${minutesStr}`;
};

export const calculateTimeDeltaInSeconds = (
    {
        fromTime,
        toTime,
    }: {
        fromTime: string,
        toTime: string,
    },
): number => {
    return (Date.parse(toTime) - Date.parse(fromTime)) / 1000;
};

export const translateTime = (
    {
        deltaInMinutes,
        time,
    }: {
        deltaInMinutes: number,
        time: string,
    },
): string => {
    const timeInMilliseconds: number = Date.parse(time);
    const translatedTimeInMilliseconds: number = timeInMilliseconds + deltaInMinutes * 60 * 1000;
    return new Date(translatedTimeInMilliseconds).toISOString();
};

export const getWeekFromDate = (inputdate) => {
    const dateParts = inputdate.split('-');
    if (dateParts.length !== 3) {
        throw new Error('Invalid date format');
    }
    const year = parseInt(dateParts[0]);
    const month = parseInt(dateParts[1]) - 1; // Months are zero-based
    const day = parseInt(dateParts[2]);

    if (isNaN(year) || isNaN(month) || isNaN(day)) {
        throw new Error('Invalid date format');
    }

    const date = new Date(year, month, day);

    const weekdays = [];
    // Find the previous Monday
    date.setDate(date.getDate() - (date.getDay() + 6) % 7);

    // Generate weekdays starting from Monday
    for (let i = 0; i < 7; i++) {
        weekdays.push(new Date(date).toISOString().slice(0, 10));
        date.setDate(date.getDate() + 1);
    }

    return weekdays;
}
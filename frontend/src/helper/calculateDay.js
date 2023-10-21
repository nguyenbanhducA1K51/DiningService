/**
    * This method  accept am input date and return all the week day in that week
    * @param  {string} - date to find its relative week days
   * @return {List of strings} - all week days in that week
   */

export const getWeekDays = (inputDate = null) => {
    if (!inputDate) {
        inputDate = new Date()
    }
    // Create a copy of the input date to avoid modifying it
    const date = new Date(inputDate);

    // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
    const dayOfWeek = date.getDay();

    // Calculate the date for the start of the week (Sunday)
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - dayOfWeek);

    // Initialize an array to store the week's dates
    const weekDates = [];

    // Loop to add each day in the week to the array
    for (let i = 0; i < 7; i++) {
        const day = new Date(startOfWeek);
        day.setDate(startOfWeek.getDate() + i);
        const formattedDate = day.toISOString().slice(0, 10);
        weekDates.push(formattedDate);
    }

    return weekDates;
}

// function isDateFormatValid(dateString) {
//     // Regular expression pattern for "YYYY-MM-DD" format
//     const datePattern = /^\d{4}-\d{2}-\d{2}$/;

//     // Test the input string against the pattern
//     return datePattern.test(dateString);
// }

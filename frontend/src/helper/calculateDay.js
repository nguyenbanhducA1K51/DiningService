/**
    * This method  accept am input date and return all the week day in that week start from monday
    * @param  {string} - date to find its relative week days
   * @return {List of strings} - all week days in that week
   */
export const getWeekDays = (inputDate = null) => {
    if (!inputDate) {
        inputDate = new Date();
    }
    const weekdays = [];

    // Find the previous Monday
    inputDate.setDate(inputDate.getDate() - (inputDate.getDay() + 6) % 7);

    // Generate weekdays starting from Monday
    for (let i = 0; i < 7; i++) {
        const year = inputDate.getFullYear();
        const month = String(inputDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(inputDate.getDate()).padStart(2, '0');
        const weekDay = inputDate.toLocaleString('en-US', { weekday: 'long' });

        const formattedDate = [year, month,day].join("-")
    
        weekdays.push(formattedDate);
        inputDate.setDate(inputDate.getDate() + 1);
    }

    return weekdays;

}

export const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().slice(0,10)
}

export const getTodayDate = () => {
    const today = new Date()
    return today.toISOString().slice(0, 10)
}

export const fullDateToReduce = (date) => {
    if (!date instanceof Date) {
        console.log('It is not a Date object.');
        return
    }
    return date.toISOString().slice(0, 10)

}
export const reduceToFullDate = (input) => {
    try {
        let parts=[]
        if (!input) {
            parts= new Date().toISOString().slice(0,10).split("-")
        }
        else {
            parts = input.split('-');
        }
        
        if (parts.length != 3) {
            throw new Error("invalid input")
        }
        const year = parseInt(parts[0], 10);
        const month = parseInt(parts[1], 10) - 1; // Month is zero-based in JavaScript (0-11)
        const day = parseInt(parts[2], 10);

        // Create a new Date object using the extracted values
        return  new Date(year, month, day);

    } catch (error) {
        console.log("error from calculateDay input" , input, error)
    }

}

/**
    * This method  accept am input date and return all the week day in that week start from monday
    * @param  {string} - date in format YYYY--MM--DD
   * @return {List of strings} - all week days in that week
   */
export const getWeekDays = (inputDate = null) => {
    let date = null  

    date=inputDate ? reduceToFullDate(inputDate):new Date()

    const weekdays = [];
    // Find the previous Monday
    date.setDate(date.getDate() - (date.getDay() + 6) % 7);

    // Generate weekdays starting from Monday
    for (let i = 0; i < 7; i++) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const weekDay = date.toLocaleString('en-US', { weekday: 'long' });

        const formattedDate = `${year}-${month}-${day}`;

        weekdays.push(formattedDate);
        date.setDate(date.getDate() + 1);
    }
    return weekdays;

}



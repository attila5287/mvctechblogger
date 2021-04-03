module.exports = {
  calculate_progress: (need, coll) => {
    return Math.floor((coll / need) * 100);
  },
  format_amount: (amount) => {
    // format large numbers with commas
    return parseInt( amount ).toLocaleString();
    
  },
  format_date: (date) => {
    // Using JavaScript Date methods, we get and format the month, date, and year
    // We need to add one to the month since it is returned as a zero-based value
    return `${new Date(date).getMonth() + 1}/${new Date(date).getDate()}/${
      // We add five years to the 'year' value to calculate the end date
      new Date(date).getFullYear() + 5
    }`;
  },
};

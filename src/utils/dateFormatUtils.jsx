import { format, parseISO } from "date-fns";

const formateDate = (date) => {
    if (!date) return; 
    let parsedDate;
    try {
        parsedDate = parseISO(date); 
        if (isNaN(parsedDate)) {
            throw new Error('Invalid date');
        }
    } catch (error) {
          console.log(error);
    }
    const formattedDate = format(parsedDate, "dd MMMM yyyy");
    return formattedDate;
};

export default formateDate;
import { format } from "date-fns";

export const formatDate = (date) => {    // console.log(string);

    const date2 = new Date(date);
    const formattedDate = format(
        new Date(date2.getUTCFullYear(), date2.getUTCMonth(), date2.getUTCDate()),
        'dd/MM/yyyy'
    );


    return formattedDate;


}
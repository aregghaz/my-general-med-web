import { IOption } from "../components/select/select";

export default function numberFormatting(x: number | string): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export const getDaysInMonth = (date: Date): number =>
    new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();


export const getMonthDays = (lastDayMonth: number): Array<IOption> => {
    const monthDays: Array<IOption> = [];
    for (let i = 0; i < lastDayMonth; i++) {
        monthDays.push({
            id: i + 1,
            value: `${i + 1}`,
            label: `${i + 1}`
        });
    }
    return monthDays;
};






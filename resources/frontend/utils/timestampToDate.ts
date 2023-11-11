const timestampToDate = (date: Date | string) => {
    const year = new Date(date).getFullYear();
    const monthRaw = new Date(date).getMonth();
    const monthFormatted = monthRaw > 8 ? monthRaw + 1 : `0${monthRaw + 1}`;
    const dayRaw = new Date(date).getDate();
    const day = dayRaw > 9 ? dayRaw : `0${dayRaw}`;

    return `${monthFormatted}/${day}/${year}`;
};

export default timestampToDate;

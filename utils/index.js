export const checkImageURL = (url) => {
    if (!url) return false
    else {
        const pattern = new RegExp('^https?:\\/\\/.+\\.(png|jpg|jpeg|bmp|gif|webp)$', 'i');
        return pattern.test(url);
    }
};


export const convertToTime = (decimalHours) => {
    var hours = Math.floor(decimalHours);
    var minutes = Math.floor((decimalHours - hours) * 60);
    return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export const calculateAverage = (distance1, distance2) => {
    const num1 = parseFloat(distance1);
    const num2 = parseFloat(distance2);
    const average = (num1 + num2) / 2 / 1000;
    return average.toFixed(2); // Assuming you want to display the average with two decimal places
};

export const getOrderedTime = (time1, time2) => {
    const smallerTime = parseInt(time1);
    const largerTime = parseInt(time2);

    if (smallerTime > largerTime) {
        return `${largerTime} - ${smallerTime}`;
    } else {
        return `${smallerTime} - ${largerTime}`;
    }
};

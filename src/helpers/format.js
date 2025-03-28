
const date = (dateTime) => {
    let dateTimeParts = dateTime.split(/[- :]/); // regular expression split that creates array with: year, month, day, hour, minutes, seconds values
    dateTimeParts[1]--; 

    const dateObject = new Date(...dateTimeParts);
    return dateObject.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

const time = (dateTime) => {
    let dateTimeParts = dateTime.split(/[- :]/); // regular expression split that creates array with: year, month, day, hour, minutes, seconds values
    dateTimeParts[1]--; 

    const dateObject = new Date(...dateTimeParts);
    return dateObject.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric' });
}

const datetime = (dateTime) => {
    let dateTimeParts = dateTime.split(/[- :]/); // regular expression split that creates array with: year, month, day, hour, minutes, seconds values
    dateTimeParts[1]--; 

    const dateObject = new Date(...dateTimeParts);
    return dateObject.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric' });
}

const currency = (amount) => {
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        roundingMode: 'floor'
    });

    return formatter.format(amount);
}

function ordinal(i) {
    let j = i % 10,
        k = i % 100;

    if (j == 1 && k != 11) {
        return i + "st";
    }

    if (j == 2 && k != 12) {
        return i + "nd";
    }

    if (j == 3 && k != 13) {
        return i + "rd";
    }

    return i + "th";
}

export { currency, datetime, time, date, ordinal };

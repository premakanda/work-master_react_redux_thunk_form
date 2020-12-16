export const requairedField = value => {
    if (value) {
        return undefined;
    }
    return "Заполните все поля";
}

export const maxLenghtCreator = (maxLenght) => value => {
    if (value && value.length > maxLenght) {
        return `max lenght is  ${maxLenght} symbols`;
    }
    return undefined;
}


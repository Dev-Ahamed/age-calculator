const inputTopText = document.querySelectorAll('.input-top-text'),
    inputsContainer = document.querySelector('.inputs-container'),
    dayInput = document.querySelector('#day'),
    monthInput = document.querySelector('#month'),
    yearInput = document.querySelector('#year'),
    inputBtmErrMsg = document.querySelectorAll('.error'),
    submit = document.querySelector('#submit');

const outputYear = document.querySelector('.years .year'),
    outputMonth = document.querySelector('.months .month'),
    outputDay = document.querySelector('.days .day');

const errMsg1 = "This field is required",
    errMsg2 = "Must be a valid day",
    errMsg3 = "Must be a valid month",
    errMsg4 = "Must be in the past",
    errMsg5 = "Must be a valid date";

const currentDate = new Date();

submit.onclick = () => {
    const dayValue = dayInput.value,
        monthValue = monthInput.value,
        yearValue = yearInput.value;

    if (dayValue >= 1 && dayValue <= 31 && monthValue >= 1 && monthValue <= 12 && yearValue >= 1 && yearValue.length == 4 && yearValue <= currentDate.getFullYear()) {
        ageCalculation(dayValue, monthValue, yearValue);
    } else {
        valuesArr = [dayValue, monthValue, yearValue];
        let i = 0;
        for (const x of valuesArr) {
            if (x <= 0 || isNaN(x) || dayValue > 31 || monthValue > 12 || yearValue > currentDate.getFullYear()) {
                errorShow(i);
            }
            i++;
        }
    }

}

errorShow = (val) => {
    inputBtmErrMsg[val].style.display = "block";
    inputBtmErrMsg[val].innerHTML = errMsg1;
    inputTopText[val].classList.add('error-color');

    if (val == 0) {
        dayInput.classList.add('error');
    }
    if (val == 1) {
        monthInput.classList.add('error');
    }
    if (val == 2) {
        yearInput.classList.add('error');
    }

    if (dayInput.value > 31) {
        inputBtmErrMsg[0].innerHTML = errMsg2;
    }

    if (monthInput.value > 12) {
        inputBtmErrMsg[1].innerHTML = errMsg3;
    }

    if (yearInput.value > currentDate.getFullYear()) {
        inputBtmErrMsg[2].innerHTML = errMsg4;
    }

    if (dayInput.value > monthLastDate) {
        inputBtmErrMsg[val].innerHTML = errMsg5;
    }
}

// Remove applied error message
inputsContainer.onclick = (e) => {
    if (e.target.nodeName == "INPUT") {
        e.target.oninput = () => {
            e.target.classList.remove('error');
            e.target.parentElement.children[0].classList.remove('error-color');
            e.target.parentElement.children[2].style.display = "none";
        }
    }
}

ageCalculation = (day, month, year) => {
    const uDOB = new Date(`${year}-${month}-${day}`);

    monthLastDate = new Date(year, month, 0).getDate();
    if (day > monthLastDate) {
        errorShow(0);
    } else {

        let uDate = uDOB.getDate(),
            uMonth = uDOB.getMonth(),
            uYear = uDOB.getFullYear();

        let cDate = currentDate.getDate(),
            cMonth = currentDate.getMonth(),
            cYear = currentDate.getFullYear();

        let dateDiff = cDate - uDate,
            monthDiff = cMonth - uMonth,
            yearDiff = cYear - uYear;

        if (monthDiff < 0) {
            yearDiff--;
            monthDiff = 12 + monthDiff;
        }

        if (dateDiff < 0) {
            monthDiff--;
            const prevMonthLastDate = new Date(cYear, cMonth, 0).getDate();
            dateDiff = prevMonthLastDate + dateDiff;

            if (monthDiff < 0) {
                monthDiff = 11;
                yearDiff--;
            }
        }


        outputYear.innerHTML = `${yearDiff}`;
        outputMonth.innerHTML = `${monthDiff}`;
        outputDay.innerHTML = `${dateDiff}`;
    }
}
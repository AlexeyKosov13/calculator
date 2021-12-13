// значения из текстовых инпутов

const totalCost = document.getElementById('total-cost'),
    anInitialFee = document.getElementById('an-initial-fee'),
    creditTerm = document.getElementById('credit-term');

//значения из range инпутов

const totalCostRange = document.getElementById('total-cost-range'),
    anInitialFeeRange = document.getElementById('an-initial-fee-range'),
    creditTermRange = document.getElementById('credit-term-range');

// итоговые значения
const totalAmountCredit = document.getElementById('amount-of-credit'),
    totalMonthlyPayment = document.getElementById('monthly-payment'),
    totalRecomendedIncome = document.getElementById('recommended-income');

// все  кнопки range
const inputsRange = document.querySelectorAll('.input-range');

// все кнопки с процентной ставкой

const bankBtns = document.querySelectorAll('.bank');

const inputsUser = document.querySelectorAll('.input-user-value');

const assignValue = () => {
    totalCost.value = totalCostRange.value;
    anInitialFee.value = anInitialFeeRange.value;
    creditTerm.value = creditTermRange.value;
}
const inputValue = () => {
    totalCostRange.value = totalCost.value;
    console.log(totalCostRange.value);
    anInitialFeeRange.value = anInitialFee.value;
    creditTermRange.value = creditTerm.value;
}

assignValue();

const banks = [
    {
        name: 'alfa',
        precent: 8.7,
    },
    {
        name: 'sberbank',
        precent: 8.4,
    },
    {
        name: 'pochta',
        precent: 7.9,
    },
    {
        name: 'tinkoff',
        precent: 9.3,
    },
];

let currentPrecent = banks[0].precent;

for (let bank of bankBtns) {
    bank.addEventListener('click', () => {
        for (let item of bankBtns) {
            item.classList.remove('active');
        }
        bank.classList.add('active');
        takeActiveBank(bank);
    });
};

// выбор банка
const takeActiveBank = currentActive => {
    const dataAttrValue = currentActive.dataset.name;
    const currentBank = banks.find(bank => bank.name === dataAttrValue);
    currentPrecent = currentBank.precent;
    calculation(totalCost.value, anInitialFee.value, creditTerm.value);
};

for (let input of inputsRange) {
    input.addEventListener('input', () => {
        assignValue();
        calculation(totalCost.value, anInitialFee.value, creditTerm.value);
    })
};

for (let input of inputsUser) {
    input.addEventListener('input', () => {
        inputValue();
        calculation(totalCost.value, anInitialFee.value, creditTerm.value);
    })
}

// расчет 
const calculation = (totalCost = 0, anInitialFee = 100000, creditTerm = 1)=> {
    let mouthlyPayment;
    let lounAmount = totalCost - anInitialFee; // размер кредита
    let interestRate = currentPrecent; // процентная ставка
    let numberOfYears = creditTerm; // количество лет
    let numberOfMonths = 12 * numberOfYears; // количество месяцев

    mouthlyPayment = (lounAmount + (((lounAmount / 100) * interestRate) / 12) * numberOfMonths) / numberOfMonths;
    console.log(interestRate);
    const mounthlyPymentArounded = Math.round(mouthlyPayment);
    if (mounthlyPymentArounded < 0) {
        return false;
    } else {
        totalAmountCredit.innerHTML = `${lounAmount} ₽`;
        totalMonthlyPayment.innerHTML = `${mounthlyPymentArounded} ₽`;
        totalRecomendedIncome.innerHTML = `${mounthlyPymentArounded + ((mounthlyPymentArounded/100)*35)} ₽`;
    }
}




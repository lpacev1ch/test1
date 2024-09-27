// СТРАНИЦА ПРОЕКТА

// Получаем кнопки и секции
const buttons = document.querySelectorAll('.section-button');
const sections = document.querySelectorAll('.section');

// Функция для активации секции и кнопки
function activateSection(buttonId, sectionId) {
    buttons.forEach(button => {
        if (button.id === buttonId) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    sections.forEach(section => {
        if (section.id === sectionId) {
            section.classList.add('active-section');
            section.style.display = "block";  // Показываем активную секцию
        } else {
            section.classList.remove('active-section');
            section.style.display = "none";  // Скрываем неактивные секции
        }
    });
}

// Обработчики для кнопок
document.getElementById('project-button').addEventListener('click', () => {
    activateSection('project-button', 'project-section');
});
document.getElementById('investment-button').addEventListener('click', () => {
    activateSection('investment-button', 'investment-section');
});
document.getElementById('potential-button').addEventListener('click', () => {
    activateSection('potential-button', 'potential-section');
});

// По умолчанию открыта секция "О проекте"
activateSection('project-button', 'project-section');

// Количество аккаунтов и поинтов по умолчанию
let accountsQuantity = 0;
let pointsQuantity = 0;

// Получаем имя проекта из Headline в namePriceWrapper
const projectName = document.querySelector('.namePriceWrapper .Headline').textContent;

// Функции обновления количества аккаунтов и поинтов
function updateQuantity(type, amount) {
    if (type === 'accounts') {
        accountsQuantity = Math.max(0, accountsQuantity + amount);
        document.getElementById('accounts-quantity').innerText = accountsQuantity;
        document.getElementById('order-accounts').innerText = `${accountsQuantity} x 100$`;
    } else if (type === 'points') {
        pointsQuantity = Math.max(0, pointsQuantity + amount);
        document.getElementById('points-quantity').innerText = pointsQuantity;
        document.getElementById('order-points').innerText = `${pointsQuantity} x 270$`;
    }

    updateTotal();
    updatePayButtonState();
}

// Обновление итоговой суммы
function updateTotal() {
    const total = (accountsQuantity * 100) + (pointsQuantity * 270);
    document.getElementById('order-total').innerText = `${total}$`;

    // Обновляем имя проекта в заказе
    document.getElementById('order-name-accounts').textContent = `${projectName}: аккаунты`;
    document.getElementById('order-name-points').textContent = `${projectName}: поинты`;
}

// Обновление состояния кнопки "К ОПЛАТЕ"
function updatePayButtonState() {
    const payButton = document.getElementById('pay-button');
    if (accountsQuantity > 0 || pointsQuantity > 0) {
        payButton.classList.remove('inactive');
        payButton.disabled = false;
    } else {
        payButton.classList.add('inactive');
        payButton.disabled = true;
    }
}

// Отключаем кнопки "минус" для счетчиков по умолчанию
document.getElementById('decrement-accounts').disabled = true;
document.getElementById('decrement-points').disabled = true;

// Инкремент и декремент количества аккаунтов и поинтов
function increment(type) {
    updateQuantity(type, 1);
    if (type === 'accounts') {
        document.getElementById('decrement-accounts').disabled = false;
    } else if (type === 'points') {
        document.getElementById('decrement-points').disabled = false;
    }
}

function decrement(type) {
    updateQuantity(type, -1);
    if (type === 'accounts' && accountsQuantity === 0) {
        document.getElementById('decrement-accounts').disabled = true;
    } else if (type === 'points' && pointsQuantity === 0) {
        document.getElementById('decrement-points').disabled = true;
    }
}

// Функция для показа секции оплаты
function showSection(sectionId) {
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.display = section.id === sectionId ? 'block' : 'none';
    });
}

// Логика выбора метода оплаты
function selectPaymentMethod(method) {
    const usdtButton = document.getElementById('usdt-button');
    const cardButton = document.getElementById('card-button');

    if (method === 'usdt') {
        usdtButton.classList.add('active');
        cardButton.classList.remove('active');
    } else if (method === 'card') {
        cardButton.classList.add('active');
        usdtButton.classList.remove('active');
    }
}

// Валидация и логика формы оплаты

let isEmailValid = false;
let isPromoCodeValid = false; // Промокод теперь не обязателен
let isAgreementChecked = false;

// Валидация email
function validateEmail() {
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const emailValue = emailInput.value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailPattern.test(emailValue)) {
        emailInput.classList.remove('error');
        emailError.style.display = 'none';
        isEmailValid = true;
    } else {
        emailInput.classList.add('error');
        emailError.style.display = 'block';
        isEmailValid = false;
    }

    checkFormCompletion();
}

// Применение промокода (не обязательное для оплаты)
function applyPromoCode() {
    const promoInput = document.getElementById('promo-code');
    const promoError = document.getElementById('promo-error');
    const promoValue = promoInput.value;
    const applyButton = document.getElementById('apply-button');

    if (promoValue === 'RetroKuhnia') {
        promoInput.classList.remove('error');
        promoError.style.display = 'none';
        applyButton.classList.remove('disabled');
        isPromoCodeValid = true;
    } else if (promoValue !== '') {
        promoInput.classList.add('error');
        promoError.style.display = 'block';
        applyButton.classList.add('disabled');
        isPromoCodeValid = false;
    } else {
        promoError.style.display = 'none';
        applyButton.classList.remove('disabled');
    }

    checkFormCompletion();
}

// Проверка чекбокса пользовательского соглашения
function checkAgreement() {
    isAgreementChecked = document.getElementById('agreement-checkbox').checked;
    const agreementError = document.getElementById('agreement-error');

    if (!isAgreementChecked) {
        agreementError.style.display = 'block';
    } else {
        agreementError.style.display = 'none';
    }

    checkFormCompletion();
}

// Проверка, можно ли активировать кнопку "ОПЛАТИТЬ"
function checkFormCompletion() {
    const payButton = document.getElementById('final-pay-button');

    if (isEmailValid && isAgreementChecked) {
        payButton.classList.remove('inactive');
        payButton.disabled = false;
    } else {
        payButton.classList.add('inactive');
        payButton.disabled = true;
    }
}
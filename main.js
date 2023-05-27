
let purcasheArray = [];
let btn = form.addBtn;
let tbody = document.querySelector('#tbody');
let categories = document.querySelectorAll('.legend__category');
let prices = document.querySelectorAll('.legend__price');


console.log(categories);

// Обработка клика по кнопке "Добавить"
btn.addEventListener('click', (evt) => {

    // обьявление объекта покупки
    let purcashe = {};

    // Отмена действия по умолчанию
    evt.preventDefault();

    // Записываем из полей формы наименование и цену покупки в соответствующие свойства объекта
    purcashe.name = form.name.value;
    purcashe.price = form.price.value;

    // form.selectCategory.options - коллекция элементов select (коллекция option)
    // form.selectCategory.selectedIndex - индекс выделенного элемента селекта
    purcashe.category = form.selectCategory.options[form.selectCategory.selectedIndex].innerText;


    // Перебираем в цикле коллекцию категорий из легенды
    for (category of categories) {
        // Если выбранная категория совпадает с категорией из легенды то в легенду прибавляется число
        // Так как мы проверяем чтобы категории были равны то складывать мы будем именно с соседним элементом, так как там находится значение
        if (purcashe.category == category.innerText) {
            category.nextElementSibling.textContent = Number(category.nextElementSibling.innerText) + Number(purcashe.price);
        }
    }

    // Записываем объекты покупок в массив покупок
    purcasheArray.push(purcashe);
    console.log(purcasheArray);

    // Добавляем в конец tbody разметку
    tbody.insertAdjacentHTML('beforeEnd',
        `        
            <tr class="purcashes__item purcashes__row" data-category="product">
                <td class="purcashes__td">${purcashe.name}</td>
                <td class="purcashes__td category__td">${purcashe.category}</td>
                <td class="purcashes__td price__td">${purcashe.price}</td>
                <td class="purcashes__td"><i class="purcashes__item-del fa-solid fa-xmark"></i></td>
            </tr>
        `
    )

    // Сброс полей формы
    form.reset();
    diagram(prices);
});


// Обработка кнопки удаления задачи
tbody.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('purcashes__item-del')) {
        evt.target.closest('tr').remove();

        // Перебираем в цикле коллекцию категорий из легенды
        for (category of categories) {

            // При клике на кнопку удаления задачи ищем ближайшего родителя tr, находим дочерний элемент с индексом 1 (ячейку)
            // Проверяем чтобы ее текстовое сожержимое было равно названию категории 
            if (evt.target.closest('tr').children[1].innerText == category.innerText) {

                // Выбираем соседний элемент в легенде и записываем в его содержимое разницу того что было в содержимом этого элемента минус
                // значение дочернего элемента строки под индексом 2
                category.nextElementSibling.textContent = Number(category.nextElementSibling.innerText) - Number(evt.target.closest('tr').children[2].innerText);
            }
        }
    }
    diagram(prices);
})




// Диаграмма

function diagram(prices) {

    // Массив для преобразования коллекции цен в числа
    let priceArray = [];

    for (let price of prices) {
        priceArray.push(+price.innerText);
    }

    let units = document.querySelectorAll('.unit');

    console.log(units[1].getAttribute('stroke-dasharray'));

    // unit.setAttribute('stroke-dasharray', '5 3');

    console.log(units[1].getAttribute('stroke-dasharray'));

    let spending = {
        product: priceArray[0],
        fastFood: priceArray[1],
        sport: priceArray[2],
        drink: priceArray[3],
    }

    let sum = 0;

    for (key in spending) {
        console.log(spending[key]);
        sum = sum + spending[key];
    }

    console.log('Сумма ', sum);

    let percentArr = [];

    for (let key in spending) {
        percentArr.push(spending[key] / sum * 100);
    }

    console.log(percentArr);

    let percentAccumulator = 0;

    for (let i = 0; i < units.length; i++) {
        units[i].setAttribute('stroke-dasharray', `${percentArr[i]} 100`);
        if (percentArr[i - 1]) {
            percentAccumulator += percentArr[i - 1];
        }
        console.log('накопитель ', percentAccumulator);
        units[i].setAttribute('stroke-dashoffset', -percentAccumulator);
    }
}
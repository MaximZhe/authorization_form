const form = document.querySelector('#order-form');

//Перебираем массив с всеми input в форме
const checkValidityAll = () => {
  const inputs = form.querySelectorAll('input');
  inputs.forEach((input) => {
    if(input.classList.contains("invalid")){
        input.classList.add("nofocus");
    };
    checkValidity(input);
  });
}
checkValidityAll();
//Проверяем на валидность input
function checkValidity (input) {
    input.classList.remove('valid');
    input.classList.remove('invalid');
    input.addEventListener('change', () => {
        if (input.checkValidity() && input.hasAttribute('required')) {
        input.classList.remove("nofocus");
        input.classList.add('valid');
        } 
        else if(input.hasAttribute('required')){
            input.classList.add('invalid');
        }
    });
    
}
//Проверяем наличие атрибута у объекта на котором происходит событие
const onCheckValidity = (e) => {
  const target = e.target;
  if (!target.hasAttribute('required')) {
    return;
  }
  checkValidity(target);
}
//Запускаем валидацию при изменении событий в input
form.addEventListener('input', onCheckValidity);
form.addEventListener('keydown', onCheckValidity);

checkValidityAll();


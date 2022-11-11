const elem = document.querySelector("#input-phone");
const orderForm = document.querySelector("#order-form");
//массив с масками
const maskeds = [
	'8 (___) ___-__-__',
	'+7 (___) ___-__-__'
]

//Подставляем маску при вводе номера в input
function maskPhone(selector, masked) {
	function mask(event) {
		const keyCode = event.keyCode;
		const template = masked,
			def = template.replace(/\D/g, ""),
			val = this.value.replace(/\D/g, "");
		let i = 0,
			newValue = template.replace(/[_\d]/g, function (a) {
				return i < val.length ? val.charAt(i++) || def.charAt(i) : a;
			});
		i = newValue.indexOf("_");
		if (i !== -1) {
			newValue = newValue.slice(0, i);
		}
		let reg = template.substr(0, this.value.length).replace(/_+/g,
			function (a) {
				return "\\d{1," + a.length + "}";
			}).replace(/[+()]/g, "\\$&");
		reg = new RegExp("^" + reg + "$");
		if (!reg.test(this.value) || this.value.length < 5 || keyCode > 47 && keyCode < 58) {
			this.value = newValue;
		}
		if (event.type === "blur" && this.value.length < 5) {
			this.value = "";
		}

	}
	selector.addEventListener("input", mask);
}
//Вызываем функцию подстановки маски в зависимости от value инпута
let newValue = 0;
res = /[0-6,9]/g;
elem.addEventListener("input", () => {
	if(elem.value[0] === "8"){
		maskPhone(elem,maskeds[0])
		const regs = String.raw`\d{1}\s[\(]\d{3}[\)]\s\d{3}[\-]\d{2}[\-]\d{2}`
		elem.setAttribute("pattern",`${regs}`)
		
	}
	if(elem.value[0] === "+" || elem.value[0] === "7"){
		maskPhone(elem, maskeds[1])
		const reg = String.raw`[\+]\d{1}\s[\(]\d{3}[\)]\s\d{3}[\-]\d{2}[\-]\d{2}`
		elem.setAttribute("pattern",`${reg}`)
	}
	if(elem.value === res ){
		console.log(false)
	}
	newValue = elem.value
	return newValue;
})

// Функция для отправки method Post Json
const postData = async (url, data) => { 
    const result = await fetch(url, {
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(data)
    });
    return await result.json();
};
//Собираем значения с инпут и отправляем на сервер
function userForm (f) {
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const formData = new FormData (f);// Собираем значения с input
		console.log(formData)
        const obj = {};
        
        formData.forEach((value, key) => {
			if(value[0] !== "+"){
				value = value.split("")
				value.splice(0,1);
				value =["+7",...value].join("")
			}
            obj[key] = value;
        });
		console.log(obj)
		
		postData("http://test.ru/phone", obj )
        .then(response => response.json())
		.then(result => console.log(result))
        .finally(() => {
            elem.classList.remove("valid")
			elem.value = "";
			elem.setAttribute("pattern",``)
        });
		
    });
}
userForm (orderForm);

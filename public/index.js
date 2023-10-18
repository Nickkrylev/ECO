const inputFile = document.querySelector('.input-file input[type=file]');
const displayFileName = inputFile.nextElementSibling;
const currentUrl = window.location.pathname;
console.log(currentUrl);
if (inputFile && displayFileName) {
  inputFile.addEventListener('change', function () {
    let file = this.files[0];
    //displayFileName.innerHTML = file ? file.name : '';

    const xhr = new XMLHttpRequest(); // создаем объект XMLHttpRequest
    const formData = new FormData(); // создаем объект FormData для передачи файла

    formData.append('file', file); // добавляем файл в объект FormData
    let upload = '/upload';
     // указываем метод и URL сервера, куда будет отправлен файл
     if(currentUrl === '/pollution.html') upload = '/uploadPollution';
     else if (currentUrl === '/polluter.html') upload = '/uploadPolluter';
    console.log(upload);
    xhr.open('POST', upload);
    xhr.send(formData); // отправляем запрос на сервер с помощью метода send()
    alert("Данi получені обновіть сторінку")
  });

}
// const fileInput = document.getElementById('fileInput'); // получаем элемент input для загрузки файла
// const file = fileInput.files[0]; // получаем выбранный файл



// Функция для создания строк в таблице
function CreateRowsInTable(nameTable, data) {

  let table = document.getElementById(nameTable);
  
  for (let i = 0; i < data.length; i++) {
    let tr = document.createElement("tr");
    let obj = Object.values(data[i]);
  
    for (let k = 0; k < obj.length; k++) {
      let td = document.createElement("td");
      //console.log(obj[k])
      td.textContent = "" + obj[k];
      tr.appendChild(td);
    }


    table.appendChild(tr);
  }
}

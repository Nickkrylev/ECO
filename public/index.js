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
    tr.setAttribute("name","tr");
    for (let k = 0; k < obj.length; k++) {
      let td = document.createElement("td");
      td.setAttribute("name","td");
      //console.log(obj[k])
      td.textContent = "" + obj[k];
      tr.appendChild(td);
    }


    table.appendChild(tr);
  }
}
//SELECT Name_factory FROM factory;
function CreateRowsSelection(data) {
  let selection = document.getElementsByName("factoryName");
  console.log(data.length);

  for (let i = 0; i < data.length; i++) {
    let option = document.createElement("option");
    console.log(i);
    console.log(data[i].Name_factory);
    option.textContent = "" + data[i].Name_factory;
    option.setAttribute("value","" + data[i].Name_factory);
    // Добавляем созданный элемент <option> к каждому элементу коллекции
    for (let j = 0; j < selection.length; j++) {
      selection[j].appendChild(option);
    }
  }
}
function changeTable(){
  var  filter, table, tr, td;




 
  var selectElement = document.getElementById("factoryName");
  var selectedOption = selectElement.options[selectElement.selectedIndex];
  var selectedText = selectedOption.text;
  

  table = document.getElementById("table3");
  tr = table.getElementsByTagName("tr");
 
  // Loop through all table rows, and hide those who don't match the search query
  for (let i = 0; i < tr.length; i++) {
   
    td = tr[i].getElementsByTagName("td")[0];
    if (td && selectedText != 'Підприємства') {
      if (td.textContent === selectedText) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }else{
      tr[i].style.display = "";
    }
  }
}
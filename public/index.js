const inputFile = document.querySelector('.input-file input[type=file]');
const displayFileName = inputFile.nextElementSibling;
const currentUrl = window.location.pathname;

const concerCOnst = {
  

  Tout:8,
  Tin: 16,
  Vout:1.4,
  Vin: 0.63,
  EF:350,
  ED:30,
  BW:70,
  AT:70,
  population:1000000
}

console.log(concerCOnst);
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
function CreateRowsInTableRisk(nameTable, data) {
  console.log('ffj')
  let table = document.getElementById(nameTable);
  
  for (let i = 0; i < data.length; i++) {
    let tr = document.createElement("tr");
    let obj = Object.values(data[i]);
    tr.setAttribute("name","tr");
    for (let k = 0; k < obj.length; k++) {
      let td = document.createElement("td");
      td.setAttribute("name","td");
      
      if(k == obj.length-2 && obj[k] != 0){
        let concent = obj[k-1] *Math.pow(10, -6);
        //td.textContent = "" + obj[k];
        console.log(obj[k]);
        
        let math = ((((concent*concerCOnst.Tout*concerCOnst.Vout)+(concent*1*concerCOnst.Tin*concerCOnst.Vin))*concerCOnst.EF*concerCOnst.ED)/(concerCOnst.BW*concerCOnst.AT*365))*obj[k]*concerCOnst.population
       math *= Math.pow(10, -6);
        td.textContent = ""+  Math.round(math * 1000000000) / 1000000000;
       console.log (checkColor(math));
       tr.style.backgroundColor = checkColor(math);
      }else if(k == obj.length-1 && obj[k] != 0 && obj[k] != 1){
         //td.textContent = "" + obj[k];
        let concentration = obj[k-2] ;
       // console.log(concentration);
       let math = (obj[k])/concentration;
       math *= Math.pow(10, -6);
       td.textContent = ""+  Math.round(math * 10000000) / 10000000;
        tr.style.backgroundColor = checkColor(math);
      }else{


      td.textContent = "" + obj[k];}
      tr.appendChild(td);
     
    }


    table.appendChild(tr);
  }
}
function checkColor(data) {
  console.log('start ' + data + "    " + 1 * Math.pow(10, -3));
  let color = "";

  // Using if statements instead of switch for comparisons
  if (data > 1 * Math.pow(10, -3)) {
    color = "red";
    console.log(color);
  } else if (data <= 1 * Math.pow(10, -3) && data >= 1 * Math.pow(10, -4)) {
    color = "orange";
    console.log(color);
  } else if (data >= 1 * Math.pow(10, -6) && data < 1 * Math.pow(10, -4)) {
    color = "yellow";
    console.log(color);
  } else if (data < 1 * Math.pow(10, -6)) {
    color = "green";
    console.log(color);
  }

  return color;
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
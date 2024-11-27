

var bookMarkNameInput = document.getElementById("bookMark");
var webSiteUrlInput = document.getElementById("webSite");

var productList;
if (localStorage.getItem("product") === null) {
    productList = [];
} else {
    productList = JSON.parse(localStorage.getItem("product"));
    display();
}



function addProduct() {
    if(bookMarkNameInput.classList.contains("is-valid")&&webSiteUrlInput.classList.contains("is-valid")){
        var url = webSiteUrlInput.value.trim();
        if (!/^https?:\/\//i.test(url)) {
            url = "https://" + url; 
        }
    
        var product = {
            name: bookMarkNameInput.value,
            webSite: url,
        };
    
        productList.push(product);
        localStorage.setItem("product", JSON.stringify(productList));
    
        display();
        clear();
    }
   else{
    alert("Not Valid")
   }
}
function display() {
    var cartona = "";
    for (var i = 0; i < productList.length; i++) {
        cartona += `
            <tr>
                <td>${i + 1}</td>
                <td>${productList[i].name}</td>
                 <td><a href="${productList[i].webSite}" target="_blank" class="btn btn-success"> <i class="fa-solid fa-eye"></i> Visit</a></td>
                <td><button class="btn btn-danger" onclick="deleteProduct(${i})"> <i class="fa-solid fa-trash-can"></i> Delete</button></td>
            </tr>
        `;
    }
    document.getElementById("tableContent").innerHTML = cartona;
}

function deleteProduct(deleteIndex) {
    productList.splice(deleteIndex, 1);
    localStorage.setItem("product", JSON.stringify(productList));
    display();
}

function clear() {
    bookMarkNameInput.value = "";
    webSiteUrlInput.value = "";
}

function validInputs (element){
    var regex={
        bookMark:/^\w{3,}$/ ,
        webSite:/^(https:\/\/)?(www.)?\w{2,}.{0,1}\w{2,}$/
    }
    if(regex[element.id].test(element.value)==true){
        element.classList.add("is-valid");
        element.classList.remove("is-invalid");


    }else{
    
        element.classList.add("is-invalid");
        element.classList.remove("is-valid");
    }
}

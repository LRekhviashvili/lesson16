//xml http request

let currentPage = 1; 
let totalPages;

function getUsers(page) {
let request = new XMLHttpRequest();
 request.addEventListener ("load", render);
 request.addEventListener ("error", serverError);
 console.log (this.responseText);

 request.open("GET", 'https://reqres.in/api/users?page=' + page);
 request.send();

function render (){

    let fragment = document.createDocumentFragment();

    let response = this.responseText;
    let responseData = JSON.parse(response);

        responseData.data.forEach(element => {
        let li = document.createElement ("li");
        li.classList.add('li-item');

        let emailUser = document.createElement('p');
        emailUser.textContent = element.email;

        let imgUser = document.createElement('img');
        imgUser.src = element.avatar;
        imgUser.classList.add('li-image');

        li.appendChild(imgUser);
        li.appendChild(emailUser);


        fragment.appendChild(li);
    });

    document.getElementById('ul-list').innerHTML = ' ';
    document.getElementById('ul-list').appendChild (fragment);

    totalPages = responseData.total_pages; 
}

function serverError (){
    let newP = document.createElement ("p");
    newP.textContent = "Server Error"; 
    document.getElementById ("api-user-email").appendChild (newP);
}
}

document.getElementById ("Nextpage").addEventListener ("click", function(){
    if(currentPage == totalPages){
        return; 
    }
    currentPage+=1; 
    getUsers(currentPage);

})

document.getElementById ("Previouspage").addEventListener ("click", function(){
    if(currentPage==1){
        return;
    }
    currentPage-=1; 
    getUsers(currentPage);

})
getUsers(currentPage);
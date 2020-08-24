console.log("Welcome to notes app. This is app.js");

// Typing Start Style From  Here .....
const text = ['Welcome To Magic Notes......', 'Welcome To Future Notes......', 'Pin Your Future Notes Here......']
let count = 0;
let index = 0;
let currentText = '';
let letter = '';


(function type() {
    if (count == text.length) {
        count = 0;
    }
    currentText = text[count];
    letter = currentText.slice(0, ++index);
    document.querySelector('.typing').textContent = letter
    if (letter.length == currentText.length) {
        count++;
        index = 0;
    }
    setTimeout(type, 200);
}());
// Typing Style End .....

// if user add a note , add it to the localstorage
showNotes();
let addBtn = document.getElementById('addBtn');
addBtn.addEventListener('click', function (e) {
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let myobj ={
        title:addTitle.value,
        text:addTxt.value
    }
    notesobj.push(myobj);
    localStorage.setItem("notes", JSON.stringify(notesobj))
    addTxt.value = '';
    addTitle.value='';
    // console.log(notesobj)
    showNotes();
})
//function to show elements from localstorage 
function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let html = '';
    notesobj.forEach(function(element, index) {
        html +=`
        <div class="noteCard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${index + 1} → ${ element.title}</h5>
                <p class="card-text">  ${element.text}</p>
                <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button> 
            </div>
            </div> `;
});

let notesElm = document.getElementById('notes');
if (notesobj.length != 0) {
    notesElm.innerHTML = html;
}
else{
    notesElm.innerHTML=`<div class="alert alert-primary" role="alert">
    Nothing to show ! Use "Add a Note" section above to add notes.....
  </div>`
}
}
//function to delete a note 
function deleteNote(index){
    // console.log('I am deleting');
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index,1);
    localStorage.setItem("notes",JSON.stringify(notesobj));
    showNotes();
}

let search =document.getElementById('searchTxt');
search.addEventListener("input",function(){
    let inputVal=search.value.toLowerCase();
    // console.log('Input event fired',inputVal);
    let noteCards =document.getElementsByClassName('noteCard');
    Array.from(noteCards).forEach(function(element){
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        cardTxt=cardTxt.toLowerCase()
        if(cardTxt.includes(inputVal)){
            element.style.display='block';
        }
        else{
            element.style.display='none'; 
        }
    })
})


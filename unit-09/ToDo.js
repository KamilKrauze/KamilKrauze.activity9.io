window.onload = updateToDoList();
window.onload = updateCompletedToDoList();

function createNode(element) {
  return document.createElement(element); // Create the type of element you pass in
}

function append(parent, el) {
  return parent.appendChild(el); // Append the second parameter(element) to the first one
}

var addTodo = document.querySelector(".form-control");
addTodo.addEventListener("input",update);

var nextItem;
function update(e)
{
  nextItem = e.target.value;
  console.log(nextItem);
}

function addToCompleted(task)
{
  CompletedArray_new = JSON.parse(localStorage.getItem("completedItems"));
  CompletedArray_new.push(task);
  localStorage.setItem("completedItems",JSON.stringify(CompletedArray_new));
  console.log("We pushed hard!");
  updateCompletedToDoList();
}

addItemsBtn = document.getElementById('saveItem_btn');
addItemsBtn.addEventListener('mousedown',addItem);
function addItem()
{
  if(nextItem!="")
  {
    storedItems = JSON.parse(localStorage.getItem("todoItems"));
    if(nextItem!=null)
    {
      storedItems.push(nextItem);
      localStorage.setItem("todoItems",JSON.stringify(storedItems));
      updateToDoList();
      console.log(nextItem);
    }
    else
    {
      console.log("I cannot let you save nothing!");
    }
}

deleteCompletedBtn = document.getElementById('deleteCompleted_btn');
deleteCompletedBtn.addEventListener('mousedown',deleteCompleted);
function deleteCompleted()
{
  console.log("We delete.");

  var clearCompleted = createNode('div');
  clearCompleted.setAttribute("class","col");
  document.getElementById('completedContainer').innerHTML=clearCompleted.innerHTML;

  localStorage.removeItem('completedItems');
  updateCompletedToDoList();
}


document.getElementById('newToDoItem').value = "";
console.log(nextItem);
}

function everythingIsCompleted()
{
  var deleta_allComplete = createNode('btn');
  var completed_col = document.getElementById('completedContainer');
  deleta_allComplete.innerHTML = "<button type='button' class='btn btn-primary btn-lg this btn-block bg-light text-dark text-left'>All things completed!</button>";
  append(completed_col,deleta_allComplete);
}

function nothingToDo()
{
  var child = createNode('btn');
  var appendColTo = document.getElementById('toDoContainer');
  child.innerHTML = "<button type='button' class='btn btn-primary btn-lg this btn-block bg-light text-dark text-left'>Nothing to do!</button>";
  append(appendColTo,child);
}


function updateToDoList()
{
  document.getElementById('newToDoItem').value = "";
  if(localStorage.getItem("todoItems")===null)
  {
    blankArray = [];
    console.log("We did it!");
    localStorage.setItem("todoItems",JSON.stringify(blankArray));
    console.log(localStorage.getItem("todoItems"));
    nothingToDo();
  }
  else if(localStorage.getItem("todoItems")==="[]")
  {
    console.log("We did it!");
    nothingToDo();
  }
  else
  {
    storedToDos = JSON.parse(localStorage.getItem("todoItems"));
    if(localStorage.getItem("todoItems")===null)
    {
      console.log("We did it! Really.");
    }
    container = document.getElementById('toDoContainer');
    newContainer = createNode('div');
    newContainer.setAttribute("class","col");

    var index;

    for (index = 0; index < storedToDos.length; index++)
    {
      item = createNode('btn');
      item.innerHTML = "<button type='button' onClick='complete("+ index +")' class='btn btn-primary btn-lg btn-block bg-secondary text-dark text-left rounded'>" + storedToDos[index] + "</button>";
      append(newContainer,item);

      console.log("We did it! Really.");
    }
    container.innerHTML = newContainer.innerHTML;
  }
  console.log("We did it!");
}

function complete(index)
{
  if(index===0)
  {
    var clear = createNode('div');
    clear.setAttribute("class","col");
    document.getElementById('toDoContainer').innerHTML=clear.innerHTML;
  }
  itemToMove = JSON.parse(localStorage.getItem("todoItems"));
  addToCompleted(itemToMove[index]);
  itemToMove.splice(index,1);
  localStorage.setItem("todoItems",JSON.stringify(itemToMove));

  updateToDoList();
}

function updateCompletedToDoList(){

  if(localStorage.getItem("completedItems")===null)
  {
    blankArray = [];
    console.log("We completed it!");
    localStorage.setItem("completedItems",JSON.stringify(blankArray));
    everythingIsCompleted();
  }
  else if(localStorage.getItem("completedItems")==="[]")
  {
    console.log("We completed it!");
    everythingIsCompleted();
  }
  else
  {
    storedCompletedToDos = JSON.parse(localStorage.getItem("completedItems"));

    containerCompleted = document.getElementById('completedContainer');
    containerCompleted_to_be = createNode('div');
    containerCompleted_to_be.setAttribute("class","col");

    var index;

    for (index = 0; index < storedCompletedToDos.length; index++)
    {
      completed_item = createNode('btn');
      completed_item.innerHTML = "<button type='button' class='btn btn-primary btn-lg btn-block bg-success text-dark text-left rounded'>" + storedCompletedToDos[index] + "</button>";
      append(containerCompleted_to_be,completed_item);

      console.log("We completed it! Really.");
    }
    containerCompleted.innerHTML = containerCompleted_to_be.innerHTML;
  }
}

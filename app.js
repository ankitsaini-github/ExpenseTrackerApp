var form=document.getElementById('form');
var expenseList=document.getElementById('expenses');

form.addEventListener('submit',addExpense);
expenseList.addEventListener('click',removeExpense);
expenseList.addEventListener('click',editExpense);

function addExpense(e){
    e.preventDefault();
    var newamount=document.getElementById('amount').value;
    var newdescription=document.getElementById('description').value;
    var newcatagory=document.getElementById('catagory').value;

    var newExpense={
        amount:newamount,
        description:newdescription,
        catagory:newcatagory
    };
    var newExpense_serial=JSON.stringify(newExpense);

    var li=document.createElement('li');
    li.className='list-group-item';
    li.appendChild(document.createTextNode('Rs. '));
    li.appendChild(document.createTextNode(newamount));
    li.appendChild(document.createElement('br'));
    li.appendChild(document.createTextNode(newdescription));
    li.appendChild(document.createElement('br'));
    li.appendChild(document.createTextNode(newcatagory));
    li.appendChild(document.createElement('br'));

    var delbtn=document.createElement('button');
    delbtn.className='btn btn-danger btn-sm float-right delete';
    delbtn.appendChild(document.createTextNode('X'));
    li.appendChild(delbtn);

    var editbtn=document.createElement('button');
    editbtn.className='btn btn-sm float-right editBtn';
    editbtn.appendChild(document.createTextNode('EDIT'));
    li.appendChild(editbtn);

    expenseList.appendChild(li);
    localStorage.setItem(newdescription,newExpense_serial);

}

function removeExpense(e){
    if(e.target.classList.contains('delete')){
        if(confirm('WANT TO DELETE THIS EXPENSE ?')){
            var li=e.target.parentElement;
            var desc=li.childNodes[3].textContent;
            localStorage.removeItem(desc);
            expenseList.removeChild(li);
        }
    }
}

function editExpense(e){
    if(e.target.classList.contains('editBtn')){
        if(confirm('WANT TO EDIT YOUR EXPENSE ?')){
            var li=e.target.parentElement;
            var desc=li.childNodes[3].textContent;
            var expense=JSON.parse(localStorage.getItem(desc));
            document.getElementById('amount').value=li.childNodes[1].textContent;
            document.getElementById('description').value=li.childNodes[3].textContent;
            document.getElementById('catagory').value=li.childNodes[5].textContent;
            localStorage.removeItem(desc);
            expenseList.removeChild(li);
        }
    }
}

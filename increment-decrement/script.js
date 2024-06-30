let addBtn = document.querySelector('.addBtn');
let subtractBtn = document.querySelector('.lessBtn');
let finalVal = document.querySelector('.finalVal');
finalVal = parseInt(finalVal.textContent);
addBtn.addEventListener('click',addOne);
subtractBtn.addEventListener('click',lessOne);

function addOne() {
    finalVal++;
    putIt(finalVal)
    console.log("Adding 1 : ",finalVal)
}
function lessOne() {
    finalVal--;
    putIt(finalVal)
    console.log("lessing 1 : ",finalVal)
}

function putIt(value) {
    document.querySelector('.finalVal').textContent = value;
}
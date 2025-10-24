export default function(){
    var input, filter, dropdown, option, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    dropdown = document.getElementById("myDropdown");
    options = dropdown.getElementsByTagName("navlink");
    for(i = 0 ; i <options; i++){
        options[i].style.display
        options[i].innerText.toUpperCase().includes(filter) ?
        "block":"none";
    }

}
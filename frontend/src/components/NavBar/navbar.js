export default function(){
    let input, filter, dropdown, option, i;
    input = document.getElementById("searchInput");
    filter = input.value.toUpperCase();
    dropdown = document.getElementById("myDropdown");
    option = dropdown.getElementsByTagName("navlink");
    for(i = 0 ; i <option; i++){
        option[i].style.display
        option[i].innerText.toUpperCase().includes(filter) ?
        "block":"none";
    }

}
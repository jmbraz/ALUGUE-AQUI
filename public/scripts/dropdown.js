const dropdownLink = document.getElementById('dropdown-link');
const dropdownContent = document.querySelector('.dropdown-content');
dropdownLink.addEventListener('click', function (event) {
    event.preventDefault();
    if (dropdownContent.style.display === 'flex') {
        dropdownContent.style.display = 'none';
    } else {
        dropdownContent.style.display = 'flex';
    }
});
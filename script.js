document.addEventListener('DOMContentLoaded', function() {
    loadSavedLinks();
});

function saveLink() {
    var linkInput = document.getElementById('linkInput');
    var link = linkInput.value.trim();

    if (link !== '') {
        var linkList = document.getElementById('linkList');
        var listItem = document.createElement('li');
        var linkElement = document.createElement('a');
        var copyIcon = document.createElement('i'); // copy icon
        var deleteIcon = document.createElement('i'); // delete icon

        linkElement.href = link;
        linkElement.textContent = link;

        // Added classes to the delete icon for styling
        deleteIcon.className = 'fas fa-trash-alt delete-icon';
        deleteIcon.style.marginLeft = '20px'; 
        deleteIcon.style.color = 'red';
        deleteIcon.style.cursor = 'pointer';
        deleteIcon.title = 'Delete';
        
        deleteIcon.addEventListener('click', function() {
            deleteLink(link);
            listItem.remove();
        });

        // Added classes to the copy icon for styling
        copyIcon.className = 'far fa-copy copy-icon'; 
        copyIcon.style.marginLeft = '40px'; 
        copyIcon.style.color = 'black';
        copyIcon.style.cursor = 'pointer';
        copyIcon.title = 'Copy';

        copyIcon.addEventListener('click', function() {
            copyLink(link);
        });

        listItem.appendChild(linkElement);
        listItem.appendChild(copyIcon);
        listItem.appendChild(deleteIcon);
        linkList.appendChild(listItem);

        saveLinkToStorage(link);

        linkInput.value = '';
    } else {
        alert('Please enter a valid link.');
    }
}

function saveLinkToStorage(link) {
    var savedLinks = JSON.parse(localStorage.getItem('savedLinks')) || [];
    savedLinks.push(link);
    localStorage.setItem('savedLinks', JSON.stringify(savedLinks));
}

function loadSavedLinks() {
    var savedLinks = JSON.parse(localStorage.getItem('savedLinks')) || [];
    var linkList = document.getElementById('linkList');

    savedLinks.forEach(function(link) {
        var listItem = document.createElement('li');
        var linkElement = document.createElement('a');
        var copyIcon = document.createElement('i'); // copy icon
        var deleteIcon = document.createElement('i'); // delete icon

        linkElement.href = link;
        linkElement.textContent = link;

        // Added classes to the delete icon for styling
        deleteIcon.className = 'fas fa-trash-alt delete-icon'; 
        deleteIcon.style.marginLeft = '20px'; 
        deleteIcon.style.color = 'red';
        deleteIcon.style.cursor = 'pointer';
        deleteIcon.title = 'Delete';

        deleteIcon.addEventListener('click', function() {
            deleteLink(link);
            listItem.remove();
        });

        // Added classes to the copy icon for styling
        copyIcon.className = 'far fa-copy copy-icon'; 
        copyIcon.style.marginLeft = '40px'; 
        copyIcon.style.color = 'black';
        copyIcon.style.cursor = 'pointer';
        copyIcon.title = 'Copy';

        copyIcon.addEventListener('click', function() {
            copyLink(link);
        });

        listItem.appendChild(linkElement);
        listItem.appendChild(copyIcon);
        listItem.appendChild(deleteIcon);
        linkList.appendChild(listItem);
    });
}

function deleteLink(link) {
    var savedLinks = JSON.parse(localStorage.getItem('savedLinks')) || [];
    var index = savedLinks.indexOf(link);
    if (index !== -1) {
        savedLinks.splice(index, 1);
        localStorage.setItem('savedLinks', JSON.stringify(savedLinks));
    alert('Do You Want to Delete the saved link?');
    }
}

function copyLink(link) {
    // Creating a temporary input element
    var tempInput = document.createElement('input');
    tempInput.value = link;
    document.body.appendChild(tempInput);

    // Select the input field and copy its value to clipboard
    tempInput.select();
    document.execCommand('copy');

    // Remove the temporary input
    document.body.removeChild(tempInput);

    alert('Link copied to clipboard.');
}

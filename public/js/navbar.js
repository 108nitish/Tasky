document.addEventListener('DOMContentLoaded', function() { 
    const currentPath = window.location.pathname; 
    const navLinks = document.querySelectorAll('.links');  
    navLinks.forEach(link => { 
        if (link.getAttribute('href') === currentPath) { 
            navLinks.forEach(nav => nav.classList.remove('active')); 
            link.parentElement.classList.add('active');
        }
    });
});

fetch('/getUserInfo')
    .then(response => response.json())
    .then(data => {
        if (data.ID && data.name) { 
            document.getElementById('username').textContent = `${data.name}`;
        } else {
            document.getElementById('username').textContent = 'Guest';
        }
    })
    .catch(err => {
        console.log('Error:', err);
        document.getElementById('username').textContent = 'Guest';
    });

    
    document.addEventListener('DOMContentLoaded', () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const sidebar = document.querySelector('.sidebar');
    
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active2');
        });
    }); 

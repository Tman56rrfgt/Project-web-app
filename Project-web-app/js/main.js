
window.addEventListener('scroll', function() {
    let sections = document.querySelectorAll('section');
    let navLinks = document.querySelectorAll('nav ul li a');
    
    sections.forEach(section => {
        let sectionTop = section.offsetTop;
        let sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            let currentId = section.getAttribute('id');
            navLinks.forEach(link => {
                link.parentElement.classList.remove('active');
                if (link.getAttribute('href').includes(currentId)) {
                    link.parentElement.classList.add('active');
                }
            });
        }
    });
});


// Example to handle simple redirect upon login
document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();
    // Assuming the user is authenticated
    window.location.href = 'dashboard.html'; // Redirect to dashboard page
});



const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
            label: 'Sample Data',
            data: [12, 19, 3, 5, 2, 3, 7],
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

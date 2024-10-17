
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

//script for analysis

document.getElementById('upload-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const fileInput = document.getElementById('fileInput').files[0];

    if (fileInput) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const csvData = e.target.result;
            analyzeData(csvData);
        };
        reader.readAsText(fileInput);
    }
});

function analyzeData(csvData) {
    const rows = csvData.split('\n').map(row => row.split(','));
    const numRows = rows.length;
    const numColumns = rows[0].length;
    
    // Calculate column-wise averages (as an example)
    const columnSums = Array(numColumns).fill(0);
    for (let i = 1; i < numRows; i++) {
        for (let j = 0; j < numColumns; j++) {
            columnSums[j] += parseFloat(rows[i][j]) || 0;
        }
    }
    const columnAverages = columnSums.map(sum => sum / numRows);

    // Display results
    const resultsDiv = document.getElementById('analysis-results');
    resultsDiv.innerHTML = `
        <p>Number of Rows: ${numRows}</p>
        <p>Number of Columns: ${numColumns}</p>
        <p>Column Averages: ${columnAverages.join(', ')}</p>
    `;
}
window.addEventListener('beforeunload', function() {
    // Make an AJAX call to a PHP script to destroy the session
    fetch('/Project-web-app/backend/logout.php', { method: 'GET' });
   });
   
   // Global variables
let currentData = [];  // Holds parsed data
let headers = [];      // Holds header names for columns
let currentCharts = []; // Array to track generated chart instances
let overviewCharts = [];
let selectedHeader = null;

   
   function showLoading() {
       document.getElementById('overviewPrompt').textContent = "Loading, please wait...";
   }
   
   function hideLoading() {
       document.getElementById('overviewPrompt').textContent = "Your overview data will be displayed here once your data has been uploaded.";
   }
   
   // Handle initial data upload
   document.getElementById('initial-upload-form').addEventListener('submit', function(event) {
       event.preventDefault();
       showLoading();
       const fileInput = document.getElementById('overviewFileInput').files[0];
       const userId = document.getElementById('userId').value;
   
       if (!userId) {
           console.error("User ID is missing");
           alert("User ID is missing in the form.");
           return;
       }
   
       if (fileInput) {
           const formData = new FormData();
           formData.append('file', fileInput);
           formData.append('id', userId);
   
           fetch('/Project-web-app/backend/uploadFile.php', {
               method: 'POST',
               body: formData
           })
           .then(response => response.json())
           .then(data => {
               hideLoading();
               if (data.success) {
                   initializeOverviewSections(); // Fetch data from DB
               } else {
                   alert(data.message);
               }
           })
           .catch(error => {
               hideLoading();
               console.error('Error:', error);
               alert('An error occurred. Please check the console for details.');
           });
       }
   });
   
   // Load previously uploaded files when "Load Previous Data" is clicked
   document.getElementById('loadFileButton').addEventListener('click', function() {
       fetch('/Project-web-app/backend/listFiles.php')
           .then(response => response.json())
           .then(files => {
               const dropdown = document.getElementById('fileListDropdown');
               dropdown.innerHTML = ''; // Clear previous options
               dropdown.style.display = 'block';
   
               files.forEach(file => {
                   const option = document.createElement('option');
                   option.value = file.id;
                   option.textContent = file.filename;
                   dropdown.appendChild(option);
               });
   
               // Add event listener to load selected file data
               dropdown.addEventListener('change', function() {
                   const fileId = dropdown.value;
                   loadFileData(fileId);
               });
           })
           .catch(error => console.error('Error loading files:', error));
   });
   
   // Load selected file data
   // Load selected file data
function loadFileData(fileId) {
    showLoading();  // Show loading indicator

    // Fetch data for the selected file using the file ID
    fetch(`/Project-web-app/backend/fetchData.php?file_id=${fileId}`)
        .then(response => response.json())
        .then(response => {
            hideLoading();  // Hide loading indicator

            // Destructure response to get headers and data
            const { headers, data } = response;
            if (Array.isArray(headers) && headers.length && Array.isArray(data) && data.length) {
                // Update the global data variable
                currentData = data;

                // Update the UI elements
                document.getElementById('overviewPrompt').style.display = 'none';
                document.getElementById('overviewData').style.display = 'block';
   console.log("Retrieved Data:", currentData);
                updateOverviewAverages(data, headers);
                if (headers.length > 1) createOverviewChart('overviewVisualizationChart', data, 'bar', headers[1]);
                if (headers.length > 2) createOverviewChart('overviewAnalysisChart', data, 'line', headers[2]);
                populateAnalysisHeaderDropdown(headers);

                // Render initial charts
                renderCharts('bar');

                // Display delete button and set delete functionality for the file
                const deleteButton = document.getElementById('deleteFileButton');
                deleteButton.style.display = 'inline-block';
                deleteButton.onclick = () => deleteFile(fileId);
            } else {
                console.error("Invalid data format from server.");
            }
        })
        .catch(error => {
            hideLoading();  // Hide loading indicator on error
            console.error('Error loading file data:', error);
        });
}

   
   function deleteFile(fileId) {
       if (!confirm("Are you sure you want to delete this file?")) return;
   
       fetch(`/Project-web-app/backend/deleteFile.php?file_id=${fileId}`, { method: 'DELETE' })
           .then(response => response.json())
           .then(data => {
               alert(data.message);
               document.getElementById('deleteFileButton').style.display = 'none';
               loadFileList(); // Refresh file list after deletion
           })
           .catch(error => console.error('Error deleting file:', error));
   }
   
   
   
   // Initialize sections after data upload
   function initializeOverviewSections() {
    fetch('/Project-web-app/backend/fetchData.php')
        .then(response => response.json())
        .then(response => {
            const { headers: fetchedHeaders, data } = response;

            if (Array.isArray(fetchedHeaders) && fetchedHeaders.length && Array.isArray(data) && data.length) {
                currentData = data;
                headers = fetchedHeaders;

                document.getElementById('overviewPrompt').style.display = 'none';
                document.getElementById('overviewData').style.display = 'block';

                console.log("Retrieved Data:", currentData);
                updateOverviewAverages(data, headers);
                if (headers.length > 1) createOverviewChart('overviewVisualizationChart', data, 'bar', headers[1]);
                if (headers.length > 2) createOverviewChart('overviewAnalysisChart', data, 'line', headers[2]);
                populateAnalysisHeaderDropdown(headers);

                // Render initial charts
                renderCharts('bar');
            } else {
                console.error("Invalid data format from server.");
            }
        })
        .catch(error => console.error('Error fetching data:', error));
}

   
   
function populateAnalysisHeaderDropdown(headers) {
    const dropdown = document.getElementById('headerDropdown');
    dropdown.innerHTML = ''; // Clear existing options
    console.log("Headers for dropdown:", headers); // Debugging

    headers.forEach(header => {
        const option = document.createElement('option');
        option.value = header;
        option.textContent = header;
        dropdown.appendChild(option);
    });

    // Set initial selection
    selectedHeader = headers[1] || headers[0]; 
    dropdown.value = selectedHeader;

    dropdown.addEventListener('change', function() {
        selectedHeader = this.value;
        updateAnalysisCharts();
    });

    // Initial chart update with selected header
    updateAnalysisCharts();
}

   
          // Function to update analysis charts and statistics
function updateAnalysisCharts() {
    if (!selectedHeader || !currentData) return;

    // Map selected column data to numeric values and filter out NaNs

    const values = currentData
        .map(row => parseFloat(row[selectedHeader]))
        .filter(value => !isNaN(value));

    console.log("Selected Header:", selectedHeader);
    console.log("Values for analysis:", values);

    // Display statistics and create charts
    displayStatistics(values);
    createBoxPlot(values);
    createScatterPlot(values);
    createTrendLine(values);
}

        
   
   function initializeAnalysisSection(parsedData) {
       currentData = parsedData;
   
       // Populate the dropdown with column headers
       const headers = currentData[0];
       populateAnalysisHeaderDropdown(headers);
   }
   
   // Function to update the Overview Bar with averages
   function updateOverviewAverages(data, headers) {
       console.log("Data received in updateOverviewAverages:", data);
       console.log("Headers received in updateOverviewAverages:", headers);
       if (!data || data.length === 0 || !headers || headers.length === 0) {
           console.error("Invalid data or headers in updateOverviewAverages");
           return;
       }
   
       // Limit headers to four, excluding the first column if it's a label
       const maxHeaders = Math.min(headers.length - 1, 4);
       const selectedHeaders = headers.slice(1, maxHeaders + 1);
   
       const summaryGrid = document.querySelector('.summary-grid');
       summaryGrid.innerHTML = '';
   
       // Loop through the selected headers and add "Average" to each
       selectedHeaders.forEach((header, index) => {
           const values = data.slice(1).map(row => parseFloat(row[header])).filter(value => !isNaN(value));
           const average = calculateAverage(values).toFixed(2);
   
           // Create a new summary item
           const summaryItem = document.createElement('div');
           summaryItem.classList.add('summary-item');
           summaryItem.innerHTML = `
               <h3>Average ${header}</h3>
               <p>${average}</p>
           `;
   
           summaryGrid.appendChild(summaryItem);
       });
   }
   
   // Function to calculate average
   function calculateAverage(values) {
    // Filter out any non-numeric values to avoid calculation errors
    const numericValues = values.filter(value => typeof value === 'number' && !isNaN(value));
    
    if (numericValues.length === 0) return 0; // Return 0 if no valid values
    
    // Calculate the total of numeric values
    const total = numericValues.reduce((sum, value) => sum + value, 0);
    
    // Return the average
    return total / numericValues.length;
}

   
   function clearOverviewChart(canvasId) {
    const canvas = document.getElementById(canvasId);
    if (canvas.chartInstance) {
        canvas.chartInstance.destroy();
    }
}
   
   // Create charts for overview grids
   function createOverviewChart(canvasId, data, chartType, label) {
    // Validate if data and headers are available
    if (!data || !headers || headers.length === 0) {
        console.error("Data or headers are missing for creating the chart.");
        return;
    }

    clearOverviewChart(canvasId);  // Clear any existing chart first

    // Extract labels and values based on the headers
    const labels = data.map(row => row[headers[0]]); // Use the first header for labels (e.g., 'Month')
    const values = data.map(row => parseFloat(row[label])).filter(value => !isNaN(value)); // Dynamic data extraction

    const ctx = document.getElementById(canvasId).getContext('2d');
    const gradient = ctx.createLinearGradient(0, 0, 0, 400);
    gradient.addColorStop(0, 'rgba(54, 162, 235, 0.6)');
    gradient.addColorStop(1, 'rgba(54, 162, 235, 0.2)');

    const chartInstance=new Chart(ctx, {
        type: chartType,
        data: {
            labels: labels,
            datasets: [{
                label: label,
                data: values,
                backgroundColor: gradient,
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                hoverBackgroundColor: 'rgba(54, 162, 235, 0.8)',
                hoverBorderColor: 'rgba(54, 162, 235, 1)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true,
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: { font: { size: 14 }, color: '#fff' }
                },
                y: {
                    beginAtZero: true,
                    ticks: { font: { size: 14 }, color: '#fff' }
                }
            },
            plugins: {
                legend: { labels: { font: { size: 16 }, color: '#fff' } },
                tooltip: { backgroundColor: 'rgba(0, 0, 0, 0.7)', titleFont: { size: 14 }, bodyFont: { size: 12 } }
            },
            animation: { duration: 1000, easing: 'easeInOutQuart' }
        }
    });
    document.getElementById(canvasId).chartInstance = chartInstance;
}

   
   
   
   
   // Change chart type dynamically
   document.getElementById('chartType').addEventListener('change', function() {
       if (currentData) {
           const newChartType = this.value;
           clearExistingCharts();
           renderCharts(newChartType);
       }
   });
   
   // Render all charts in the visualization section
   function renderCharts(chartType) {
    clearExistingCharts();

    if (!currentData || !headers || headers.length === 0) {
        console.error("No data or headers available to render charts.");
        return;
    }

    const labels = currentData.map(row => row[headers[0]]);
    const chartAttributes = headers.slice(1);
    const colors = [
        'rgba(255, 99, 132, 0.7)', 'rgba(54, 162, 235, 0.7)',
        'rgba(255, 206, 86, 0.7)', 'rgba(75, 192, 192, 0.7)',
        'rgba(153, 102, 255, 0.7)', 'rgba(255, 159, 64, 0.7)'
    ];

    chartAttributes.forEach((attribute, index) => {
        const values = currentData.map(row => parseFloat(row[attribute])).filter(value => !isNaN(value));

        const chartContainer = document.createElement('div');
        chartContainer.classList.add('chart-item');
        const canvas = document.createElement('canvas');
        chartContainer.appendChild(canvas);
        document.getElementById('charts-container').appendChild(chartContainer);

        const ctx = canvas.getContext('2d');
        const chartInstance = new Chart(ctx, {
            type: chartType,
            data: {
                labels: labels,
                datasets: [{
                    label: attribute,
                    data: values,
                    backgroundColor: colors.slice(0, values.length),
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: { beginAtZero: true }
                },
                plugins: {
                    legend: { labels: { color: '#ffffff' } }
                }
            }
        });

        currentCharts.push(chartInstance);
    });
}

   
   
   // Clear existing charts
   function clearExistingCharts(includeOverview=false) {
       currentCharts.forEach(chart => chart.destroy());
       currentCharts = [];
       if(includeOverview){
           overviewCharts.forEach(chart=>chart.destroy());
           overviewCharts=[];
       }
       document.getElementById('charts-container').innerHTML = '';
   }
   
   // Download all charts
   document.getElementById('downloadChart').addEventListener('click', function() {
       document.querySelectorAll('.chart-item canvas').forEach((canvas, index) => {
           const link = document.createElement('a');
           link.href = canvas.toDataURL('image/png');
           link.download = `chart_${index + 1}.png`;
           link.click();
       });
   });
   
   
  // Calculate Mean
function calculateMean(values) {
    const sum = values.reduce((acc, value) => acc + value, 0);
    return (sum / values.length).toFixed(2);
}

// Calculate Median
function calculateMedian(values) {
    const sortedValues = values.slice().sort((a, b) => a - b);
    const mid = Math.floor(sortedValues.length / 2);
    return sortedValues.length % 2 !== 0
        ? sortedValues[mid]
        : ((sortedValues[mid - 1] + sortedValues[mid]) / 2).toFixed(2);
}

// Calculate Mode
function calculateMode(values) {
    const frequency = {};
    let maxFrequency = 0;
    let mode = null;

    values.forEach(value => {
        frequency[value] = (frequency[value] || 0) + 1;
        if (frequency[value] > maxFrequency) {
            maxFrequency = frequency[value];
            mode = value;
        }
    });

    return mode !== null ? mode.toFixed(2) : "No mode"; // Return mode or "No mode" if all values are unique
}

// Calculate Mean
function calculateMean(values) {
    const sum = values.reduce((acc, value) => acc + value, 0);
    return (sum / values.length).toFixed(2);
}

// Calculate Median
function calculateMedian(values) {
    const sortedValues = values.slice().sort((a, b) => a - b);
    const mid = Math.floor(sortedValues.length / 2);
    return sortedValues.length % 2 !== 0
        ? sortedValues[mid]
        : ((sortedValues[mid - 1] + sortedValues[mid]) / 2).toFixed(2);
}

// Calculate Mode
function calculateMode(values) {
    const frequency = {};
    let maxFrequency = 0;
    let mode = null;

    values.forEach(value => {
        frequency[value] = (frequency[value] || 0) + 1;
        if (frequency[value] > maxFrequency) {
            maxFrequency = frequency[value];
            mode = value;
        }
    });

    return mode !== null ? mode.toFixed(2) : "No mode";
}

// Display statistical values in the analysis section
function displayStatistics(values) {
    document.getElementById('meanValue').innerText = calculateMean(values);
    document.getElementById('medianValue').innerText = calculateMedian(values);
    document.getElementById('modeValue').innerText = calculateMode(values);
}

// Generate Box Plot with Plotly
function createBoxPlot(values) {
    const trace = {
        y: values,
        type: 'box',
        marker: { color: 'rgba(54, 162, 235, 0.7)' }
    };
    const layout = { title: 'Box Plot', margin: { t: 40 } };
    Plotly.newPlot('boxPlotChart', [trace], layout);
}

// Generate Scatter Plot with Plotly
function createScatterPlot(values) {
    const trace = {
        x: Array.from({ length: values.length }, (_, i) => i + 1),
        y: values,
        mode: 'markers',
        type: 'scatter',
        marker: { color: 'rgba(54, 162, 235, 0.7)' }
    };
    const layout = { title: 'Scatter Plot', margin: { t: 40 } };
    Plotly.newPlot('scatterPlotChart', [trace], layout);
}

// Generate Trend Line with Plotly
function createTrendLine(values) {
    const x = Array.from({ length: values.length }, (_, i) => i + 1);
    const regression = calculateLinearRegression(x, values);
    const traceOriginal = { x, y: values, mode: 'lines+markers', name: 'Data', marker: { color: 'rgba(54, 162, 235, 0.7)' } };
    const traceTrend = { x, y: regression, mode: 'lines', name: 'Trend Line', line: { color: 'rgba(255, 99, 132, 1)' } };
    const layout = { title: 'Trend Line', margin: { t: 40 } };
    Plotly.newPlot('trendLineChart', [traceOriginal, traceTrend], layout);
}

// Calculate a simple linear regression for the trend line
function calculateLinearRegression(x, y) {
    const n = y.length;
    const xSum = x.reduce((a, b) => a + b, 0);
    const ySum = y.reduce((a, b) => a + b, 0);
    const xySum = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
    const xxSum = x.reduce((sum, xi) => sum + xi * xi, 0);
    const slope = (n * xySum - xSum * ySum) / (n * xxSum - xSum * xSum);
    const intercept = (ySum - slope * xSum) / n;
    return x.map(xi => slope * xi + intercept);
}

<?php
session_start();


// Check if the user is logged in, otherwise redirect to login page
if (!isset($_SESSION['username'])) {
    header('Location: index.php#login');
    exit();
}

if (!isset($_SESSION['id'])) {
    // Redirect if 'id' is not set in the session
    header("Location: /Project-web-app/templates/index.php");
    exit();
}

$timeout_duration = 900;

// Check if the user is inactive
if (isset($_SESSION['LAST_ACTIVITY']) && (time() - $_SESSION['LAST_ACTIVITY']) > $timeout_duration) {
    // End session and redirect to index
    session_unset();
    session_destroy();
    header('Location: index.php');
    exit();
}

// Update the last activity timestamp
$_SESSION['LAST_ACTIVITY'] = time();

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quantitative Solutions Dashboard</title>
    <link rel="stylesheet" href="/Project-web-app/css/dashboard.css">
</head>
<body>
    <header>
        <div class="logo-nav">
           <a href="index.php">
            <img src="/Project-web-app/images/newlogo.png" alt="Quantitative Solutions Logo" class="logo">
           </a>
            <nav>
                <ul>
                    <li><a href="#overview">Overview</a></li>
                    <li><a href="#visualization">Visualisation</a></li>
                    <li><a href="#analysis">Analytics</a></li>
                </ul>
            </nav>
            <a href="index.php" class="logout-button">Logout</a>
        </div>
    </header>

    <main>
    <section id="overview" class="dashboard-section">
    <h2>Dashboard Overview</h2>
    <p id="overviewPrompt">Your overview data will be displayed here once your data has been uploaded.</p>

    <!-- Initial upload form in Overview Section -->
    <div class="file-input-container">
    <form id="initial-upload-form" action="/Project-web-app/backend/uploadFile.php" method="POST" enctype="multipart/form-data">
    <div class="button-cointainer">
    <label for="overviewFileInput" class="custom-file-label">Choose File</label>
<input type="file" id="overviewFileInput" name="file" accept=".csv, .xls, .xlsx">
   <input type="hidden" id="userId" name="id" value="<?php echo $_SESSION['id']; ?>">
   <button type="submit">Upload Data</button>
    </form>
    <button id="loadFileButton">Load Previous Data</button>
    <button id="deleteFileButton"style="display:none">Delete File</button>
    </div>
    </div>
    <select id="fileListDropdown"style="display: none;"></select>
    

    <!-- Overview data grids for visualization and analysis after data upload -->
    <div id="overviewData" style="display: none;">
        <div class="overview-bar">
            <div class="summary-grid">
                <div class="summary-item">
                    <h3 id="headerSales">Average Sales</h3>
                    <p id="avgSales">-</p>
                </div>
                <div class="summary-item">
                    <h3 id="headerExpenses">Average Expenses</h3>
                    <p id="avgExpenses">-</p>
                </div>
                <div class="summary-item">
                    <h3 id="headerProfit">Average Profit</h3>
                    <p id="avgProfit">-</p>
                </div>
            </div>
        </div>
        <div class="overview-grid">
            <div class="visualization-overview">
                <h3>Visualization Preview</h3>
                <canvas id="overviewVisualizationChart"></canvas>
            </div>
            <div class="analysis-overview">
                <h3>Analysis Preview</h3>
                <canvas id="overviewAnalysisChart"></canvas>
            </div>
        </div>
    </div>
</section>


<!-- Visualization and Analytics Sections (with forms removed) -->
<section id="visualization" class="dashboard-section">
    <h2>Data Visualization</h2>
    <p>Visualize the data uploaded from the overview section.</p>

    <!-- Dropdown for Chart Type Selection -->
    <label for="chartType">Select Chart Type:</label>
    <select id="chartType">
        <option value="bar">Bar Chart</option>
        <option value="line">Line Chart</option>
        <option value="pie">Pie Chart</option>
        <option value="radar">Radar Chart</option>
    </select>

    <div id="charts-container" class="charts-grid"></div>
    <button id="downloadChart">Download Charts</button>
</section>


<section id="analysis" class="dashboard-section">
    <h2>Data Analysis</h2>
    <label for="headerDropdown">Select Data Column:</label>
    <select id="headerDropdown"></select>

    <div class="analysis-summary-grid">
        <div class="analysis-item">
            <h3>Mean</h3>
            <p id="meanValue">-</p>
        </div>
        <div class="analysis-item">
            <h3>Median</h3>
            <p id="medianValue">-</p>
        </div>
        <div class="analysis-item">
            <h3>Mode</h3>
            <p id="modeValue">-</p>
        </div>
    </div>

    <div class="analysis-chart">
        <h3>Box Plot</h3>
        <div id="boxPlotChart"></div>
    </div>

    <div class="analysis-chart">
        <h3>Scatter Plot</h3>
        <div id="scatterPlotChart"></div>
    </div>

    <div class="analysis-chart">
        <h3>Trend Line</h3>
        <div id="trendLineChart"></div>
    </div>

      <!-- Sales Projection Tool Buttons -->
      <div class="projection-buttons">
        <a href="https://sales-projection-project.onrender.com/" target="_blank" class="projection-button">Sales Projection Tool</a>
        <a href="https://quarterly-projection-project.onrender.com/" target="_blank" class="projection-button">Quarterly Projection Tool</a>
    </div>

</section>



    </main>

    <footer>
        <div class="footer-content">
            <section class="contact-info">
                <h2>Where to Find Us</h2>
                <p>085 Colnbrook,<br>6th Road,<br>Midrand</p>

                <h2>Follow Us</h2>
                <ul>
                    <li><a href="https://www.facebook.com/profile.php?id=61556956255913&mibextid=LQQJ4d" target="_blank">Facebook</a></li>
                    <li><a href="https://www.twitter.com/quant_solution">Twitter</a></li>
                </ul>

                <h2>Contact Us</h2>
                <p>Email: <a href="mailto:info@quant-solutions.co.za">info@quant-solutions.co.za</a><br>
                   Phone: +27 82 380 5323</p>
            </section>
        </div>
        <p>&copy; 2024 Quantitative Solutions</p>
    </footer>

    <!-- Core libraries -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/5.3.0/papaparse.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.16.9/xlsx.full.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>

<!-- Plugins and extensions -->
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>




<!-- Custom scripts -->
<script src="/Project-web-app/js/main.js"></script>
<script src="/Project-web-app/js/plugins.js"></script>


</body>
</html>

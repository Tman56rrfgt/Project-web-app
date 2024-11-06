<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Quantitative Solutions</title>
    <link rel="stylesheet" href="/Project-web-app/css/styles.css">

</head>
<body>
    <!-- Header section with logo, nav, and social media icons -->
    <header>
        <div class="logo-nav">
            <a href="index.php">
            <img src="/Project-web-app/images/newlogo.png" alt="Quantitative Solutions Logo" class="logo">
            </a>
            <nav>
                <ul>
                    <li><a href="#intro">Intro</a></li>
                    <li><a href="#what-we-do">What We Do</a></li>
                    <li><a href="#login">Login</a></li>
                    <li><a href="#get-in-touch">Get in Touch</a></li>
                </ul>
            </nav>
            <div class="social-icons">
                <a href="https://www.facebook.com/profile.php?id=61556956255913&mibextid=LQQJ4d" target="_blank"><img src="/Project-web-app/images/icons/facebook-icon.png" alt="Facebook" class="social-icon"></a>
                <a href=""https://www.twitter.com/quant_solution" target="_blank"><img src="/Project-web-app/images/icons/twitter-icon.png" alt="Twitter" class="social-icon"></a>
            </div>
        </div>

        
    </header>

     
    <!-- Intro Section -->
    <section id="intro" class="intro">
       
       <!-- Company Name -->
     <h1 class="company-name">Quantitative Solutions</h1>

     <div class="company-banner">
         <img src="/Project-web-app/images/intro-bg.jpg" alt="Company Icon" class="banner-icon">
         </div>
<div class="intro-content">
        <h2>Hello, We are Quantitative Solutions.</h2>
        <p>A leading provider of data analytics services, specializing in helping businesses harness the power of their data to make informed decisions and drive growth. With a team of experienced data scientists and analysts, we offer a range of services tailored to meet the unique needs of our clients.</p>
</div>
    </section>

    <!-- What We Do Section -->
    <section id="what-we-do" class="what-we-do">
        <h2>What We Do</h2>
        <div class="what-we-do-content">

            <div class="what-we-do-item">
                <img src="/Project-web-app/images/icons/icon-ecommerce.svg" alt="Data Analysis Icon" class="icon">
        <h3>Data Analysis and Visualisation</h3>
        <p>We provide comprehensive data analysis services, including data cleaning, exploration, and visualization using tools such as Python, R, and Tableau.</p>
            </div>
            <div class="what-we-do-item">
                <img src="/Project-web-app/images/icons/icon-product-design.svg" alt="Predictive Analysis Icon" class="icon">
        <h3>Predictive Analysis</h3>
        <p>Our team leverages advanced statistical techniques and machine learning algorithms to build predictive models that help businesses anticipate trends and make proactive decisions.</p>
            </div>
            <div class="what-we-do-item">
                <img src="/Project-web-app/images/icons/icon-frontend.svg" alt="Business Intelligence Icon" class="icon">
        <h3>Business Intelligence Solutions</h3>
        <p>We design and implement custom business intelligence solutions that enable organizations to access and analyze their data in real-time, empowering them to gain actionable insights.</p>
            </div>
            <div class="what-we-do-item">
                <img src="/Project-web-app/images/icons/icon-research.svg" alt="Data Strategy Icon" class="icon">
        <h3>Data Strategy and Consulting</h3>
        <p>We work closely with our clients to develop data strategies aligned with their business goals, offering expert guidance on data governance, infrastructure, and best practices.</p>
            </div>
        </div>
    </section>

    <!-- Login Section -->
    <section id="login" class="login-section">
        <div class="login-content">
            <h2>Login to Your Dashboard</h2>
            <p>Access your personalized dashboard and gain insights into your data. Click below to log in.</p>
            <form action="/Project-web-app/admin_tools/login.php" method="POST" class="login-form">
                <input type="text" name="username" placeholder="Username" required>
                <input type="password" name="password" placeholder="Password" required>
                <button type="submit" class="btn-login">Login</button>
            </form>
            <p>Don't have an account? <a href="/Project-web-app/templates/signup.php" class="signup-link">Sign Up</a></p>
        </div>
    </section>

    <!-- Footer / Get In Touch Section -->
    <footer id="get-in-touch">
        <div class="footer-content">
            <h2>Get In Touch</h2>
         <h1>Would you like to book an appointment with us?.</h1>
         <a href="mailto:info@quant-solutions.co.za" class="mailto-button">Write An Email</a>

         <h2>Where To Find Us</h2>
         <p>085 Colnbrook,<br>
         6th Road,<br>
        Midrand</p>

        <h2>Follow Us</h2>
       <p> <a href="https://www.facebook.com/profile.php?id=61556956255913&mibextid=LQQJ4d">Facebook</a>
        <a href=""https://www.twitter.com/quant_solution">Twitter</a></p>

        <h2>Contact Us</h2>
        <p>Email: <a href="mailto:info@quant-solutions.co.za">info@quant-solutions.co.za</a><br>
       Phone: +27 82 380 5323
      Whatsapp: <a href="wa.me/27825287439">Whatsapp</a></p>
        </div>
        <p>&copy; 2024 Quantitative Solutions</p>
    </footer>
    <script src="/Project-web-app/js/main.js"></script>
</body>
</html>

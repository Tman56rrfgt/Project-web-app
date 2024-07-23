<?php

require_once 'include/database.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>home</title>

    <link rel="stylesheet"href="https://unpkg.com/swiper@7/swiper-bundle.min.css"/>

    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"/>

    <link rel="stylesheet" href="assests/css/style.css">
</head>


<body>
<section class="header">
    <a href="index.php" class="logo">CLC.</a>
  
    <nav class="navbar">
        <a href="index.php">Home</a>
        <a href="products/index.php">Shop</a>
        <a href="about.php">About Us</a>
        <a href="cart/view.php">Cart</a>
        <a href="authenticate/login.php">Login</a>
        <a href="authenticate/registration.php">Sign Up</a>
    </nav>

    <div id="toggle-btn" class="fas fa-bars"></div>
</section>


<!--home-->
    <section class="home">
    <div class="swiper home-slider">

                        <div class="swiper-wrapper">
                            <div class="swiper-slide" style="background:url(assests/images/slide-1.jpg) no-repeat">
                            <div class="content">
                                <span>Style, beauty, freedom</span>
                                <h3>Shop our range</h3>
                             <a href="products/index.php" class="btn">shop</a>
                            </div>
                            </div>

            <div class="swiper-slide" style="background:url(assests/images/slide-2.jpg) no-repeat">
            <div class="content">
                <span>Style, beauty, freedom</span>
                <h3>All inclusive sizes</h3>
                <a href="shop.php" class="btn">shop</a>
             </div>
            </div>

            <div class="swiper-slide" style="background:url(assests/images/slide-3.jpg) no-repeat">
            <div class="content">
                <span>Style, beauty, freedom</span>
                <h3>Step out in style</h3>
                <a href="products/index.php" class="btn">shop</a>
             </div>
            </div>

    </div>
  <div class="swiper-button-next"></div>
  <div class="swiper-button-prev"></div>
</div>
</section>

<section class="home-about">
  <div class="image">
    <img src="assests/images/about-3.png" alt=""> <!--change image-->
  </div>
  <div class="content">
    <h3>About Us</h3>
    <p>We are are a passionate group of fashion designers with an aim of creating beautiful yet functional pieces of clothing. Here at CLC we ensure every person of any size will have something beautiful to wear.</p>
    <a href="about.php" class="btn">Read More</a>
  </div>
</section>


<section class="home-shop">
    <h1 class="heading">Featured Products</h1>
    <div class="products">
        <?php
        // Fetch featured products from the database
        $stmt = $pdo->query("SELECT * FROM products ");

        if ($stmt->rowCount() > 0) {
            while ($product = $stmt->fetch()) {
                ?>
                <div class="product">
                    <?php if (!empty($product['image'])): ?>
                        <img src="assests/images/<?php echo htmlspecialchars($product['image']); ?>" alt="<?php echo htmlspecialchars($product['name']); ?>" class="product-image">
                    <?php endif; ?>
                    <h3><?php echo htmlspecialchars($product['name']); ?></h3>
                    <p><?php echo htmlspecialchars($product['description']); ?></p>
                    <p>$<?php echo htmlspecialchars($product['price']); ?></p>
                    <form action="cart/add.php" method="post">
                        <input type="hidden" name="product_id" value="<?php echo $product['id']; ?>">
                        <button type="submit">Add to Cart</button>
                    </form>
                </div>

                <?php
            }
        } else {
            echo '<p>No featured products available at the moment.</p>';
        }
        ?>
        <div class="load-more"><a href="products/index.php" class="btn">Load More</a></div>
    </div>
</section>

<section class="footer">

  <div class="box-container">
    <div class="box">
      <h3>quick links</h3>
    <a href="index.php"><i class="fas fa-angle-right"></i> Home</a>
    <a href="products/index.php"><i class="fas fa-angle-right"></i> Shop</a>
    <a href="about.php"><i class="fas fa-angle-right"></i> About Us</a>
    <a href="authenticate/login.php"><i class="fas fa-angle-right"></i> Login</a>
    </div>


   <div class="box">
      <h3>extra</h3>
    <a href="#"><i class="fas fa-angle-right"></i> ask questions</a>
    <a href="#"><i class="fas fa-angle-right"></i> about us</a>
    <a href="#"><i class="fas fa-angle-right"></i> privacy policy</a>
    <a href="#"><i class="fas fa-angle-right"></i> terms of use</a>
    </div>

    <div class="box">
      <h3>Contact us</h3>
      <a href="#"><i class="fas fa-phone"></i> +27 62-047-9673</a>
      <a href="#"><i class="fas fa-enevelope"></i> constancenaku@gmail.com</a>

    </div>

    <div class="box">
      <h3>Follow us on:</h3>
      <a href="https://www.instagram.com/clc_couture/"><i class="fas fa-instagram"></i> Instagram</a>
    

    </div>
  </div>

  <div class="credit">Made by<span> Tshiamo Monageng</span></div>


</section>

   

    <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>

    <script src="assests/jsScript.js"></script>
</body>
</html>

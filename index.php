<!DOCTYPE html>
<html lang="tr">
<head>




    <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-HJQP2H54XE"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-HJQP2H54XE');
</script>








    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RoadSports - Canlı Futbol Yayınları</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="header-content">
                <h1 class="logo">
                    <i class="fas fa-futbol"></i>
                    RoadSports
                </h1>
                <p class="tagline">En İyi Futbol Yayınları Burada</p>
            </div>
        </div>
    </header>

    <main class="main">
        <div class="container">
            <div class="telegram-banner">
                <div class="telegram-content">
                    <i class="fab fa-telegram"></i>
                    <span>Güncel duyurular ve özel içerikler için Telegram grubumuzda bize katılın!</span>
                    <a href="https://t.me/+fXAGFP63bSFiMjI0" target="_blank" class="telegram-btn">
                        <i class="fab fa-telegram"></i>
                        Telegram'da Katıl
                    </a>
                </div>
            </div>

            <section class="channels-section">
                <h2 class="section-title">
                    <i class="fas fa-broadcast-tower"></i>
                    Canlı Kanallar
                </h2>
                <div class="channels-grid" id="channelsGrid">
                    <div class="loading">
                        <i class="fas fa-spinner fa-spin"></i>
                        Kanallar yükleniyor...
                    </div>
                </div>
            </section>
        </div>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 RoadSports. Tüm hakları saklıdır.</p>
        </div>
    </footer>

    <script src="assets/js/main.js"></script>
</body>
</html>

<?php
// JSON dosyasından kanalları oku
$channelsFile = 'data/channels.json';
$channels = [];

if (file_exists($channelsFile)) {
    $jsonData = file_get_contents($channelsFile);
    $channels = json_decode($jsonData, true) ?: [];
}
?>

<script>
// PHP'den JavaScript'e kanalları aktar
const channels = <?php echo json_encode($channels); ?>;
</script>
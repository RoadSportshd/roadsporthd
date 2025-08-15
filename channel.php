<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kanal - RoadSports</title>
    <link rel="stylesheet" href="assets/css/style.css">
    <link href="https://vjs.zencdn.net/8.6.1/video-js.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="header-content">
                <a href="index.php" class="logo">
                    <i class="fas fa-futbol"></i>
                    RoadSports
                </a>
                <a href="index.php" class="back-btn">
                    <i class="fas fa-arrow-left"></i>
                    Ana Sayfaya Dön
                </a>
            </div>
        </div>
    </header>

    <main class="main">
        <div class="container">
            <div class="channel-page">
                <?php
                $channelId = isset($_GET['id']) ? intval($_GET['id']) : 0;
                $channelsFile = 'data/channels.json';
                $channel = null;

                if (file_exists($channelsFile)) {
                    $jsonData = file_get_contents($channelsFile);
                    $channels = json_decode($jsonData, true) ?: [];
                    
                    foreach ($channels as $ch) {
                        if ($ch['id'] == $channelId) {
                            $channel = $ch;
                            break;
                        }
                    }
                }

                if ($channel): ?>
                    <div class="channel-info">
                        <div class="channel-header">
                            <div class="channel-image">
                                <img src="<?php echo htmlspecialchars($channel['image']); ?>" 
                                     alt="<?php echo htmlspecialchars($channel['name']); ?>"
                                     onerror="this.src='https://via.placeholder.com/100x100/16213e/ffffff?text=TV'">
                            </div>
                            <div class="channel-details">
                                <h1 class="channel-name"><?php echo htmlspecialchars($channel['name']); ?></h1>
                                <p class="match-info">
                                    <i class="fas fa-futbol"></i>
                                    <?php 
                                    $matchText = $channel['match'];
                                    if (strpos($matchText, ' vs ') !== false && strpos($matchText, ' • ') !== false) {
                                        $parts = explode(' • ', $matchText);
                                        $teams = explode(' vs ', $parts[0]);
                                        $league = $parts[1];
                                        echo '<span class="teams">' . 
                                             htmlspecialchars(trim($teams[0])) . 
                                             '<span class="vs-separator">VS</span>' . 
                                             htmlspecialchars(trim($teams[1])) . 
                                             '</span><span class="league-info">' . 
                                             htmlspecialchars($league) . '</span>';
                                    } else {
                                        echo htmlspecialchars($matchText);
                                    }
                                    ?>
                                </p>
                                <div class="channel-status">
                                    <span class="live-badge">
                                        <i class="fas fa-circle"></i>
                                        CANLI
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="video-container">
                        <video 
                            id="videoPlayer"
                            class="video-js vjs-default-skin"
                            controls
                            preload="auto"
                            data-setup='{}'>
                            <p class="vjs-no-js">
                                Video oynatmak için, lütfen 
                                <a href="https://videojs.com/html5-video-support/" target="_blank">
                                    JavaScript'i etkinleştirin
                                </a>.
                            </p>
                        </video>
                    </div>

                    <script>
                        const channelData = <?php echo json_encode($channel); ?>;
                    </script>
                <?php else: ?>
                    <div class="error-message">
                        <i class="fas fa-exclamation-triangle"></i>
                        <h2>Kanal Bulunamadı</h2>
                        <p>Aradığınız kanal bulunamadı veya kaldırılmış olabilir.</p>
                        <a href="index.php" class="btn btn-primary">
                            <i class="fas fa-home"></i>
                            Ana Sayfaya Dön
                        </a>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 RoadSports. Tüm hakları saklıdır.</p>
        </div>
    </footer>

    <script src="https://vjs.zencdn.net/8.6.1/video.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/@videojs/http-streaming@3.0.2/dist/videojs-http-streaming.min.js"></script>
    <script src="assets/js/player.js"></script>
</body>
</html>
<?php
session_start();

// Oturum kontrolü
if (!isset($_SESSION['admin_logged_in']) || $_SESSION['admin_logged_in'] !== true) {
    header('Location: login.php');
    exit;
}

// Kanallar dosyası
$channelsFile = '../data/channels.json';
$channels = [];

// JSON dosyasını oku
if (file_exists($channelsFile)) {
    $jsonData = file_get_contents($channelsFile);
    $channels = json_decode($jsonData, true) ?: [];
}

$message = '';
$messageType = '';
$editChannel = null;

// Form işlemleri
if ($_POST) {
    $action = $_POST['action'] ?? '';
    
    switch ($action) {
        case 'add':
            $newChannel = [
                'id' => count($channels) + 1,
                'name' => $_POST['name'] ?? '',
                'match' => $_POST['match'] ?? '',
                'stream_url' => $_POST['stream_url'] ?? '',
                'image' => $_POST['image'] ?? '',
                'created_at' => date('Y-m-d H:i:s')
            ];
            
            if ($newChannel['name'] && $newChannel['stream_url']) {
                $channels[] = $newChannel;
                if (file_put_contents($channelsFile, json_encode($channels, JSON_PRETTY_PRINT))) {
                    $message = 'Kanal başarıyla eklendi!';
                    $messageType = 'success';
                } else {
                    $message = 'Kanal eklenirken hata oluştu!';
                    $messageType = 'error';
                }
            } else {
                $message = 'Kanal adı ve stream URL zorunludur!';
                $messageType = 'error';
            }
            break;
            
        case 'edit':
            $editId = intval($_POST['id'] ?? 0);
            $updatedChannel = [
                'id' => $editId,
                'name' => $_POST['name'] ?? '',
                'match' => $_POST['match'] ?? '',
                'stream_url' => $_POST['stream_url'] ?? '',
                'image' => $_POST['image'] ?? '',
                'created_at' => $_POST['created_at'] ?? date('Y-m-d H:i:s')
            ];
            
            if ($updatedChannel['name'] && $updatedChannel['stream_url']) {
                for ($i = 0; $i < count($channels); $i++) {
                    if ($channels[$i]['id'] == $editId) {
                        $channels[$i] = $updatedChannel;
                        break;
                    }
                }
                
                if (file_put_contents($channelsFile, json_encode($channels, JSON_PRETTY_PRINT))) {
                    $message = 'Kanal başarıyla güncellendi!';
                    $messageType = 'success';
                } else {
                    $message = 'Kanal güncellenirken hata oluştu!';
                    $messageType = 'error';
                }
            } else {
                $message = 'Kanal adı ve stream URL zorunludur!';
                $messageType = 'error';
            }
            break;
            
        case 'delete':
            $deleteId = intval($_POST['id'] ?? 0);
            $channels = array_filter($channels, function($channel) use ($deleteId) {
                return $channel['id'] != $deleteId;
            });
            
            // ID'leri yeniden düzenle
            $channels = array_values($channels);
            for ($i = 0; $i < count($channels); $i++) {
                $channels[$i]['id'] = $i + 1;
            }
            
            if (file_put_contents($channelsFile, json_encode($channels, JSON_PRETTY_PRINT))) {
                $message = 'Kanal başarıyla silindi!';
                $messageType = 'success';
            } else {
                $message = 'Kanal silinirken hata oluştu!';
                $messageType = 'error';
            }
            break;
    }
}

// Düzenleme için kanal bilgilerini al
if (isset($_GET['edit']) && is_numeric($_GET['edit'])) {
    $editId = intval($_GET['edit']);
    foreach ($channels as $channel) {
        if ($channel['id'] == $editId) {
            $editChannel = $channel;
            break;
        }
    }
}
?>

<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yönetici Paneli - RoadSports</title>
    <link rel="stylesheet" href="../assets/css/style.css">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">
</head>
<body>
    <header class="header">
        <div class="container">
            <div class="header-content">
                <a href="../index.php" class="logo">
                    <i class="fas fa-futbol"></i>
                    RoadSports
                </a>
                <div style="display: flex; align-items: center; gap: 1rem;">
                    <span style="color: #a0a0a0;">Hoş geldiniz, Admin</span>
                    <a href="logout.php" class="back-btn">
                        <i class="fas fa-sign-out-alt"></i>
                        Çıkış Yap
                    </a>
                </div>
            </div>
        </div>
    </header>

    <main class="main">
        <div class="container">
            <h1 class="section-title">
                <i class="fas fa-cogs"></i>
                Yönetici Paneli
            </h1>

            <?php if ($message): ?>
                <div class="alert alert-<?php echo $messageType; ?>">
                    <i class="fas fa-<?php echo $messageType === 'success' ? 'check' : 'exclamation-triangle'; ?>"></i>
                    <?php echo htmlspecialchars($message); ?>
                </div>
            <?php endif; ?>

            <!-- Kanal Ekleme Formu -->
            <div style="margin-bottom: 3rem;">
                <h2 style="color: #00d2ff; margin-bottom: 1.5rem;" id="form-title">
                    <i class="fas fa-plus"></i>
                    <?php echo $editChannel ? 'Kanal Düzenle' : 'Yeni Kanal Ekle'; ?>
                </h2>
                
                <form method="post" class="admin-form">
                    <input type="hidden" name="action" value="<?php echo $editChannel ? 'edit' : 'add'; ?>">
                    <?php if ($editChannel): ?>
                        <input type="hidden" name="id" value="<?php echo $editChannel['id']; ?>">
                        <input type="hidden" name="created_at" value="<?php echo $editChannel['created_at']; ?>">
                    <?php endif; ?>
                    
                    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
                        <div class="form-group">
                            <label for="name">Kanal Adı *</label>
                            <input type="text" id="name" name="name" required 
                                   placeholder="Örnek: TRT Spor HD"
                                   value="<?php echo $editChannel ? htmlspecialchars($editChannel['name']) : ''; ?>">
                        </div>
                        
                        <div class="form-group">
                            <label for="match">Maç Bilgisi</label>
                            <input type="text" id="match" name="match" 
                                   placeholder="Örnek: Real Madrid vs Barcelona • La Liga"
                                   value="<?php echo $editChannel ? htmlspecialchars($editChannel['match']) : ''; ?>">
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label for="stream_url">Stream URL (.m3u8) *</label>
                        <input type="url" id="stream_url" name="stream_url" required 
                               placeholder="https://example.com/stream.m3u8"
                               value="<?php echo $editChannel ? htmlspecialchars($editChannel['stream_url']) : ''; ?>">
                    </div>
                    
                    <div class="form-group">
                        <label for="image">Kanal Resmi URL</label>
                        <input type="url" id="image" name="image" 
                               placeholder="https://example.com/channel-logo.png"
                               value="<?php echo $editChannel ? htmlspecialchars($editChannel['image']) : ''; ?>">
                    </div>
                    
                    <div style="display: flex; gap: 1rem;">
                        <button type="submit" class="btn btn-primary">
                            <i class="fas fa-<?php echo $editChannel ? 'save' : 'plus'; ?>"></i>
                            <?php echo $editChannel ? 'Güncelle' : 'Kanal Ekle'; ?>
                        </button>
                        
                        <?php if ($editChannel): ?>
                            <a href="dashboard.php" class="btn" style="background: #6c757d; color: white; text-decoration: none;">
                                <i class="fas fa-times"></i>
                                İptal
                            </a>
                        <?php endif; ?>
                    </div>
                </form>
            </div>

            <!-- Mevcut Kanallar -->
            <div>
                <h2 style="color: #00d2ff; margin-bottom: 1.5rem;">
                    <i class="fas fa-list"></i>
                    Mevcut Kanallar (<?php echo count($channels); ?>)
                </h2>
                
                <?php if (empty($channels)): ?>
                    <div class="loading">
                        <i class="fas fa-tv"></i>
                        <p>Henüz kanal eklenmemiş.</p>
                        <p style="color: #a0a0a0; font-size: 0.9rem; margin-top: 0.5rem;">
                            Yukarıdaki formu kullanarak ilk kanalınızı ekleyin.
                        </p>
                    </div>
                <?php else: ?>
                    <div class="dashboard-grid">
                        <?php foreach ($channels as $channel): ?>
                            <div class="dashboard-card">
                                <div class="channel-header" style="margin-bottom: 1rem;">
                                    <div class="channel-image" style="width: 60px; height: 60px;">
                                        <img src="<?php echo htmlspecialchars($channel['image'] ?: 'https://via.placeholder.com/60x60/16213e/ffffff?text=TV'); ?>" 
                                             alt="<?php echo htmlspecialchars($channel['name']); ?>"
                                             onerror="this.src='https://via.placeholder.com/60x60/16213e/ffffff?text=TV'">
                                    </div>
                                    <div>
                                        <h3><?php echo htmlspecialchars($channel['name']); ?></h3>
                                        <p style="color: #a0a0a0; font-size: 0.9rem;">
                                            ID: <?php echo $channel['id']; ?>
                                        </p>
                                    </div>
                                </div>
                                
                                <div style="margin-bottom: 1rem;">
                                    <p><strong>Maç:</strong> 
                                        <span style="color: #00d2ff;">
                                            <?php 
                                            $matchText = $channel['match'] ?: 'Belirtilmemiş';
                                            if (strpos($matchText, ' vs ') !== false && strpos($matchText, ' • ') !== false) {
                                                $parts = explode(' • ', $matchText);
                                                $teams = explode(' vs ', $parts[0]);
                                                $league = $parts[1];
                                                echo htmlspecialchars(trim($teams[0])) . ' <strong style="color: #ffd700;">VS</strong> ' . 
                                                     htmlspecialchars(trim($teams[1])) . '<br><small style="color: #ffd700;">' . 
                                                     htmlspecialchars($league) . '</small>';
                                            } else {
                                                echo htmlspecialchars($matchText);
                                            }
                                            ?>
                                        </span>
                                    </p>
                                    <p><strong>Stream:</strong> 
                                        <span style="font-size: 0.8rem; color: #a0a0a0;">
                                            <?php echo htmlspecialchars(substr($channel['stream_url'], 0, 50) . '...'); ?>
                                        </span>
                                    </p>
                                    <?php if (isset($channel['created_at'])): ?>
                                        <p><strong>Eklendi:</strong> 
                                            <span style="font-size: 0.9rem; color: #a0a0a0;">
                                                <?php echo date('d.m.Y H:i', strtotime($channel['created_at'])); ?>
                                            </span>
                                        </p>
                                    <?php endif; ?>
                                </div>
                                
                                <div class="channel-actions">
                                    <a href="../channel.php?id=<?php echo $channel['id']; ?>" 
                                       target="_blank" class="btn-edit">
                                        <i class="fas fa-eye"></i>
                                        Önizle
                                    </a>
                                    
                                    <a href="dashboard.php?edit=<?php echo $channel['id']; ?>" 
                                       class="btn-edit-action">
                                        <i class="fas fa-edit"></i>
                                        Düzenle
                                    </a>
                                    
                                    <form method="post" style="display: inline;" 
                                          onsubmit="return confirm('Bu kanalı silmek istediğinize emin misiniz?');">
                                        <input type="hidden" name="action" value="delete">
                                        <input type="hidden" name="id" value="<?php echo $channel['id']; ?>">
                                        <button type="submit" class="btn-delete">
                                            <i class="fas fa-trash"></i>
                                            Sil
                                        </button>
                                    </form>
                                </div>
                            </div>
                        <?php endforeach; ?>
                    </div>
                <?php endif; ?>
            </div>

            <!-- İstatistikler -->
            <div style="margin-top: 3rem;">
                <h2 style="color: #00d2ff; margin-bottom: 1.5rem;">
                    <i class="fas fa-chart-bar"></i>
                    İstatistikler
                </h2>
                
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div class="dashboard-card" style="text-align: center;">
                        <h3 style="color: #00d2ff; font-size: 2rem; margin-bottom: 0.5rem;">
                            <?php echo count($channels); ?>
                        </h3>
                        <p>Toplam Kanal</p>
                    </div>
                    
                    <div class="dashboard-card" style="text-align: center;">
                        <h3 style="color: #2ecc71; font-size: 2rem; margin-bottom: 0.5rem;">
                            <?php echo count(array_filter($channels, function($ch) { return !empty($ch['stream_url']); })); ?>
                        </h3>
                        <p>Aktif Stream</p>
                    </div>
                    
                    <div class="dashboard-card" style="text-align: center;">
                        <h3 style="color: #f39c12; font-size: 2rem; margin-bottom: 0.5rem;">
                            <?php echo count(array_filter($channels, function($ch) { return !empty($ch['match']); })); ?>
                        </h3>
                        <p>Maç Bilgisi Var</p>
                    </div>
                </div>
            </div>
        </div>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 RoadSports. Tüm hakları saklıdır.</p>
        </div>
    </footer>
</body>
</html>
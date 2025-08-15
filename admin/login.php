<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Yönetici Girişi - RoadSports</title>
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
                <span class="tagline">Yönetici Paneli</span>
            </div>
        </div>
    </header>

    <main class="main">
        <div class="admin-container">
            <?php
            session_start();
            
            $error = '';
            
            if ($_POST) {
                $username = $_POST['username'] ?? '';
                $password = $_POST['password'] ?? '';
                
                // Basit doğrulama (gerçek uygulamada hash kullanın)
                if ($username === 'admin' && $password === 'roadsports2025') {
                    $_SESSION['admin_logged_in'] = true;
                    header('Location: dashboard.php');
                    exit;
                } else {
                    $error = 'Geçersiz kullanıcı adı veya şifre!';
                }
            }
            ?>
            
            <form method="post" class="admin-form">
                <h2 style="text-align: center; margin-bottom: 2rem; color: #00d2ff;">
                    <i class="fas fa-lock"></i>
                    Yönetici Girişi
                </h2>
                
                <?php if ($error): ?>
                    <div class="alert alert-error">
                        <i class="fas fa-exclamation-triangle"></i>
                        <?php echo htmlspecialchars($error); ?>
                    </div>
                <?php endif; ?>
                
                <div class="form-group">
                    <label for="username">
                        <i class="fas fa-user"></i>
                        Kullanıcı Adı
                    </label>
                    <input type="text" id="username" name="username" required 
                           placeholder="Kullanıcı adınızı girin">
                </div>
                
                <div class="form-group">
                    <label for="password">
                        <i class="fas fa-lock"></i>
                        Şifre
                    </label>
                    <input type="password" id="password" name="password" required 
                           placeholder="Şifrenizi girin">
                </div>
                
                <button type="submit" class="btn btn-primary" style="width: 100%; font-size: 1.1rem;">
                    <i class="fas fa-sign-in-alt"></i>
                    Giriş Yap
                </button>
                
                <div style="text-align: center; margin-top: 2rem; color: #a0a0a0; font-size: 0.9rem;">
                    <p><strong>Demo Bilgileri:</strong></p>
                    <p>Kullanıcı Adı: admin</p>
                    <p>Şifre: roadsports2025</p>
                </div>
            </form>
        </div>
    </main>

    <footer class="footer">
        <div class="container">
            <p>&copy; 2025 RoadSports. Tüm hakları saklıdır.</p>
        </div>
    </footer>
</body>
</html>
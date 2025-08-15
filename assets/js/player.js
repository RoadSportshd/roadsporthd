// Video player JavaScript dosyası

class VideoPlayer {
    constructor() {
        this.player = null;
        this.init();
    }

    init() {
        if (typeof channelData !== 'undefined' && channelData.stream_url) {
            this.setupPlayer(channelData.stream_url);
        } else {
            this.showError('Stream URL bulunamadı.');
        }
    }

    setupPlayer(streamUrl) {
        try {
            // Video.js player'ı başlat
            this.player = videojs('videoPlayer', {
                fluid: true,
                responsive: true,
                playbackRates: [0.5, 1, 1.25, 1.5, 2],
                controls: true,
                preload: 'auto',
                html5: {
                    vhs: {
                        overrideNative: true
                    }
                }
            });

            // Player hazır olduğunda stream'i yükle
            this.player.ready(() => {
                this.loadStream(streamUrl);
                this.setupPlayerEvents();
            });

        } catch (error) {
            console.error('Player kurulumu hatası:', error);
            this.showError('Video player kurulumunda hata oluştu.');
        }
    }

    loadStream(streamUrl) {
        try {
            // HLS stream'i ayarla
            this.player.src({
                src: streamUrl,
                type: 'application/x-mpegURL'
            });

            // Stream yüklendikten sonra otomatik oynat
            this.player.load();
            
            // Kullanıcı etkileşimi sonrası oynat (modern browser politikaları)
            this.setupAutoplay();

        } catch (error) {
            console.error('Stream yükleme hatası:', error);
            this.showError('Video stream yüklenirken hata oluştu.');
        }
    }

    setupAutoplay() {
        // Modern tarayıcılarda autoplay politikaları nedeniyle kullanıcı etkileşimi gerekir
        const playPromise = this.player.play();
        
        if (playPromise !== undefined) {
            playPromise.then(() => {
                console.log('Video otomatik olarak başlatıldı');
            }).catch(error => {
                console.log('Autoplay engellenmiş, kullanıcı etkileşimi bekleniyor:', error);
                this.showPlayButton();
            });
        }
    }

    setupPlayerEvents() {
        // Loading durumu
        this.player.on('loadstart', () => {
            console.log('Video yükleniyor...');
            this.showLoading();
        });

        // Video hazır
        this.player.on('loadeddata', () => {
            console.log('Video verileri yüklendi');
            this.hideLoading();
        });

        // Oynatma başladı
        this.player.on('play', () => {
            console.log('Video oynatma başladı');
            this.hidePlayButton();
        });

        // Oynatma durduruldu
        this.player.on('pause', () => {
            console.log('Video durduruldu');
        });

        // Hata durumu
        this.player.on('error', (error) => {
            console.error('Video oynatma hatası:', error);
            this.handlePlayerError();
        });

        // Bağlantı kaybı
        this.player.on('loadedmetadata', () => {
            console.log('Video metadata yüklendi');
        });

        // Kalite değişimi (HLS)
        this.player.on('qualitychange', () => {
            console.log('Video kalitesi değişti');
        });
    }

    showLoading() {
        const loadingEl = document.createElement('div');
        loadingEl.id = 'video-loading';
        loadingEl.innerHTML = `
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: white;
                font-size: 1.2rem;
                z-index: 1000;
                text-align: center;
            ">
                <i class="fas fa-spinner fa-spin" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                Yayın yükleniyor...
            </div>
        `;
        
        const videoContainer = document.querySelector('.video-container');
        if (videoContainer && !document.getElementById('video-loading')) {
            videoContainer.appendChild(loadingEl);
        }
    }

    hideLoading() {
        const loadingEl = document.getElementById('video-loading');
        if (loadingEl) {
            loadingEl.remove();
        }
    }

    showPlayButton() {
        const playBtn = document.createElement('div');
        playBtn.id = 'custom-play-btn';
        playBtn.innerHTML = `
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                z-index: 1000;
                cursor: pointer;
                background: rgba(0, 210, 255, 0.9);
                color: white;
                padding: 1rem 2rem;
                border-radius: 25px;
                font-size: 1.1rem;
                font-weight: 600;
                transition: all 0.3s ease;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            " onclick="videoPlayerInstance.playVideo()">
                <i class="fas fa-play"></i>
                Yayını Başlat
            </div>
        `;
        
        const videoContainer = document.querySelector('.video-container');
        if (videoContainer && !document.getElementById('custom-play-btn')) {
            videoContainer.appendChild(playBtn);
        }
    }

    hidePlayButton() {
        const playBtn = document.getElementById('custom-play-btn');
        if (playBtn) {
            playBtn.remove();
        }
    }

    playVideo() {
        if (this.player) {
            this.player.play();
        }
    }

    handlePlayerError() {
        const error = this.player.error();
        let errorMessage = 'Video oynatılırken bir hata oluştu.';
        
        if (error) {
            switch (error.code) {
                case 1:
                    errorMessage = 'Video yükleme iptal edildi.';
                    break;
                case 2:
                    errorMessage = 'Ağ hatası nedeniyle video yüklenemedi.';
                    break;
                case 3:
                    errorMessage = 'Video dosyası bozuk veya desteklenmeyen format.';
                    break;
                case 4:
                    errorMessage = 'Video formatı desteklenmiyor.';
                    break;
                default:
                    errorMessage = 'Bilinmeyen bir hata oluştu.';
            }
        }
        
        this.showError(errorMessage);
    }

    showError(message) {
        const errorEl = document.createElement('div');
        errorEl.innerHTML = `
            <div style="
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                color: white;
                font-size: 1.1rem;
                z-index: 1000;
                text-align: center;
                background: rgba(231, 76, 60, 0.9);
                padding: 2rem;
                border-radius: 15px;
                max-width: 400px;
            ">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; margin-bottom: 1rem; display: block;"></i>
                ${message}
                <br><br>
                <button onclick="location.reload()" style="
                    background: rgba(255,255,255,0.2);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 20px;
                    cursor: pointer;
                    font-weight: 600;
                ">
                    <i class="fas fa-refresh"></i> Tekrar Dene
                </button>
            </div>
        `;
        
        const videoContainer = document.querySelector('.video-container');
        if (videoContainer) {
            videoContainer.appendChild(errorEl);
        }
    }

    destroy() {
        if (this.player) {
            this.player.dispose();
        }
    }
}

// Player instance'ı oluştur
let videoPlayerInstance = null;

document.addEventListener('DOMContentLoaded', () => {
    videoPlayerInstance = new VideoPlayer();
});

// Sayfa kapatılırken player'ı temizle
window.addEventListener('beforeunload', () => {
    if (videoPlayerInstance) {
        videoPlayerInstance.destroy();
    }
});

// Responsive video ayarları
function adjustVideoSize() {
    const player = document.querySelector('#videoPlayer');
    if (player && window.innerWidth < 768) {
        player.style.height = '250px';
    } else if (player) {
        player.style.height = '500px';
    }
}

window.addEventListener('resize', adjustVideoSize);
document.addEventListener('DOMContentLoaded', adjustVideoSize);
// Ana sayfa JavaScript dosyası

class RoadSports {
    constructor() {
        this.init();
    }

    init() {
        this.loadChannels();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Sayfa yüklendiğinde smooth scroll efektini etkinleştir
        document.documentElement.style.scrollBehavior = 'smooth';
        
        // Logo animasyonunu kontrol et
        const logo = document.querySelector('.logo i');
        if (logo) {
            logo.addEventListener('mouseenter', () => {
                logo.style.animationDuration = '0.5s';
            });
            
            logo.addEventListener('mouseleave', () => {
                logo.style.animationDuration = '3s';
            });
        }
    }

    async loadChannels() {
        const channelsGrid = document.getElementById('channelsGrid');
        
        try {
            // PHP tarafından sağlanan channels verisi var mı kontrol et
            if (typeof channels !== 'undefined' && channels.length > 0) {
                this.renderChannels(channels);
            } else {
                this.showNoChannels();
            }
        } catch (error) {
            console.error('Kanallar yüklenirken hata oluştu:', error);
            this.showError();
        }
    }

    renderChannels(channelsData) {
        const channelsGrid = document.getElementById('channelsGrid');
        
        if (!channelsData || channelsData.length === 0) {
            this.showNoChannels();
            return;
        }

        const channelsHTML = channelsData.map(channel => this.createChannelCard(channel)).join('');
        
        channelsGrid.innerHTML = channelsHTML;
        
        // Kartlara animasyon ekle
        this.animateCards();
    }

    createChannelCard(channel) {
        const imageUrl = channel.image || 'https://via.placeholder.com/80x80/16213e/ffffff?text=TV';
        const matchInfo = this.formatMatchInfo(channel.match || 'Maç bilgisi mevcut değil');
        
        return `
            <div class="channel-card" data-id="${channel.id}">
                <div class="channel-header">
                    <div class="channel-image">
                        <img src="${this.escapeHtml(imageUrl)}" 
                             alt="${this.escapeHtml(channel.name)}"
                             onerror="this.src='https://via.placeholder.com/80x80/16213e/ffffff?text=TV'">
                    </div>
                    <div class="channel-info">
                        <h3>${this.escapeHtml(channel.name)}</h3>
                        <p class="match-info">
                            <i class="fas fa-futbol"></i>
                            ${matchInfo}
                        </p>
                        <span class="live-badge">
                            <i class="fas fa-circle"></i>
                            CANLI
                        </span>
                    </div>
                </div>
                <a href="channel.php?id=${channel.id}" class="watch-btn">
                    <i class="fas fa-play"></i>
                    İzle
                </a>
            </div>
        `;
    }

    formatMatchInfo(matchText) {
        // Modern maç formatını parse et (Team1 vs Team2 • League)
        if (matchText.includes(' vs ') && matchText.includes(' • ')) {
            const parts = matchText.split(' • ');
            const teams = parts[0].split(' vs ');
            const league = parts[1];
            
            return `
                <span class="teams">
                    ${this.escapeHtml(teams[0].trim())}
                    <span class="vs-separator">VS</span>
                    ${this.escapeHtml(teams[1].trim())}
                </span>
                <span class="league-info">${this.escapeHtml(league)}</span>
            `;
        }
        
        return this.escapeHtml(matchText);
    }

    animateCards() {
        const cards = document.querySelectorAll('.channel-card');
        
        cards.forEach((card, index) => {
            // Kartları sırayla göster
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                card.style.transition = 'all 0.6s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 150);
        });
    }

    showNoChannels() {
        const channelsGrid = document.getElementById('channelsGrid');
        channelsGrid.innerHTML = `
            <div class="loading">
                <i class="fas fa-tv"></i>
                <p>Şu anda yayında olan kanal bulunmuyor.</p>
                <p style="color: #a0a0a0; font-size: 0.9rem; margin-top: 0.5rem;">
                    Yeni kanallar için birazdan tekrar kontrol edin.
                </p>
            </div>
        `;
    }

    showError() {
        const channelsGrid = document.getElementById('channelsGrid');
        channelsGrid.innerHTML = `
            <div class="loading">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Kanallar yüklenirken bir hata oluştu.</p>
                <button onclick="location.reload()" class="btn btn-primary" style="margin-top: 1rem;">
                    <i class="fas fa-refresh"></i>
                    Tekrar Dene
                </button>
            </div>
        `;
    }

    escapeHtml(unsafe) {
        return unsafe
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
}

// Sayfa yüklendiğinde uygulamayı başlat
document.addEventListener('DOMContentLoaded', () => {
    new RoadSports();
});

// Smooth scroll için genel fonksiyon
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Sayfa performansı için lazy loading
function setupLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Sayfa yüklenme animasyonu
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});
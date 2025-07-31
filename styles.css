// Loading Screen
document.addEventListener('DOMContentLoaded', function() {
    const loadingScreen = document.getElementById('loadingScreen');
    
    // Simulate loading time
    setTimeout(() => {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 500);
    }, 2000);
    
    // Initialize backend integration
    initializeBackendIntegration();
});

// Backend Integration Functions
async function initializeBackendIntegration() {
    try {
        // Update stats from backend
        await updateStats();
        
        // Set up download tracking
        setupDownloadTracking();
        
        console.log('🥇 Backend integration initialized successfully!');
    } catch (error) {
        console.error('Error initializing backend integration:', error);
    }
}

// Backend URL for GitHub Pages integration
const BACKEND_URL = 'https://count1.onrender.com';

// Update stats from backend
async function updateStats() {
    try {
        console.log('🥇 Fetching stats from:', `${BACKEND_URL}/api/stats`);
        const response = await fetch(`${BACKEND_URL}/api/stats`);
        console.log('🥇 Response status:', response.status);
        const data = await response.json();
        console.log('🥇 Backend data:', data);
        
        if (data.success) {
            // Update the stat numbers with real data from backend
            const downloadElement = document.getElementById('downloadCount');
            const tkElement = document.getElementById('tkEarned');
            const tournamentElement = document.getElementById('tournamentCount');
            
            if (downloadElement) {
                downloadElement.setAttribute('data-target', data.stats.totalDownloads);
                downloadElement.textContent = data.stats.totalDownloads.toLocaleString();
            }
            
            // Also update the download card count
            const cardDownloadElement = document.getElementById('cardDownloadCount');
            if (cardDownloadElement) {
                cardDownloadElement.textContent = data.stats.totalDownloads.toLocaleString();
            }
            
            if (tkElement) {
                tkElement.setAttribute('data-target', data.stats.totalTkEarned.replace(' TK', ''));
                tkElement.textContent = data.stats.totalTkEarned;
            }
            
            if (tournamentElement) {
                tournamentElement.setAttribute('data-target', data.stats.totalTournaments);
                tournamentElement.textContent = data.stats.totalTournaments.toLocaleString();
            }
        } else {
            // Show 0 when no data is available
            const downloadElement = document.getElementById('downloadCount');
            const tkElement = document.getElementById('tkEarned');
            const tournamentElement = document.getElementById('tournamentCount');
            
            if (downloadElement) {
                downloadElement.textContent = '0';
            }
            
            // Also update the download card count
            const cardDownloadElement = document.getElementById('cardDownloadCount');
            if (cardDownloadElement) {
                cardDownloadElement.textContent = '0';
            }
            if (tkElement) {
                tkElement.textContent = '0 TK';
            }
            if (tournamentElement) {
                tournamentElement.textContent = '0';
            }
        }
    } catch (error) {
        console.error('🥇 Error updating stats:', error);
        console.error('🥇 Error details:', error.message);
    }
}

// Setup download tracking
function setupDownloadTracking() {
    const downloadButton = document.getElementById('downloadBtn');
    if (downloadButton) {
        downloadButton.addEventListener('click', trackDownload);
    }
}

// Track download when user clicks download button
async function trackDownload() {
    try {
        console.log('🥇 Tracking download...');
        const response = await fetch(`${BACKEND_URL}/api/track-download`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                timestamp: new Date().toISOString(),
                userAgent: navigator.userAgent,
                referrer: document.referrer
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Update the download count immediately
            const downloadElement = document.getElementById('downloadCount');
            const cardDownloadElement = document.getElementById('cardDownloadCount');
            
            if (downloadElement) {
                downloadElement.textContent = data.totalDownloads.toLocaleString();
            }
            if (cardDownloadElement) {
                cardDownloadElement.textContent = data.totalDownloads.toLocaleString();
            }
            
            // Show success message
            showNotification('Download started! 🥇', 'success');
        } else {
            showNotification('Download started! (Tracking failed)', 'info');
        }
    } catch (error) {
        console.error('Error tracking download:', error);
        showNotification('Download started! (Tracking failed)', 'info');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotifications = document.querySelectorAll('.notification');
    existingNotifications.forEach(notification => notification.remove());
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close" onclick="this.parentElement.remove()">×</button>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 12px 20px;
        border-radius: 4px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 10px;
        font-family: 'Poppins', sans-serif;
        font-size: 14px;
        max-width: 300px;
    `;
    
    // Add close button styles
    const closeButton = notification.querySelector('.notification-close');
    closeButton.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 18px;
        cursor: pointer;
        padding: 0;
        margin-left: 10px;
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, 5000);
}

// Animate counter
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        const current = parseInt(element.textContent.replace(/,/g, ''));
        if (current < target) {
            element.textContent = Math.min(current + increment, target).toLocaleString();
            requestAnimationFrame(updateCounter);
        }
    }
    
    updateCounter();
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Back to top button
const backToTopButton = document.getElementById('backToTop');

if (backToTopButton) {
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopButton.style.display = 'block';
        } else {
            backToTopButton.style.display = 'none';
        }
    });
    
    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .step, .download-feature').forEach(el => {
    observer.observe(el);
});

// Add hover effects to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 8px 25px rgba(255, 165, 0, 0.3)';
    });
    
    button.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '';
    });
});

// Add particle effect
function createParticles() {
    const particlesContainer = document.querySelector('.particles');
    if (!particlesContainer) return;
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 165, 0, 0.6);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${3 + Math.random() * 4}s infinite ease-in-out;
            animation-delay: ${Math.random() * 2}s;
        `;
        particlesContainer.appendChild(particle);
    }
}

// Initialize particles
createParticles();

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.6; }
        50% { transform: translateY(-20px) rotate(180deg); opacity: 1; }
    }
    
    .animate {
        animation: fadeInUp 0.6s ease-out forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    .notification {
        animation: slideInRight 0.3s ease-out;
    }
    
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);

// Preload images for better performance
function preloadImages() {
    const images = [
        '../ic_logo.png',
        '../Epic Esports.apk'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

preloadImages();

// Add confetti effect on download
function createConfetti() {
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7'];
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            left: ${Math.random() * 100}vw;
            top: -10px;
            z-index: 9999;
            animation: confettiFall ${3 + Math.random() * 2}s linear forwards;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => confetti.remove(), 5000);
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(720deg);
        }
    }
`;
document.head.appendChild(confettiStyle);

// Add confetti to download button
document.getElementById('downloadBtn')?.addEventListener('click', createConfetti); 

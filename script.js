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
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId: 'anonymous',
                deviceInfo: {
                    platform: navigator.platform,
                    userAgent: navigator.userAgent,
                    language: navigator.language,
                    cookieEnabled: navigator.cookieEnabled
                },
                timestamp: Date.now()
            })
        });
        
        const data = await response.json();
        if (data.success) {
            console.log('🥇 Download tracked successfully! Total downloads:', data.totalDownloads);
            
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
        }
    } catch (error) {
        console.error('Error tracking download:', error);
        showNotification('Download started! (Tracking failed)', 'info');
    }
}

// Show notification
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
        color: white;
        padding: 15px 20px;
        border-radius: 5px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
    
    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.addEventListener('click', () => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    });
}

// Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', function() {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

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

// Animated Counter for Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start).toLocaleString();
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target.toLocaleString();
        }
    }
    
    updateCounter();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            
            // Animate counters when stats section is visible
            if (entry.target.classList.contains('stat-number')) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
            }
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .step-item, .stat-number').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Back to Top Button
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.particles');
    if (parallax) {
        const speed = scrolled * 0.5;
        parallax.style.transform = `translateY(${speed}px)`;
    }
});

// Button Ripple Effect
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = this.querySelector('.btn-ripple');
        if (ripple) {
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            
            setTimeout(() => {
                ripple.style.transform = 'translate(-50%, -50%) scale(1)';
            }, 10);
            
            setTimeout(() => {
                ripple.style.transform = 'translate(-50%, -50%) scale(0)';
            }, 600);
        }
    });
});

// Download Progress Animation
document.querySelectorAll('.btn-download').forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        const progress = this.querySelector('.download-progress');
        if (progress) {
            progress.style.width = '100%';
        }
    });
    
    btn.addEventListener('mouseleave', function() {
        const progress = this.querySelector('.download-progress');
        if (progress) {
            progress.style.width = '0%';
        }
    });
});

// Feature Card Hover Effects
document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Social Media Icons Animation
document.querySelectorAll('.social-icon').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.1)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Mobile Touch Support
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', function(e) {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could be used for navigation
            console.log('Swipe up detected');
        } else {
            // Swipe down - could be used for navigation
            console.log('Swipe down detected');
        }
    }
}

// Performance Optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations and effects
    const scrolled = window.pageYOffset;
    const navbar = document.querySelector('.navbar');
    
    if (scrolled > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}, 16));

// Keyboard Navigation Support
document.addEventListener('keydown', function(e) {
    // Escape key to close mobile menu
    if (e.key === 'Escape') {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Arrow keys for navigation (optional)
    if (e.key === 'ArrowUp' && e.ctrlKey) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
});

// Preload critical images
function preloadImages() {
    const images = [
        'ic_logo.png'
    ];
    
    images.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize preloading
preloadImages();

// Service Worker Registration (for PWA features)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then(registration => {
                console.log('SW registered: ', registration);
            })
            .catch(registrationError => {
                console.log('SW registration failed: ', registrationError);
            });
    });
}

// Add loading animation to download buttons
document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', function() {
        const originalText = this.querySelector('span').textContent;
        const icon = this.querySelector('i');
        
        // Show loading state
        this.querySelector('span').textContent = 'Downloading...';
        icon.className = 'fas fa-spinner fa-spin';
        
        // Reset after a delay (simulating download)
        setTimeout(() => {
            this.querySelector('span').textContent = originalText;
            icon.className = 'fas fa-download';
        }, 3000);
    });
});

// Add confetti effect for successful actions
function createConfetti() {
    const colors = ['#ff4500', '#e63e00', '#ff6a00', '#ffffff'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        confetti.style.zIndex = '9999';
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
        
        document.body.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Add confetti animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes confettiFall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Trigger confetti on download button click
document.querySelectorAll('a[download]').forEach(link => {
    link.addEventListener('click', () => {
        setTimeout(createConfetti, 1000);
    });
});

// Add vibration feedback for mobile devices
if ('vibrate' in navigator) {
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', () => {
            navigator.vibrate(50);
        });
    });
}

console.log('🥇 Epic Esports - Advanced UI Loaded Successfully!'); 
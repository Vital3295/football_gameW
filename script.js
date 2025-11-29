// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-menu a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add scroll effect to header
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(44, 85, 48, 0.95)';
            header.style.backdropFilter = 'blur(10px)';
        } else {
            header.style.background = 'linear-gradient(135deg, #2c5530, #4a7c59)';
            header.style.backdropFilter = 'none';
        }
    });
    
    // Add click effect to CTA button
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            // Scroll to matches section
            const matchesSection = document.querySelector('#matches');
            if (matchesSection) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = matchesSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Add hover effects to cards
    const cards = document.querySelectorAll('.news-card, .team-card, .match-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
    
    // Add live score simulation (just for demo)
    function updateLiveScores() {
        const matchCards = document.querySelectorAll('.match-card');
        matchCards.forEach((card, index) => {
            if (Math.random() > 0.7) { // 30% chance to show "live" indicator
                const liveIndicator = document.createElement('span');
                liveIndicator.textContent = 'LIVE';
                liveIndicator.style.cssText = `
                    background: #ff0000;
                    color: white;
                    padding: 0.2rem 0.5rem;
                    border-radius: 5px;
                    font-size: 0.7rem;
                    font-weight: bold;
                    animation: pulse 1.5s infinite;
                `;
                
                const matchInfo = card.querySelector('.match-info');
                if (matchInfo && !matchInfo.querySelector('[style*="background: #ff0000"]')) {
                    matchInfo.appendChild(liveIndicator);
                }
            }
        });
    }
    
    // Add CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes pulse {
            0% { opacity: 1; }
            50% { opacity: 0.5; }
            100% { opacity: 1; }
        }
    `;
    document.head.appendChild(style);
    
    // Update scores every 10 seconds (demo)
    setInterval(updateLiveScores, 10000);
    
    // Add current time display
    function updateTime() {
        const now = new Date();
        const timeString = now.toLocaleTimeString('ru-RU');
        
        let timeDisplay = document.querySelector('.current-time');
        if (!timeDisplay) {
            timeDisplay = document.createElement('div');
            timeDisplay.className = 'current-time';
            timeDisplay.style.cssText = `
                position: fixed;
                top: 10px;
                right: 20px;
                background: rgba(0,0,0,0.7);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 20px;
                font-size: 0.9rem;
                z-index: 1001;
            `;
            document.body.appendChild(timeDisplay);
        }
        
        timeDisplay.textContent = timeString;
    }
    
    // Update time every second
    updateTime();
    setInterval(updateTime, 1000);
    
    // Add mobile menu toggle (for future enhancement)
    const navMenu = document.querySelector('.nav-menu');
    if (window.innerWidth <= 768) {
        const menuToggle = document.createElement('button');
        menuToggle.innerHTML = '☰';
        menuToggle.style.cssText = `
            background: none;
            border: none;
            color: white;
            font-size: 1.5rem;
            cursor: pointer;
            display: none;
        `;
        
        const nav = document.querySelector('nav');
        nav.insertBefore(menuToggle, navMenu);
        
        if (window.innerWidth <= 768) {
            menuToggle.style.display = 'block';
            navMenu.style.display = 'none';
            
            menuToggle.addEventListener('click', function() {
                if (navMenu.style.display === 'none') {
                    navMenu.style.display = 'flex';
                    navMenu.style.flexDirection = 'column';
                    navMenu.style.position = 'absolute';
                    navMenu.style.top = '100%';
                    navMenu.style.left = '0';
                    navMenu.style.right = '0';
                    navMenu.style.background = 'rgba(44, 85, 48, 0.95)';
                    navMenu.style.padding = '1rem';
                } else {
                    navMenu.style.display = 'none';
                }
            });
        }
    }
    
    console.log('Футбольный сайт загружен успешно! ⚽');
});
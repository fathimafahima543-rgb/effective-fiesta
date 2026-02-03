// Profile page interactivity
document.addEventListener('DOMContentLoaded', function() {
    // Edit Profile button handler
    const editProfileBtn = document.getElementById('editProfileBtn');
    editProfileBtn.addEventListener('click', function() {
        alert('Edit Profile functionality would be implemented here');
    });

    // Share Profile button handler
    const shareProfileBtn = document.getElementById('shareProfileBtn');
    shareProfileBtn.addEventListener('click', function() {
        if (navigator.share) {
            navigator.share({
                title: 'User Profile',
                text: 'Check out this profile!',
                url: window.location.href
            }).catch(err => console.log('Error sharing:', err));
        } else {
            // Fallback for browsers that don't support Web Share API
            const url = window.location.href;
            navigator.clipboard.writeText(url).then(() => {
                alert('Profile link copied to clipboard!');
            }).catch(err => {
                console.error('Failed to copy:', err);
            });
        }
    });

    // Profile image change handler
    const profileImageContainer = document.querySelector('.profile-image-container');
    profileImageContainer.addEventListener('click', function() {
        alert('Image upload functionality would be implemented here');
    });

    // Add animation to stats on scroll
    const statValues = document.querySelectorAll('.stat-value');
    
    function animateValue(element, start, end, duration) {
        // Clear any existing timer to prevent memory leaks
        if (element.animationTimer) {
            clearInterval(element.animationTimer);
        }
        
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        element.animationTimer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                element.textContent = formatStatValue(end);
                clearInterval(element.animationTimer);
                element.animationTimer = null;
            } else {
                element.textContent = formatStatValue(Math.floor(current));
            }
        }, 16);
    }

    function formatStatValue(value) {
        if (value >= 1000) {
            return (value / 1000).toFixed(1) + 'K';
        }
        return value.toString();
    }

    // Trigger animation on page load
    setTimeout(() => {
        statValues.forEach((stat) => {
            // Parse the original value from the HTML to maintain single source of truth
            const textContent = stat.textContent.trim();
            let targetValue;
            
            if (textContent.endsWith('K')) {
                targetValue = parseFloat(textContent) * 1000;
            } else {
                targetValue = parseInt(textContent, 10);
            }
            
            animateValue(stat, 0, targetValue, 1000);
        });
    }, 300);
});

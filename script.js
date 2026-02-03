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
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if ((increment > 0 && current >= end) || (increment < 0 && current <= end)) {
                element.textContent = formatStatValue(end);
                clearInterval(timer);
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
        const statsData = [127, 1200, 342];
        statValues.forEach((stat, index) => {
            const targetValue = statsData[index];
            animateValue(stat, 0, targetValue, 1000);
        });
    }, 300);
});

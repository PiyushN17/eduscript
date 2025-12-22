// Get DOM elements
let sem = document.getElementById('sem');
let cat = document.getElementById('cat');
let semester = document.getElementById('semester');
let subjects = document.getElementById('subjects');
let subSem = document.getElementById('subSem');
let subSub = document.getElementById('subSub');
let container2 = document.getElementById('container2');
let question = document.getElementById('question');
let diffLevel = document.getElementById('diffLevel');
let firstOpt = document.getElementById('firstOpt');
let secOpt = document.getElementById('secOpt'); 
let thirdOpt = document.getElementById('thirdOpt');
let fourthOpt = document.getElementById('fourthOpt');
let subErr = document.getElementById('subErr');
let points = document.getElementById('points');
let opt1 = document.getElementById('opt1');
let opt2 = document.getElementById('opt2');
let opt3 = document.getElementById('opt3');
let opt4 = document.getElementById('opt4');
let ansSub = document.getElementById('ansSub');
let loader = document.getElementById('loader');

// Progress elements
let progressFill = document.getElementById('progressFill');
let progressText = document.getElementById('progressText');

// State variables
let containArr = [];
let i = 0;
let pts = 0;
let totalQuestions = 0;

// Add ripple effect to buttons
function createRipple(event, button) {
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    `;
    
    button.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Add ripple animation style
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    button {
        position: relative;
        overflow: hidden;
    }
`;
document.head.appendChild(style);

// Semester selection handler
subSem.addEventListener('click', function(e) {
    createRipple(e, subSem);
    
    if(sem.value === '') {
        showNotification('Please select a semester!', 'warning');
    }
    else if(sem.value === '1') {
        // Animate transition
        semester.style.opacity = '0';
        semester.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            subjects.hidden = false;
            semester.hidden = true;
            subjects.style.opacity = '0';
            subjects.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                subjects.style.opacity = '1';
                subjects.style.transform = 'translateY(0)';
            }, 50);
        }, 300);
    }
});

// Subject selection handler
subSub.addEventListener('click', async function(e) {
    createRipple(e, subSub);
    
    if(cat.value === '') {
        showNotification('Please select a subject!', 'warning');
        return;
    }
    
    // URL mapping
    const urlMap = {
        'eng': 'https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/CE/Quiz/Quiz-CE.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBUEkgRGF0YS9CQ0EtMzAxLzFzdCBTZW1lc3Rlci9DRS9RdWl6L1F1aXotQ0UudHh0IiwiaWF0IjoxNzY2MzMwOTk5LCJleHAiOjE3OTc4NjY5OTl9.mo2rVo3vOYJ0iAQznKiEgH33O0cPSThaxqFgcA0fnpE',
        'it': 'https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/IT&A/Quiz/Quiz-IT&A.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBUEkgRGF0YS9CQ0EtMzAxLzFzdCBTZW1lc3Rlci9JVCZBL1F1aXovUXVpei1JVCZBLnR4dCIsImlhdCI6MTc2NjMzMzg3OCwiZXhwIjoxNzk3ODY5ODc4fQ.MloBTqRerDAFDBTq3zhl0Ocxf3FFNrF-Eg8-W9FCP3U',
        'pmo': 'https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/PMO/Quiz/PMO-Quiz.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBUEkgRGF0YS9CQ0EtMzAxLzFzdCBTZW1lc3Rlci9QTU8vUXVpei9QTU8tUXVpei50eHQiLCJpYXQiOjE3NjYzMzQyNDAsImV4cCI6MTc5Nzg3MDI0MH0.QZDuDdivOHpccmHvqf6LRtwuIHLPFzEsKpeAcDJw_lI',
        'pst': 'https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/PST/Quiz/Quiz-PST.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBUEkgRGF0YS9CQ0EtMzAxLzFzdCBTZW1lc3Rlci9QU1QvUXVpei9RdWl6LVBTVC50eHQiLCJpYXQiOjE3NjYzMzQ0ODIsImV4cCI6MTc5Nzg3MDQ4Mn0.zrvo86MmZPGH3MJzGP0PGDp1Uony-VGtFB6-p_vEiOI'
    };
    
    if(urlMap[cat.value]) {
        subjects.hidden = true;
        loader.hidden = false;
        await callQues(urlMap[cat.value]);
    }
});

// Fetch questions from API
async function callQues(URL) {
    try {
        let output = await fetch(URL);
        let textData = await output.text();
        let response = JSON.parse(textData);
        containArr = response;
        totalQuestions = containArr.length;
        
        loader.hidden = true;
        container2.hidden = false;
        
        // Initialize with animation
        container2.style.opacity = '0';
        container2.style.transform = 'scale(0.95)';
        
        setTimeout(() => {
            container2.style.transition = 'all 0.5s ease';
            container2.style.opacity = '1';
            container2.style.transform = 'scale(1)';
        }, 50);
        
        updatePage();
        showNotification('Quiz loaded successfully!', 'success');
    }
    catch(e) {
        loader.hidden = true;
        subErr.innerText = '❌ Error loading questions: ' + e.message;
        subErr.style.display = 'block';
        showNotification('Failed to load quiz!', 'error');
    }
}

// Update page with current question
function updatePage() {
    if (i >= containArr.length || i < 0) {
        showScoreSummary();
        return;
    }
    
    let currentQ = containArr[i];
    
    // Update progress bar
    const progress = ((i) / totalQuestions) * 100;
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `Question ${i + 1} of ${totalQuestions}`;
    
    // Update question with animation
    const questionCard = document.querySelector('.question-card');
    questionCard.style.animation = 'none';
    setTimeout(() => {
        questionCard.style.animation = 'slideIn 0.5s ease';
    }, 10);
    
    // Update question text
    question.innerHTML = `<i class="fas fa-question-circle"></i>Question ${currentQ.id} (${currentQ.subject}): ${currentQ.question}`;
    
    // Update difficulty badge
    const difficultyMap = {
        'Easy': { color: '#10b981', icon: 'fa-signal' },
        'Medium': { color: '#f59e0b', icon: 'fa-signal' },
        'Hard': { color: '#ef4444', icon: 'fa-signal' }
    };
    
    const diff = difficultyMap[currentQ.difficulty] || difficultyMap['Medium'];
    diffLevel.innerHTML = `<i class="fas ${diff.icon}"></i>Difficulty: ${currentQ.difficulty}`;
    diffLevel.style.color = diff.color;
    
    // Update options
    firstOpt.innerText = currentQ.options[0];
    secOpt.innerText = currentQ.options[1];
    thirdOpt.innerText = currentQ.options[2];
    fourthOpt.innerText = currentQ.options[3];
    
    // Update score
    const scoreValue = points.querySelector('.score-value');
    if (scoreValue) {
        scoreValue.textContent = `${pts}/${totalQuestions * 2}`;
    } else {
        points.innerHTML = `
            <div class="score-icon">
                <i class="fas fa-star"></i>
            </div>
            <div class="score-text">
                <span class="score-label">Score</span>
                <span class="score-value">${pts}/${totalQuestions * 2}</span>
            </div>
        `;
    }
    
    resetOptions();
}

// Show score summary at the end
function showScoreSummary() {
    // Complete progress bar
    progressFill.style.width = '100%';
    progressText.textContent = `Quiz Complete!`;
    
    let percentage = (pts / (totalQuestions * 2)) * 100;
    let message = '';
    let emoji = '';
    let color = '';
    
    if (percentage >= 75) {
        message = 'EXCELLENT! Outstanding performance!';
        emoji = '🎉';
        color = '#10b981';
    } else if (percentage >= 58) {
        message = 'GOOD! Well done! Keep practicing!';
        emoji = '👍';
        color = '#f59e0b';
    } else {
        message = 'KEEP GOING! Practice makes perfect!';
        emoji = '📚';
        color = '#ef4444';
    }
    
    // Animate score display
    const scoreValue = points.querySelector('.score-value');
    if (scoreValue) {
        animateValue(scoreValue, 0, pts, 1000);
    }
    
    // Update points display with celebration
    points.innerHTML = `
        <div class="score-icon" style="background: linear-gradient(135deg, ${color}, ${adjustColor(color, -20)});">
            <i class="fas fa-trophy"></i>
        </div>
        <div class="score-text">
            <span class="score-label">Final Score</span>
            <span class="score-value" style="color: ${color}">${pts}/${totalQuestions * 2}</span>
        </div>
    `;
    
    // Disable all options
    opt1.disabled = true;
    opt2.disabled = true;
    opt3.disabled = true;
    opt4.disabled = true;
    ansSub.disabled = true;
    
    // Update question area
    question.innerHTML = `
        <div style="text-align: center; padding: 20px;">
            <div style="font-size: 60px; margin-bottom: 16px;">${emoji}</div>
            <div style="font-size: 24px; font-weight: 700; color: ${color}; margin-bottom: 12px;">${message}</div>
            <div style="font-size: 18px; color: var(--text-muted);">You scored ${percentage.toFixed(0)}%</div>
        </div>
    `;
    
    diffLevel.innerHTML = '';
    
    // Clear options
    firstOpt.innerText = '';
    secOpt.innerText = '';
    thirdOpt.innerText = '';
    fourthOpt.innerText = '';
    
    // Hide option letters
    document.querySelectorAll('.option-letter').forEach(letter => {
        letter.style.display = 'none';
    });
    
    showNotification('Quiz completed!', 'success');
    triggerConfetti();
}

// Reset option styles
function resetOptions() {
    const labels = document.querySelectorAll('.option-label');
    labels.forEach(label => {
        label.classList.remove('correct', 'wrong');
        label.style.pointerEvents = 'auto';
    });
    
    document.querySelectorAll('.option-letter').forEach(letter => {
        letter.style.display = 'flex';
    });
    
    opt1.disabled = false;
    opt2.disabled = false;
    opt3.disabled = false;
    opt4.disabled = false;
    ansSub.disabled = true;
}

// Handle option selection
function handleOptionClick(optionIndex) {
    let currentQ = containArr[i];
    let selectedOption = currentQ.options[optionIndex];
    let correctAnswer = currentQ.correct;
    
    // Disable all options
    opt1.disabled = true;
    opt2.disabled = true;
    opt3.disabled = true;
    opt4.disabled = true;
    ansSub.disabled = false;
    
    // Get all option labels
    const labels = document.querySelectorAll('.option-label');
    
    // Mark correct/wrong
    if (selectedOption === correctAnswer) {
        pts += 2;
        const scoreValue = points.querySelector('.score-value');
        if (scoreValue) {
            scoreValue.textContent = `${pts}/${totalQuestions * 2}`;
            scoreValue.style.animation = 'pulse-score 0.6s ease';
        }
        labels[optionIndex].classList.add('correct');
        playSuccessSound();
    } else {
        labels[optionIndex].classList.add('wrong');
        // Show correct answer
        for (let j = 0; j < 4; j++) {
            if (currentQ.options[j] === correctAnswer) {
                labels[j].classList.add('correct');
                break;
            }
        }
        playErrorSound();
    }
    
    // Disable clicking on options
    labels.forEach(label => {
        label.style.pointerEvents = 'none';
    });
}

// Add event listeners to options
opt1.addEventListener('click', () => handleOptionClick(0));
opt2.addEventListener('click', () => handleOptionClick(1));
opt3.addEventListener('click', () => handleOptionClick(2));
opt4.addEventListener('click', () => handleOptionClick(3));

// Next button handler
ansSub.addEventListener('click', function(e) {
    createRipple(e, ansSub);
    
    i++;
    let selected = document.querySelector("input[name='answer']:checked");
    if (selected) selected.checked = false;
    
    resetOptions();
    updatePage();
});

// Utility Functions

// Show notification
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    const colors = {
        success: '#10b981',
        error: '#ef4444',
        warning: '#f59e0b',
        info: '#3b82f6'
    };
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: white;
        color: ${colors[type]};
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 12px;
        font-weight: 600;
        animation: slideInRight 0.3s ease;
        border-left: 4px solid ${colors[type]};
    `;
    
    notification.innerHTML = `
        <i class="fas ${icons[type]}" style="font-size: 20px;"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add notification animations
const notificationStyle = document.createElement('style');
notificationStyle.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(notificationStyle);

// Animate number counting
function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = `${value}/${totalQuestions * 2}`;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Play success sound
function playSuccessSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.2);
}

// Play error sound
function playErrorSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    oscillator.frequency.value = 200;
    oscillator.type = 'sawtooth';
    
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
    
    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.15);
}

// Adjust color brightness
function adjustColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => 
        ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
    );
}

// Confetti effect
function triggerConfetti() {
    const confettiCount = 50;
    const container = document.querySelector('.content');
    
    for (let i = 0; i < confettiCount; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: 10px;
                height: 10px;
                background: ${['#6366f1', '#22d3ee', '#f59e0b', '#ef4444', '#10b981'][Math.floor(Math.random() * 5)]};
                top: -10px;
                left: ${Math.random() * 100}%;
                opacity: 1;
                border-radius: 50%;
                z-index: 9999;
                animation: fall ${2 + Math.random() * 2}s linear forwards;
            `;
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.remove(), 4000);
        }, i * 30);
    }
}

// Add confetti animation
const confettiStyle = document.createElement('style');
confettiStyle.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(confettiStyle);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (container2.hidden) return;
    
    // Number keys 1-4 for options
    if (e.key >= '1' && e.key <= '4') {
        const optionIndex = parseInt(e.key) - 1;
        const options = [opt1, opt2, opt3, opt4];
        if (!options[optionIndex].disabled) {
            options[optionIndex].checked = true;
            handleOptionClick(optionIndex);
        }
    }
    
    // Enter for next
    if (e.key === 'Enter' && !ansSub.disabled) {
        ansSub.click();
    }
});

// Console welcome message

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

let progressFill = document.getElementById('progressFill');
let progressText = document.getElementById('progressText');

let containArr = [];
let i = 0;
let pts = 0;
let totalQuestions = 0;

subSem.addEventListener('click', function() {
  if(sem.value === '') {
    alert('Please select a semester!');
    return;
  }
  if(sem.value === '1') {
    semester.hidden = true;
    subjects.hidden = false;
  }
});

subSub.addEventListener('click', async function() {
  if(cat.value === '') {
    alert('Please select a subject!');
    return;
  }
  
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

async function callQues(URL) {
  try {
    let output = await fetch(URL);
    let textData = await output.text();
    let response = JSON.parse(textData);
    containArr = response;
    totalQuestions = containArr.length;
    
    loader.hidden = true;
    container2.hidden = false;
    updatePage();
  }
  catch(e) {
    loader.hidden = true;
    subErr.innerText = 'Error loading questions: ' + e.message;
    subErr.style.display = 'block';
  }
}

function updatePage() {
  if (i >= containArr.length || i < 0) {
    showScoreSummary();
    return;
  }
  
  let currentQ = containArr[i];
  
  const progress = ((i) / totalQuestions) * 100;
  progressFill.style.width = `${progress}%`;
  progressText.textContent = `Question ${i + 1} of ${totalQuestions}`;
  
  question.innerHTML = `<i class="fas fa-question-circle"></i>Question ${currentQ.id} (${currentQ.subject}): ${currentQ.question}`;
  
  const difficultyMap = {
    'Easy': '#10b981',
    'Medium': '#f59e0b',
    'Hard': '#ef4444'
  };
  const diff = difficultyMap[currentQ.difficulty] || '#f59e0b';
  diffLevel.innerHTML = `<i class="fas fa-signal"></i>Difficulty: ${currentQ.difficulty}`;
  diffLevel.style.color = diff;
  
  firstOpt.innerText = currentQ.options[0];
  secOpt.innerText = currentQ.options[1];
  thirdOpt.innerText = currentQ.options[2];
  fourthOpt.innerText = currentQ.options[3];
  
  const scoreValue = points.querySelector('.score-value');
  scoreValue.textContent = `${pts}/${totalQuestions * 2}`;
  
  resetOptions();
}

function showScoreSummary() {
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
  
  points.innerHTML = `
    <div class="score-icon" style="background: ${color};">
      <i class="fas fa-trophy"></i>
    </div>
    <div class="score-text">
      <span class="score-label">Final Score</span>
      <span class="score-value" style="color: ${color};">${pts}/${totalQuestions * 2}</span>
    </div>
  `;
  
  opt1.disabled = true;
  opt2.disabled = true;
  opt3.disabled = true;
  opt4.disabled = true;
  ansSub.disabled = true;
  
  question.innerHTML = `
    <div style="text-align: center; padding: 20px;">
      <div style="font-size: 48px; margin-bottom: 12px;">${emoji}</div>
      <div style="font-size: 20px; font-weight: 700; color: ${color}; margin-bottom: 8px;">${message}</div>
      <div style="font-size: 16px; color: var(--text-muted);">You scored ${percentage.toFixed(0)}%</div>
    </div>
  `;
  
  diffLevel.innerHTML = '';
  firstOpt.innerText = '';
  secOpt.innerText = '';
  thirdOpt.innerText = '';
  fourthOpt.innerText = '';
  
  document.querySelectorAll('.option-letter').forEach(letter => {
    letter.style.display = 'none';
  });
}

function resetOptions() {
  const labels = document.querySelectorAll('.option-label');
  labels.forEach(label => {
    label.classList.remove('correct', 'wrong');
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

function handleOptionClick(optionIndex) {
  let currentQ = containArr[i];
  let selectedOption = currentQ.options[optionIndex];
  let correctAnswer = currentQ.correct;
  
  opt1.disabled = true;
  opt2.disabled = true;
  opt3.disabled = true;
  opt4.disabled = true;
  ansSub.disabled = false;
  
  const labels = document.querySelectorAll('.option-label');
  
  if (selectedOption === correctAnswer) {
    pts += 2;
    const scoreValue = points.querySelector('.score-value');
    scoreValue.textContent = `${pts}/${totalQuestions * 2}`;
    labels[optionIndex].classList.add('correct');
  } else {
    labels[optionIndex].classList.add('wrong');
    for (let j = 0; j < 4; j++) {
      if (currentQ.options[j] === correctAnswer) {
        labels[j].classList.add('correct');
        break;
      }
    }
  }
  
  labels.forEach(label => {
    label.style.pointerEvents = 'none';
  });
}

opt1.addEventListener('click', () => handleOptionClick(0));
opt2.addEventListener('click', () => handleOptionClick(1));
opt3.addEventListener('click', () => handleOptionClick(2));
opt4.addEventListener('click', () => handleOptionClick(3));

ansSub.addEventListener('click', function() {
  i++;
  let selected = document.querySelector("input[name='answer']:checked");
  if (selected) selected.checked = false;
  
  resetOptions();
  updatePage();
});

document.addEventListener('keydown', (e) => {
  if (container2.hidden) return;
  
  if (e.key >= '1' && e.key <= '4') {
    const optionIndex = parseInt(e.key) - 1;
    const options = [opt1, opt2, opt3, opt4];
    if (!options[optionIndex].disabled) {
      options[optionIndex].checked = true;
      handleOptionClick(optionIndex);
    }
  }
  
  if (e.key === 'Enter' && !ansSub.disabled) {
    ansSub.click();
  }
});

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

let containArr = [];
let i = 0;
let pts = 0;
let totalQuestions = 0;

subSem.addEventListener('click', function() {
    semester.hidden = true;
    if(sem.value === '1') {
        subjects.hidden = false;
    }
});

subSub.addEventListener('click', async function() {
    if(cat.value === 'eng') {
        subjects.hidden = true;
        let engURL = 'https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/CE/Quiz/Quiz-CE.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBUEkgRGF0YS9CQ0EtMzAxLzFzdCBTZW1lc3Rlci9DRS9RdWl6L1F1aXotQ0UudHh0IiwiaWF0IjoxNzY2MzMwOTk5LCJleHAiOjE3OTc4NjY5OTl9.mo2rVo3vOYJ0iAQznKiEgH33O0cPSThaxqFgcA0fnpE';
        await callQues(engURL);
    }
    else if(cat.value === 'it') {
        subjects.hidden = true;
        let itURL = 'https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/IT&A/Quiz/Quiz-IT&A.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBUEkgRGF0YS9CQ0EtMzAxLzFzdCBTZW1lc3Rlci9JVCZBL1F1aXovUXVpei1JVCZBLnR4dCIsImlhdCI6MTc2NjMzMzg3OCwiZXhwIjoxNzk3ODY5ODc4fQ.MloBTqRerDAFDBTq3zhl0Ocxf3FFNrF-Eg8-W9FCP3U';
        await callQues(itURL);
    }
    else if(cat.value === 'pmo') {
        subjects.hidden = true;
        let pmoURL = 'https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/PMO/Quiz/PMO-Quiz.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBUEkgRGF0YS9CQ0EtMzAxLzFzdCBTZW1lc3Rlci9QTU8vUXVpei9QTU8tUXVpei50eHQiLCJpYXQiOjE3NjYzMzQyNDAsImV4cCI6MTc5Nzg3MDI0MH0.QZDuDdivOHpccmHvqf6LRtwuIHLPFzEsKpeAcDJw_lI';
        await callQues(pmoURL);
    }
    else if(cat.value === 'pst') {
        subjects.hidden = true;
        let pstURL = 'https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/PST/Quiz/Quiz-PST.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBUEkgRGF0YS9CQ0EtMzAxLzFzdCBTZW1lc3Rlci9QU1QvUXVpei9RdWl6LVBTVC50eHQiLCJpYXQiOjE3NjYzMzQ0ODIsImV4cCI6MTc5Nzg3MDQ4Mn0.zrvo86MmZPGH3MJzGP0PGDp1Uony-VGtFB6-p_vEiOI';
        await callQues(pstURL);
    }
});

async function callQues(URL) {
    try {
        let output = await fetch(URL);
        let textData = await output.text();
        let response = JSON.parse(textData);
        containArr = response;
        totalQuestions = containArr.length;
        container2.hidden = false;
        updatePage();
    }
    catch(e) {
        subErr.innerText = e.message;
    }
}

function updatePage() {
    if (i >= containArr.length || i < 0) {
        showScoreSummary();
        return;
    }
    let currentQ = containArr[i];
    question.innerText = `Question ${currentQ.id} (${currentQ.subject}): ${currentQ.question}`;
    diffLevel.innerText = `Difficulty: ${currentQ.difficulty}`;
    firstOpt.innerText = currentQ.options[0];
    secOpt.innerText = currentQ.options[1];
    thirdOpt.innerText = currentQ.options[2];
    fourthOpt.innerText = currentQ.options[3];
    points.innerText = `Score: ${pts}/${totalQuestions * 2}`;
    resetOptions();
}

function showScoreSummary() {
    let percentage = (pts / (totalQuestions * 2)) * 100;
    let message = '';
    
    if (percentage >= 75) { // Above 45/60
        message = `🎉 EXCELLENT! ${percentage.toFixed(0)}% - Outstanding performance!`;
        points.innerHTML = `<span style="color: #28a745; font-size: 24px;">${pts}/${totalQuestions * 2} (${percentage.toFixed(0)}%)</span><br><br>${message}`;
    } else if (percentage >= 58) { // Above 35/60  
        message = `👍 GOOD! ${percentage.toFixed(0)}% - Well done! Keep practicing!`;
        points.innerHTML = `<span style="color: #ffc107; font-size: 24px;">${pts}/${totalQuestions * 2} (${percentage.toFixed(0)}%)</span><br><br>${message}`;
    } else {
        message = `📚 KEEP GOING! ${percentage.toFixed(0)}% - Practice makes perfect!`;
        points.innerHTML = `<span style="color: #dc3545; font-size: 24px;">${pts}/${totalQuestions * 2} (${percentage.toFixed(0)}%)</span><br><br>${message}`;
    }
    
    opt1.disabled = true;
    opt2.disabled = true;
    opt3.disabled = true;
    opt4.disabled = true;
    ansSub.disabled = true;
    question.innerText = 'Quiz Complete! 🎊';
    diffLevel.innerText = '';
    firstOpt.innerText = '';
    secOpt.innerText = '';
    thirdOpt.innerText = '';
    fourthOpt.innerText = '';
}

function resetOptions() {
    firstOpt.style.color = 'black';
    secOpt.style.color = 'black';
    thirdOpt.style.color = 'black';
    fourthOpt.style.color = 'black';
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
    
    if (selectedOption === correctAnswer) {
        pts += 2;
        points.innerText = `Score: ${pts}/${totalQuestions * 2}`;
        setOptionColor(optionIndex, 'green');
    } else {
        setOptionColor(optionIndex, 'red');
        for (let j = 0; j < 4; j++) {
            if (currentQ.options[j] === correctAnswer) {
                setOptionColor(j, 'green');
                break;
            }
        }
    }
}

function setOptionColor(index, color) {
    if (index === 0) firstOpt.style.color = color;
    if (index === 1) secOpt.style.color = color;
    if (index === 2) thirdOpt.style.color = color;
    if (index === 3) fourthOpt.style.color = color;
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

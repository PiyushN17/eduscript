let course = document.getElementById('course');
let semester = document.getElementById('semester');
let marks = document.getElementById('marks');
let submitBtn = document.getElementById('submitBtn');
let error = document.getElementById('error');
let container = document.getElementById('container');
let sem1 = document.getElementById('sem1');
let comEng = document.getElementById('comEng');
let it = document.getElementById('it');
let pmo = document.getElementById('pmo');
let pst = document.getElementById('pst');
let pager = document.getElementById('pager');
let selector = document.getElementById('selector');
let contentShow = document.getElementById('contentShow');
let quesText = document.getElementById('quesText');
let quesMarks = document.getElementById('quesMarks');
let quesImp = document.getElementById('quesImp');
let quesProb = document.getElementById('quesProb');
let quesSub = document.getElementById('quesSub');
let quesCour = document.getElementById('quesCour');
let quesP1 = document.getElementById('quesP1');
let quesPrev = document.getElementById('quesPrev');
let loader = document.getElementById('loader');

const page = document.getElementById("page");
const ques = document.getElementById("ques");
const ans = document.getElementById("ans");
const quesBack = document.getElementById("quesBack");
const ansBack = document.getElementById("ansBack");
const textMeasurer = document.getElementById("textMeasurer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageIndicator = document.getElementById("pageIndicator");
const nextQues = document.getElementById('nextQues');

let i = 0;
let API_URL = '';
let currentPage = 1;
let apiData = null;
let containArr = [];
let totalPages = 0;
let pageContents = [];

let engShort = 'https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/CE/CE-2Marks.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBUEkgRGF0YS9CQ0EtMzAxLzFzdCBTZW1lc3Rlci9DRS9DRS0yTWFya3MudHh0IiwiaWF0IjoxNzY2MzA3NDcyLCJleHAiOjE3OTc4NDM0NzJ9.EuzpU3_CXX7xdmIN9yx-ZSV8hwqehm01Qqob5JLdKB0';
let engMedShort = 'https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/CE/CE-4Marks.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBUEkgRGF0YS9CQ0EtMzAxLzFzdCBTZW1lc3Rlci9DRS9DRS00TWFya3MudHh0IiwiaWF0IjoxNzY2MzIzMDI0LCJleHAiOjE3OTc4NTkwMjR9.OZhjULFNNFkzq0-x3pE_6PiBwt-NVrrgyomN5xJdkyQ';
let engLong = 'https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/CE/CE-12Marks.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBUEkgRGF0YS9CQ0EtMzAxLzFzdCBTZW1lc3Rlci9DRS9DRS0xMk1hcmtzLnR4dCIsImlhdCI6MTc2NjMyNTIxMSwiZXhwIjoxNzk3ODYxMjExfQ.fOFV55mp5XB_6HgJvcLGY15IdhPWnI06aafS2r96zZM';
let pmoShort = 'https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/PMO/PMO-2Marks.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBUEkgRGF0YS9CQ0EtMzAxLzFzdCBTZW1lc3Rlci9QTU8vUE1PLTJNYXJrcy50eHQiLCJpYXQiOjE3NjYzMzQyMDEsImV4cCI6MTc5Nzg3MDIwMX0.netjVlBTZbWtLsEUKsiuvsY_ggZVTb24YREIJL6n7hI';
let pmoMedShort = 'https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/PMO/PMO-4Marks.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBUEkgRGF0YS9CQ0EtMzAxLzFzdCBTZW1lc3Rlci9QTU8vUE1PLTRNYXJrcy50eHQiLCJpYXQiOjE3NjYzMzQyMjAsImV4cCI6MTc5Nzg3MDIyMH0.pF1X0A1hg361-xYMB-tepnLCv6p49lMoHjEEGNNT73E';
let pmoLong = 'https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/PMO/PMO-12Marks.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBUEkgRGF0YS9CQ0EtMzAxLzFzdCBTZW1lc3Rlci9QTU8vUE1PLTEyTWFya3MudHh0IiwiaWF0IjoxNzY2MzM0MTg1LCJleHAiOjE3OTc4NzAxODV9.o9iyuI3V9VoTdhSvcpAkrEoUgVU4soJvhDQB6jE_Dms';
let pstShort = 'https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/PST/PST-2Marks.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBUEkgRGF0YS9CQ0EtMzAxLzFzdCBTZW1lc3Rlci9QU1QvUFNULTJNYXJrcy50eHQiLCJpYXQiOjE3NjYzODExOTYsImV4cCI6MTc5NzkxNzE5Nn0.ofg6Evb4ORhXih5p4uZcuiWrVKwDttA8vkbIVRf7SEs';
let pstMedShort = 'https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/PST/PST-4Marks.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBUEkgRGF0YS9CQ0EtMzAxLzFzdCBTZW1lc3Rlci9QU1QvUFNULTRNYXJrcy50eHQiLCJpYXQiOjE3NjYzODEyMDksImV4cCI6MTc5NzkxNzIwOX0.NbYsxJ7PVbnqO6s1zIFkotvziwLLRBaqvv62X89XRL8';
let pstLong = 'https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/PST/PST-12Marks.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBUEkgRGF0YS9CQ0EtMzAxLzFzdCBTZW1lc3Rlci9QU1QvUFNULTEyTWFya3MudHh0IiwiaWF0IjoxNzY2MzgxMTg0LCJleHAiOjE3OTc5MTcxODR9.2kGRmzCnUYFyTyAfc0Dbzf0g4bMWXcEvior5zWsNd3M';
let itShort = 'https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/IT&A/IT&A-2Marks.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBUEkgRGF0YS9CQ0EtMzAxLzFzdCBTZW1lc3Rlci9JVCZBL0lUJkEtMk1hcmtzLnR4dCIsImlhdCI6MTc2NjMwNzU2MywiZXhwIjoxNzk3ODQzNTYzfQ.IQ7lygpoVJKmbDFsMIYlMPWLSn-CpQQtUogj5HsA5m4';
let itMedShort = 'https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/IT&A/IT&A-4Marks.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBUEkgRGF0YS9CQ0EtMzAxLzFzdCBTZW1lc3Rlci9JVCZBL0lUJkEtNE1hcmtzLnR4dCIsImlhdCI6MTc2NjMwNzU3MiwiZXhwIjoxNzk3ODQzNTcyfQ.iKT3-M2yJDD6H8mrseUhlkt-wUmgcGkcKuGDvh0Ow3k';
let itLong = 'https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/IT&A/IT&A-12Marks.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBUEkgRGF0YS9CQ0EtMzAxLzFzdCBTZW1lc3Rlci9JVCZBL0lUJkEtMTJNYXJrcy50eHQiLCJpYXQiOjE3NjYzMjM5NTQsImV4cCI6MTc5Nzg1OTk1NH0.ju_nH_GuRWBVcFzvHoJ_xlfw1aAnx8D6xtB6YUYchXw';
page.style.display = 'none';

submitBtn.addEventListener('click', function() {
    contentShow.hidden = true;
    pager.hidden = true;
    
    if (course.value === '' || semester.value === '' || marks.value === '') {
        error.innerText = 'Please select all required fields!';
    } else {
        error.innerText = '';
        container.hidden = false;
        if (course.value === 'bca' && semester.value === '1') {
            sem1.hidden = false;
        }
    }
});

function getApiUrl(subjectId, marksVal) {
    if (course.value !== 'bca' || semester.value !== '1') return '';
    
    if (subjectId === 'comEng') {
        if (marksVal === 'short') return engShort;
        if (marksVal === 'mshort') return engMedShort;
        if (marksVal === 'long') return engLong;
    } else if (subjectId === 'pmo') {
        if (marksVal === 'short') return pmoShort;
        if (marksVal === 'mshort') return pmoMedShort;
        if (marksVal === 'long') return pmoLong;
    } else if (subjectId === 'pst') {
        if (marksVal === 'short') return pstShort;
        if (marksVal === 'mshort') return pstMedShort;
        if (marksVal === 'long') return pstLong;
    } else if (subjectId === 'it') {
        if (marksVal === 'short') return itShort;
        if (marksVal === 'mshort') return itMedShort;
        if (marksVal === 'long') return itLong;
    }
    return '';
}

function handleStartButton(subjectId) {
    if (course.value === '' || semester.value === '' || marks.value === '') {
        error.innerText = 'Please select course, semester, and marks first!';
        return;
    }
    
    const apiUrl = getApiUrl(subjectId, marks.value);
    if (!apiUrl) {
        error.innerText = 'API not available for this combination!';
        return;
    }
    
    API_URL = apiUrl;
    container.hidden = true;
    selector.hidden = true;
    contentShow.hidden = false;
    loader.hidden = false;
    pager.hidden = true;
    i = 0;
    fetchUse();
}

comEng.addEventListener('click', function() {
    loader.hidden = false;
    page.style.display = 'flex';
    handleStartButton('comEng');
});

it.addEventListener('click', function() {
  loader.hidden = false;
  page.style.display = 'flex';
    handleStartButton('it');
});

pmo.addEventListener('click', function() {
  loader.hidden = false;
  page.style.display = 'flex';
    handleStartButton('pmo');
});

pst.addEventListener('click', function() {
  loader.hidden = false;
  page.style.display = 'flex';
    handleStartButton('pst');
});

function measureTextFit(fullText, maxHeight) {
    textMeasurer.textContent = fullText;
    if (textMeasurer.scrollHeight <= maxHeight) return [fullText, ""];
    
    let words = fullText.split(' ');
    let fittingText = '';
    textMeasurer.textContent = '';
    
    for (let word of words) {
        let testText = fittingText ? fittingText + ' ' + word : word;
        textMeasurer.textContent = testText;
        if (textMeasurer.scrollHeight > maxHeight) break;
        fittingText = testText;
    }
    
    return [fittingText, fullText.slice(fittingText.length + 1)];
}

function splitIntoPages(questionText, solutionText) {
    const maxAnsHeight = 400;
    const maxOtherHeight = 480;
    
    pageContents = [];
    
    let [page1Ans, remaining] = measureTextFit(solutionText, maxAnsHeight);
    pageContents.push({ ques: questionText, ans: page1Ans });
    
    while (remaining.trim()) {
        let [pageAns, newRemaining] = measureTextFit(remaining, maxOtherHeight);
        pageContents.push({ ques: "", ans: pageAns });
        remaining = newRemaining;
    }
    
    totalPages = pageContents.length;
}

nextQues.addEventListener('click', function() {
    if (i + 1 < containArr.length) {
        i++;
        apiData = containArr[i];
        currentPage = 1;
        const fullSolution = apiData.content.page1 + " " + 
                           (apiData.content.page2 || "") + " " + 
                           (apiData.content.page3 || "") + " " + 
                           (apiData.content.page4 || "");
        splitIntoPages(apiData.question, fullSolution);
        renderPages();
        updateControls();
        updateQuesControls();
    }
});

quesPrev.addEventListener('click', function() {
    if (i > 0) {
        i--;
        apiData = containArr[i];
        currentPage = 1;
        const fullSolution = apiData.content.page1 + " " + 
                           (apiData.content.page2 || "") + " " + 
                           (apiData.content.page3 || "") + " " + 
                           (apiData.content.page4 || "");
        splitIntoPages(apiData.question, fullSolution);
        renderPages();
        updateQuesControls();
    }
});

async function fetchUse() {
    try {
        let output = await fetch(API_URL);
        let response = await output.json();
        containArr = [];
        for (let arr of response) {
            containArr.push(arr);
        }
        apiData = containArr[i];
        const fullSolution = apiData.content.page1 + " " + 
                           (apiData.content.page2 || "") + " " + 
                           (apiData.content.page3 || "") + " " + 
                           (apiData.content.page4 || "");
        splitIntoPages(apiData.question, fullSolution);
        
        renderPages();
        updateControls();
        updateQuesControls();
    } catch (error) {
        console.error('API error:', error);
        error.innerText = 'Error loading questions. Please try again.';
        loader.hidden = true;
    }
}

function renderPages() {
    loader.hidden = true;
    pager.hidden = false;
    
    if (!pageContents.length) return;
    
    const currentContent = pageContents[currentPage - 1];
    const isBackSide = currentPage % 2 === 0;
    
    quesText.innerText = `Question ${containArr[i].id}: ${containArr[i].question}`;
    quesMarks.innerText = `Marks: ${containArr[i].marks}`;
    quesImp.innerText = `Importance: ${containArr[i].importance}`;
    quesProb.innerText = `Probability (Exam): ${containArr[i].probability}`;
    quesSub.innerText = `Subject: ${containArr[i].subject}`;
    quesCour.innerText = `Course: ${containArr[i].course}`;
    
    if (containArr[i].content.page1 && containArr[i].content.page2 && containArr[i].content.page3 && containArr[i].content.page4) {
        quesP1.innerText = `Answer: ${containArr[i].content.page1}\n\n${containArr[i].content.page2}\n\n${containArr[i].content.page3}\n\n${containArr[i].content.page4}`;
    } else if (containArr[i].content.page1 && containArr[i].content.page2) {
        quesP1.innerText = `Answer: ${containArr[i].content.page1}\n\n${containArr[i].content.page2}`;
    } else if (containArr[i].content.page1) {
        quesP1.innerText = `Answer: ${containArr[i].content.page1}`;
    }
    
    if (isBackSide) {
        ques.innerText = "";
        ans.innerText = "";
        quesBack.innerText = currentContent.ques;
        ansBack.innerText = currentContent.ans;
    } else {
        ques.innerText = currentContent.ques;
        ans.innerText = currentContent.ans;
        quesBack.innerText = "";
        ansBack.innerText = "";
    }
    
    page.classList.toggle("flipped", isBackSide);
    page.classList.toggle("page-first", currentPage === 1);
    
    pageIndicator.textContent = `Page ${currentPage} / ${totalPages}`;
}

function updateControls() {
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
}

function updateQuesControls() {
    quesPrev.disabled = i === 0;
    nextQues.disabled = i === containArr.length - 1;
}

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        page.classList.remove("flipped");
        page.classList.add("flipped-back");
        setTimeout(() => {
            currentPage--;
            renderPages();
            page.classList.remove("flipped-back");
            updateControls();
        }, 150);
    }
});

nextBtn.addEventListener("click", () => {
    if (currentPage < totalPages) {
        currentPage++;
        renderPages();
        updateControls();
    }
});
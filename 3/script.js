let selectedApiUrl = "";
let timerInterval = null;
let remainingTime = 3 * 60 * 60;

const pageCourse = document.getElementById("pageCourse");
const pageSemester = document.getElementById("pageSemester");
const pageSubject = document.getElementById("pageSubject");
const popup = document.getElementById("popup");
const examPaper = document.getElementById("examPaper");

const courseSelect = document.getElementById("course");
const semesterSelect = document.getElementById("semester");
const subjectSelect = document.getElementById("subject");

const toSemesterBtn = document.getElementById("toSemester");
const toSubjectBtn = document.getElementById("toSubject");
const openPopupBtn = document.getElementById("openPopup");

const agreeCheckbox = document.getElementById("agree");
const startExamBtn = document.getElementById("startExamBtn");

const timerBar = document.getElementById("timerBar");
const timerText = document.getElementById("timer");


const paperHeader = document.getElementById("paperHeader");
const instructionsBox = document.getElementById("instructions");
const questionsBox = document.getElementById("questions");
const showSolutionBtn = document.getElementById("showSolution");

toSemesterBtn.addEventListener("click", () => {
  if (!courseSelect.value) {
    courseSelect.focus();
    return;
  }
  pageCourse.hidden = true;
  pageSemester.hidden = false;
});

toSubjectBtn.addEventListener("click", () => {
  if (!semesterSelect.value) {
    semesterSelect.focus();
    return;
  }
  pageSemester.hidden = true;
  pageSubject.hidden = false;
});

openPopupBtn.addEventListener("click", handleSubjectSelection);

function handleSubjectSelection() {
  const selectedSubject = subjectSelect.value;

  if (!selectedSubject) {
    subjectSelect.focus();
    return;
  }

  switch (selectedSubject) {
    case "ce":
      selectedApiUrl = "https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/CE/Exam/Exam-CE.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBUEkgRGF0YS9CQ0EtMzAxLzFzdCBTZW1lc3Rlci9DRS9FeGFtL0V4YW0tQ0UudHh0IiwiaWF0IjoxNzY2NTc2MjM5LCJleHAiOjE3OTgxMTIyMzl9.XH21fNy1zTYzMdW7bHIbFt0WrUA7R8HiwUnHZZ2k7KI";
      break;

    case "ita":
      selectedApiUrl = "https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/IT&A/Exam/Exam-IT&A.txt?token=YOUR_TOKEN";
      break;

    case "pmo":
      selectedApiUrl = "https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/PMO/Exam/Exam-PMO.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBUEkgRGF0YS9CQ0EtMzAxLzFzdCBTZW1lc3Rlci9QTU8vRXhhbS9FeGFtLVBNTy50eHQiLCJpYXQiOjE3NjYzODM0MzIsImV4cCI6MTc5NzkxOTQzMn0.gjsJEwaEPi-UUH1od673fS-N0fj_qtxwFeC4nKujObA";
      break;

    case "pst":
      selectedApiUrl = "https://pebrrhnnhjgkwhxbyunt.supabase.co/storage/v1/object/sign/API%20Data/BCA-301/1st%20Semester/PST/Exam/Exam-PST.txt?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV81MmZjNTBiYy0zNDI2LTQzZTYtYThkNy0zNDgxMDU2OWE5M2IiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJBUEkgRGF0YS9CQ0EtMzAxLzFzdCBTZW1lc3Rlci9QU1QvRXhhbS9FeGFtLVBTVC50eHQiLCJpYXQiOjE3NjYzNDQ0NjksImV4cCI6MTc5Nzg4MDQ2OX0.evYnZAmW14NxzKI_Eizl72RiDTQdD2EfsKurSfjXI-o";
      break;

    default:
      return;
  }

  popup.style.display = "flex";
}

agreeCheckbox.addEventListener("change", () => {
  startExamBtn.disabled = !agreeCheckbox.checked;
});

startExamBtn.addEventListener("click", async () => {
  popup.style.display = "none";
  pageSubject.hidden = true;
  timerBar.style.display = "block";

  startTimer();
  await loadExamPaper();
});

function startTimer() {
  updateTimerUI();

  timerInterval = setInterval(() => {
    remainingTime--;
    updateTimerUI();

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
    }
  }, 1000);
}

function updateTimerUI() {
  const h = String(Math.floor(remainingTime / 3600)).padStart(2, "0");
  const m = String(Math.floor((remainingTime % 3600) / 60)).padStart(2, "0");
  const s = String(remainingTime % 60).padStart(2, "0");

  timerText.innerText = `${h}:${m}:${s}`;
}

async function loadExamPaper() {
  try {
    const res = await fetch(selectedApiUrl);
    const text = await res.text();
    const data = JSON.parse(text)[0];

    renderHeader(data);
    renderInstructions(data.instructions);
    renderQuestions(data.questions);

    examPaper.hidden = false;
  } catch (e) {
    console.log(e);
  }
}

function renderHeader(data) {
  paperHeader.innerHTML = `
    <h2>${data.subject}</h2>
    <p>Set: ${data.set} | Code: ${data.code}</p>
    <p>Full Marks: ${data.fullMarks} | Time: ${data.time}</p>
  `;
}

function renderInstructions(instructions) {
  let html = "<ol>";
  instructions.forEach(i => {
    html += `<li>${i}</li>`;
  });
  html += "</ol>";
  instructionsBox.innerHTML = html;
}

function renderQuestions(questions) {
  questionsBox.innerHTML = "";

  questions.forEach(q => {
    const div = document.createElement("div");
    div.className = "question";

    let inner = `<h4>Q${q.qno}. ${q.question || ""}</h4>`;
    if (q.type) inner += `<p class="marks">${q.type} (${q.marks})</p>`;

    if (q.subquestions) {
      q.subquestions.forEach(sq => {
        inner += `
          <p><strong>(${sq.part})</strong> ${sq.question} <span class="marks">[${sq.marks} Marks]</span></p>
        `;
      });
    }

    div.innerHTML = inner;
    questionsBox.appendChild(div);
  });
}



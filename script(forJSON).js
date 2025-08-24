fetch("https://ziptripp.github.io/7pi_data/data.json")
.then(res => res.json())
.then(data => {
    container = data;

    // generate the content after container is ready
    boxContainer.innerHTML = generateSubjectHTML(selectContainer.value);
})




// old Format from previous app.js file
const selectContainer = document.querySelector("select");
const boxContainer = document.querySelector('.box');

function generateSubjectHTML(subjectCategory) {
  const selectedSubjects = subjectCategory === "All"
    ? Object.entries(container)
    : [[subjectCategory, container[subjectCategory]]];

  return selectedSubjects.map(([subject, topics]) => {
    if (!Array.isArray(topics)) return ''; // <-- ✅ Defensive check

    const topicsHTML = topics
      .filter(item => item && item.topic) // skip invalid topic entries
      .map(({ topic, fileLink = "#", quizLink = "#", examLink = "#", isNew=false }) => {
        return `
          <div class="topic">
            <p>${topic} ${isNew ? `<span class="new-badge">New</span>`: ' '} </p>
            <div class="topic-links">
              <a href="${fileLink}" target="_blank" rel="noopener noreferrer">Notes/Questions</a>
              <a href="${quizLink}" target="_blank" rel="noopener noreferrer">Quiz</a>
              <a href="${examLink}" target="_blank" rel="noopener noreferrer">Video</a>
            </div>
          </div>
          <hr>
        `;
      }).join("");

    return `
      <div class="subject-container">
        <h3>${subject}</h3>
        <div class="topics-container">
          <hr class="hr-top">
          ${topicsHTML}
        </div>
      </div>
    `;
  }).join("");
}


selectContainer.addEventListener("change", () => {
    
    boxContainer.innerHTML = generateSubjectHTML(selectContainer.value);
});

// window.addEventListener("DOMContentLoaded", ()=> {
//   boxContainer.innerHTML = generateSubjectHTML(selectContainer.value);
// });


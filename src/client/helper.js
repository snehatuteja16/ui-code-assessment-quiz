export function getQuestions(){
  const url = 'http://localhost:4000/api/questions';
  return fetch(url).then(res => {
   return res.json();
  });
}

export function getRandomQues(quesSet){
  const index = Math.floor(Math.random()*quesSet.length);
  const selectedQues = quesSet[index];
  quesSet.splice(index, 1);  // splicing the question from the set so it would not be repeated
  return [selectedQues, quesSet]
}

export function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
}

export function getPercent(right, wrong) {
  return right+wrong > 0 ? `${(right / (right + wrong) * 100).toFixed(2)}%` : '0 questions answered';
}

export function formatQuestion(question) {
  //formatting the question text, formatting unicode characters
  return question
         .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#039;/g, "'");
}

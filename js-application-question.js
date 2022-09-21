const header = document.getElementById('head');
const textContent = document.getElementById('text');
const startButton = document.getElementById('start-button');

startButton.addEventListener('click', () => {
  header.textContent = '取得中';
  textContent.textContent = '少々お待ちください';
  fetch('https://opentdb.com/api.php?amount=10', {method: 'GET'})
  .then(Response => {
    if(Response.ok){
      Response.text().then(text => {
        console.log(text);
        header.textContent = '問題１';
        textContent.innerHTML = text;
      })
    } else {
      throw 'Error';
    }
  })
  .catch((e) => {
    console.log(e);
  });
});



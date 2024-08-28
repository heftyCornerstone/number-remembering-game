/*
1. 숫자를 기억하고 맞추는 숫자 기억 게임을 만듭니다.
2. 시작 버튼 클릭 시 1000 ~ 9999의 숫자가 무작위로 나타납니다. 이때, **3초 뒤에 숫자가 다시 사라집니다**.
3. 사용자가 숫자를 입력하고, 제출 버튼을 통해 정답 유무를 확인합니다.
    1. 정답 시 “정답입니다!”를 노출합니다.
    2. 오답 시 “오답입니다. 정답은 [정답숫자]입니다.”를 노출합니다.
    4. (선택 사항) CSS로 간단한 스타일을 적용합니다.
    5. (선택 사항) 사용자 경험을 향상시키기 위한 기능을 추가합니다. (e.g. 남은 시간초 노출, 텍스트 입력 시 안내 문구 노출, 점수 표시 등)
*/

const appearingNum = document.getElementsByClassName('appearing-number')[0];
const enteredNum = document.getElementsByClassName('enteredNum')[0];
const gameStartBtn = document.getElementsByClassName('game-start')[0];
const submitNumBtn = document.getElementsByClassName('submit-number')[0];
const showAnswer = document.getElementsByClassName('showAnswer')[0];
const form = document.getElementsByClassName('game-form')[0];

class genNumber{
    constructor(randomNum) {
        this._randomNum = undefined;
    }
    setRandomNum(){
        this.randomNum = Math.floor(Math.random()*1000);
    }
    getRandomNum(){
        return this.randomNum
    }
}

function eventListenerSetter(){
    const gameNumber = new genNumber();

    function inputModeSwitcher(state){
        if(state=='ready'){
            enteredNum.disabled=true; 
            appearingNum.innerHTML = 'Ready...'; 
            enteredNum.placeholder='시작해주세요';
            gameStartBtn.disabled = false;
            submitNumBtn.disabled = true;
            enteredNum.value = '';
        } else if('go'){
            enteredNum.disabled=false; 
            appearingNum.innerHTML = '이제 그만!'; 
            enteredNum.placeholder='숫자를 입력해주세요';
            submitNumBtn.disabled = false;
        } else{
            console.log('inputModeSwitcher : 잘못된 state값이 입력되었습니다');
        }
    }

    function duringCounting(){
        enteredNum.placeholder = '3초전';
        showAnswer.innerHTML = '정답이 여기에 표시됩니다';
        gameStartBtn.disabled = true;
    }
    
    function showNumForSecs(sec){
        gameNumber.setRandomNum();
        appearingNum.innerHTML = gameNumber.getRandomNum();
        duringCounting();
        setTimeout(()=>{inputModeSwitcher('go')},sec*1000);
    }
    
    function onSubmit(e){
        const entered = Number(e.target.enteredNum.value);
        const answer = gameNumber.getRandomNum();
        (entered===answer) ? showAnswer.innerHTML='정답입니다!' : showAnswer.innerHTML=`오답입니다. 정답은 ${answer}입니다.`;
        inputModeSwitcher('ready');
    }
    
    gameStartBtn.addEventListener('click', ()=>{showNumForSecs(3)});
    form.addEventListener('submit', (e)=>{e.preventDefault(); onSubmit(e);});
}

eventListenerSetter();
let currentQuestion = 0;

let score = 0;

// 問題をランダム化
questions.sort(() => Math.random() - 0.5);

// ランダムに10問選ぶ
const quizQuestions =
  questions.slice(0, 10);

// =======================
// 問題表示
// =======================

function showQuestion() {

  const q =
    quizQuestions[currentQuestion];

  // 問題番号
  document.getElementById(
    "question-number"
  ).textContent =
    `第${currentQuestion + 1}問`;

  // 問題画像
  document.getElementById(
    "quiz-image"
  ).src = q.questionImage;

  // 結果表示リセット
  const result =
    document.getElementById(
      "result"
    );

  result.textContent = "";

  result.className = "";

  document.getElementById(
  "next-area"
).innerHTML = "";

  // 選択肢エリア
  const choicesDiv =
    document.getElementById(
      "choices"
    );

  choicesDiv.innerHTML = "";

  const letters =
    ["A", "B", "C", "D"];

  // 選択肢生成
  q.choices.forEach((choice, index) => {

    const button =
      document.createElement("button");

    button.className =
      "choice-btn";

    button.textContent =
      `${letters[index]}. ${choice}`;

    button.onclick = () => {
      checkAnswer(index);
    };

    choicesDiv.appendChild(button);
  });
}

// =======================
// 回答チェック
// =======================

function checkAnswer(selected) {

  const q =
    quizQuestions[currentQuestion];

  const result =
    document.getElementById(
      "result"
    );

  // 正誤判定
  if (selected === q.answer) {

    score++;

    result.innerHTML =
      "⭕ 正解！";

    result.className =
      "correct";

  } else {

    result.innerHTML =
      "❌ 不正解…";

    result.className =
      "wrong";
  }

  // 元画像表示
  document.getElementById(
    "quiz-image"
  ).src = q.answerImage;

  // 全ボタン取得
  const buttons =
    document.querySelectorAll(
      ".choice-btn"
    );

  // ボタン色変更
  buttons.forEach((button, index) => {

    // 押せなくする
    button.disabled = true;

    // 正解
    if (index === q.answer) {

      button.style.background =
        "#00aa55";
    }

    // 間違えて押したやつ
    else if (
      index === selected
    ) {

      button.style.background =
        "#cc3333";
    }
  });

  // 次へボタン生成
  const nextButton =
    document.createElement("button");

  nextButton.textContent =
    "次の問題へ";

  nextButton.className =
    "restart-btn";

  nextButton.onclick = () => {

    currentQuestion++;

    if (
      currentQuestion >=
      quizQuestions.length
    ) {

      showFinalResult();

    } else {

      showQuestion();
    }
  };

  // result内に追加
  document.getElementById(
  "next-area"
).appendChild(nextButton);
}

// =======================
// 最終結果
// =======================

function showFinalResult() {

  document.body.innerHTML = `

    <div id="result-screen">

      <img
        id="result-background"
        src="images/title.png"
      >

      <div id="result-overlay">

        <h1>
          結果発表
        </h1>

        <h2>
          ${score} /
          ${quizQuestions.length}
          問正解！
        </h2>

        <button
          class="restart-btn"
          onclick="location.reload()"
        >
          もう一回遊ぶ
        </button>

      </div>

    </div>
  `;
}

// =======================
// スタート画面
// =======================

document.getElementById(
  "start-button"
).onclick = () => {

  document.getElementById(
    "start-screen"
  ).style.display = "none";

  document.getElementById(
    "quiz-container"
  ).style.display = "block";

  showQuestion();
};
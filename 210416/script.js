//Načtení Otázek
let questions = document.questions;
//Nastavení pokud se zobrazují výsledky
let resultsTab = false;
//Nastavení vybrané otázky
let selQuestion = 1;
//Globální Nastavení Mobilní Rozlišení (limit)
let mobileLimit = 0;

window.addEventListener('DOMContentLoaded', (event) => {
    generateQuestions()
    qButtonClicks()
    menuButtonClicks()
    generateContent()
    sizeCheck()
})


window.addEventListener('resize', sizeCheck)


function generateQuestions() {
    let leftQBar = document.getElementById('leftQBar')

    let html = []
    for (let i = 0; i < questions.length; i++) {
        let q = questions[i];
        html.push(`<div id="q${q.id}" class="qbar-item q-item ${i === 0 ? 'qitem-active' : ''}">${q.id}</div>`)
    }

    leftQBar.innerHTML = html.join('\n')
    mobileLimit = leftQBar.offsetWidth + (3 * 34) + 393
}

function changeQuestion(to) {
    let QButtons = document.getElementsByClassName('q-item')

    if (selQuestion === to) return
    selQuestion = to;

    for (let i = 0; i < QButtons.length; i++) {
        let button = QButtons[i];
        button.classList.remove("qitem-active")
        if (parseInt(button.innerHTML) === to) {
            button.classList.add('qitem-active')
            leftQBar = document.getElementById('leftQBar')

            let offsetWidth = button.offsetLeft -= 35
            leftQBar.scrollLeft = offsetWidth
        }
    }
    generateContent()
}

function generateContent() {
    let questionTitle = document.getElementById('question')
    let answers = document.getElementById('answers')

    //Získání Otázky
    let question = questions.find(obj => { return obj.id === selQuestion })

    //Nastavení Otázky (Věty)
    questionTitle.innerHTML = question.q

    //Generace Odpovědí
    let generateAnswers = []
    for (let i = 0; i < question.options.length; i++) {
        const o = question.options[i];
        generateAnswers.push(`<div id="o${i}" class="option ${i === question.answered ? 'selected-option' : ''}">${o}</div>`)
    }
    answers.innerHTML = generateAnswers.join("")

    //Přidávání klikcích eventů na jednotlivé možnosti
    let options = document.getElementsByClassName('option')
    for (let i = 0; i < options.length; i++) {
        const option = options[i];
        option.addEventListener('click', (event) => {
            optionClick(event.target.innerHTML)
        })
    }
}

function optionClick(optionText) {
    let allOptions = document.getElementsByClassName('option')

    for (let i = 0; i < allOptions.length; i++) {
        const option = allOptions[i];
        //Vybrání možnosti která byla odkliknuta
        if (option.innerHTML === optionText) {
            //Přidání "vybraný" třídy
            option.classList.add('selected-option')
            //Hledání otázky
            let qIndex = questions.findIndex(q => q.id === selQuestion)
            //Nastavení jaká možnost byla zodpovězena
            questions[qIndex].answered = parseInt(option.id[1])
            //Přidáné "vybraný" třídy
            document.getElementById(`q${selQuestion}`).classList.add('qitem-answered')
        }
        //Pokud to není správná možnost, odebrat třidu "vybraný"
        else option.classList.remove('selected-option')
    }
}

function qButtonClicks() {
    let qButtons = document.getElementsByClassName('q-item')
    for (var i = 0; i < qButtons.length; i++) {
        qButtons[i].addEventListener('click', (event) => {
            changeQuestion(parseInt(event.target.innerHTML))
        });
    }
}

function menuButtonClicks() {
    let prevQ = document.getElementById('prev-q')
    prevQ.addEventListener('click', (event) => {
        if (selQuestion > 1)
            changeQuestion(selQuestion - 1)
    })
    let bprevQ = document.getElementById('b-prev-q')
    bprevQ.addEventListener('click', (event) => {
        if (selQuestion > 1)
            changeQuestion(selQuestion - 1)
    })

    let nextQ = document.getElementById('next-q')
    nextQ.addEventListener('click', (event) => {
        if (selQuestion < questions.length)
            changeQuestion(selQuestion + 1)
    })
    let bnextQ = document.getElementById('b-next-q')
    bnextQ.addEventListener('click', (event) => {
        if (selQuestion < questions.length)
            changeQuestion(selQuestion + 1)
    })

    let submit = document.getElementById('submit')
    submit.addEventListener('click', submitFunction)
    let bsubmit = document.getElementById('b-submit')
    bsubmit.addEventListener('click', submitFunction)
}

function submitFunction() {
    let confirm = window.confirm('Jste si jisti že jste odpověděli na všechny otázky?')
    if (!confirm) return
    let main = document.getElementById('main')
    let results = document.getElementById('results')
    let qBar = document.getElementById('qBar');
    let bottomBar = document.getElementById('bottomBar');
    classEdit(main, undefined, 'hidden')
    classEdit(results, 'hidden', undefined)
    classEdit(qBar, undefined, 'hidden')
    classEdit(bottomBar, undefined, 'hidden')
    resultsTab = true;
    let resultsCode = []
    questions.forEach(q => {
        resultsCode.push(generateQResult(q))
    })
    results.innerHTML = resultsCode.join('')
}

function sizeCheck() {
    let header = document.getElementById('header');
    let qBar = document.getElementById('qBar');
    let rightQBar = document.getElementById('rightQBar');
    let main = document.getElementById('main');
    let results = document.getElementById('results');
    let bottomBar = document.getElementById('bottomBar');
    let qButtonsWidth = document.getElementById('leftQBar').offsetWidth;

    let limit = mobileLimit

    if (innerWidth > limit) {
        classEdit(header, 'header-mobile', 'header-pc');
        classEdit(qBar, 'qbar-mobile', 'qbar-pc');
        classEdit(main, 'main-mobile', 'main-pc');
        if (!resultsTab) {
            classEdit(rightQBar, 'hidden', undefined);
            classEdit(bottomBar, undefined, 'hidden');
        }
        classEdit(results, 'results-mobile', 'results-pc');
    } else {
        classEdit(header, 'header-pc', 'header-mobile');
        classEdit(qBar, 'qbar-pc', 'qbar-mobile');
        classEdit(main, 'main-pc', 'main-mobile');
        if (!resultsTab) {
            classEdit(rightQBar, undefined, 'hidden');
            classEdit(bottomBar, 'hidden', undefined);
        }
        classEdit(results, 'results-pc', 'results-mobile');
    }
}

function classEdit(element, remove, add) {
    if (remove) element.classList.remove(remove)
    if (add) element.classList.add(add)
}

function generateQResult(q) {
    let htmlOut = []
    htmlOut.push(
        `<div class="res-item ${q.answer === q.answered ? 'res-i-correct' : 'res-i-wrong'}">`,
        `<div class="res-i-q">${q.id}. ${q.q}</div>`,
        `<div class="res-i-opt">`
    )
    if (q.answer !== q.answered) {
        htmlOut.push(
            `<div class="res-i-opt-bad">`,
            `<i class="fas fa-times"></i>`,
            `<div>${q.options[q.answered] || 'Neodpovězeno'}</div>`,
            '</div>'
        )
    }
    htmlOut.push(
        `<div class="res-i-opt-good">`,
        `<i class="fas fa-check"></i>`,
        `<div>${q.options[q.answer]}</div>`,
        '</div>'
    )
    htmlOut.push('</div>', '</div>')

    return htmlOut.join('')
}
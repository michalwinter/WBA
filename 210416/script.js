let results = false;
window.addEventListener('DOMContentLoaded', (event) => {
    let leftQBar = document.getElementById('leftQBar')

    let questions = [
        {
            id: 1,
            q: "Co je hlavní město Španělska?",
            answer: 0,
            options: ["Madrid", "Brno", "New York", "Vietnam"],
            answered: null
        },
        {
            id: 2,
            q: "V jakém státu je město Brusel?",
            answer: 2,
            options: ["Oklahoma", "Autstrálie", "Belgie", "Dánsko"],
            answered: null
        },
        {
            id: 3,
            q: "Kolik je států ve Spojených Státech Amerických?",
            answer: 2,
            options: ["69", "51", "50", "52"],
            answered: null
        },
        {
            id: 4,
            q: "Kolik je států v Evropské Unii?",
            answer: 1,
            options: ["24", "27", "26", "21"],
            answered: null
        },
        {
            id: 5,
            q: "V jakém roce vstoupila Česká Republika do NATO?",
            answer: 3,
            options: ["1989", "2003", "2009", "1997"],
            answered: null
        },
        {
            id: 6,
            q: "Od kaď pochází Coronavirus (Covid-19)",
            answer: 2,
            options: ["Bohnice", "Strakovská Akademie", "Provincie Jün-nan v Číně", "Donald Trump"],
            answered: null
        },
        {
            id: 7,
            q: "Je v Coca-Cola Zero cukr?",
            answer: 1,
            options: ["Ano", "Ne"],
            answered: null
        },
        {
            id: 8,
            q: "Grand Slam je turnaj jakého sportu?",
            answer: 1,
            options: ["Ping-Pong", "Tennis", "Hokej", "Americký Fotbal"],
            answered: null
        },
        {
            id: 9,
            q: "Nejvýdělečnější film Marvel Universe",
            answer: 0,
            options: ["Avengers: End Game", "Doctor Strange", "Spiderman: Daleko od Domova", "Ant-Man"],
            answered: null
        },
        {
            id: 10,
            q: "Odkud pochází automobilová značka Dodge?",
            answer: 3,
            options: ["Česká Repulika", "Německo", "Čína", "Spojené Státy Americký"],
            answered: null
        }
    ]

    let QBarList = []
    for (let i = 0; i < questions.length; i++) {
        let q = questions[i];
        QBarList.push(`<div id="q${q.id}" class="qbar-item q-item ${i === 0 ? 'qitem-active' : ''}">${q.id}</div>`)
    }
    leftQBar.innerHTML = QBarList.join('\n')
    sizeCheck()

    let selectedQuestion = 1;

    function changeQuestion(to) {
        let QButtons = document.getElementsByClassName('q-item')
        if (selectedQuestion === to) return
        selectedQuestion = to;
        for (let i = 0; i < QButtons.length; i++) {
            const element = QButtons[i];
            element.classList.remove("qitem-active")
            if (parseInt(element.innerHTML) === to) {
                element.classList.add('qitem-active')
                leftQBar = document.getElementById('leftQBar')

                let offsetWidth = element.offsetLeft
                if (offsetWidth > (window.innerWidth - 34))
                    leftQBar.scrollLeft -= 50
                if (element.offsetLeft < 65) offsetWidth = 0

                leftQBar.scrollLeft = offsetWidth
            }
        }
        generateContent()
    }

    function generateContent() {
        let question = document.getElementById('question')
        let answeres = document.getElementById('answers')
        let q = questions.find(obj => { return obj.id === selectedQuestion })
        question.innerHTML = q.q
        let generateAnswers = []
        for (let i = 0; i < q.options.length; i++) {
            const o = q.options[i];
            generateAnswers.push(`<div id="o${i}" class="option ${i === q.answered ? 'selected-option' : ''}">${o}</div>`)
        }
        answeres.innerHTML = generateAnswers.join("")
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
            if (option.innerHTML === optionText) {
                option.classList.add('selected-option')
                let qIndex = questions.findIndex(q => q.id === selectedQuestion)
                questions[qIndex].answered = parseInt(option.id[1])
                document.getElementById(`q${selectedQuestion}`).classList.add('qitem-answered')
            }
            else option.classList.remove('selected-option')
        }
    }


    let qButtons = document.getElementsByClassName('q-item')
    for (var i = 0; i < qButtons.length; i++) {
        qButtons[i].addEventListener('click', (event) => {
            changeQuestion(parseInt(event.target.innerHTML))
        });
    }
    generateContent()

    let prevQ = document.getElementById('prev-q')
    prevQ.addEventListener('click', (event) => {
        if (selectedQuestion > 1)
            changeQuestion(selectedQuestion - 1)
    })
    let bprevQ = document.getElementById('b-prev-q')
    bprevQ.addEventListener('click', (event) => {
        if (selectedQuestion > 1)
            changeQuestion(selectedQuestion - 1)
    })

    let nextQ = document.getElementById('next-q')
    nextQ.addEventListener('click', (event) => {
        if (selectedQuestion < qButtons.length)
            changeQuestion(selectedQuestion + 1)
    })
    let bnextQ = document.getElementById('b-next-q')
    bnextQ.addEventListener('click', (event) => {
        if (selectedQuestion < qButtons.length)
            changeQuestion(selectedQuestion + 1)
    })

    let submit = document.getElementById('submit')
    submit.addEventListener('click', submitFunction)
    let bsubmit = document.getElementById('b-submit')
    bsubmit.addEventListener('click', submitFunction)

    function submitFunction() {
        let confirm = window.confirm('Jste si jisti že jste odpověděli na všechny otázky?')
        if (!confirm) return
        let qTab = document.getElementById('qTab')
        let answTab = document.getElementById('answTab')
        qTab.classList.add('hidden')
        answTab.classList.remove('hidden')
        let resultsCode = []
        questions.forEach(q => {

        })
    }
})

window.addEventListener('resize', sizeCheck)

function sizeCheck() {
    let rightQBar = document.getElementById('rightQBar')
    let bottomBar = document.getElementById('bottomBar')
    let header = document.getElementById('header')
    let content = document.getElementById('content')
    let main = document.getElementById('main')
    let results = document.getElementById('answTab')
    let qButtonsWidth = document.getElementById('leftQBar').offsetWidth
    let limit = qButtonsWidth + 34 + 393 + 34 + 34
    if (innerWidth > limit) {
        bottomBar.classList.add('hidden')
        rightQBar.classList.remove('hidden')
        main.classList.add('main-pc')
        main.classList.remove('main-mobile')
        content.classList.add('pc-content-p')
        content.classList.remove('mobile-content-p')
        header.classList.add('pc-header-p')
        header.classList.remove('mobile-header-p')
        results.classList.add(['pc-content-p'])
        results.classList.remove('mobile-content-p')
    } else {
        rightQBar.classList.add('hidden')
        bottomBar.classList.remove('hidden')
        main.classList.add('main-mobile')
        main.classList.remove('main-pc')
        content.classList.add('mobile-content-p')
        content.classList.remove('pc-content-p')
        header.classList.add('mobile-header-p')
        header.classList.remove('pc-header-p')
        results.classList.add('mobile-header-p')
        results.classList.remove('pc-content-p')
    }
}

window.addEventListener('DOMContentLoaded', async (event) => {
    let leftQBar = document.getElementById('leftQBar')

    let questions = [
        {
            id: 1,
            q: "Co je hlavní město Španělska",
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
        }
    ]

    let QBarList = []
    for (let i = 0; i < questions.length; i++) {
        let q = questions[i];
        QBarList.push(`<div class="qbar-item q-item ${i === 0 ? 'qitem-active' : ''}">${q.id}</div>`)
    }
    leftQBar.innerHTML = await QBarList.join('\n')

    let selectedQuestion = 1;

    async function changeQuestion(to) {
        let QButtons = await document.getElementsByClassName('q-item')
        if (selectedQuestion === to) return
        selectedQuestion = to;
        for (let i = 0; i < QButtons.length; i++) {
            const element = QButtons[i];
            element.classList.remove("qitem-active")
            if (parseInt(element.innerHTML) === to) element.classList.add('qitem-active')
        }
    }


    let qButtons = await document.getElementsByClassName('q-item')
    for (var i = 0; i < qButtons.length; i++) {
        qButtons[i].addEventListener('click', async (event) => {
            changeQuestion(parseInt(event.target.innerHTML))
        });
    }

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
})

window.addEventListener('resize', async () => {
    let rightQBar = document.getElementById('rightQBar')
    let bottomBar = document.getElementById('bottomBar')
    let qButtonsWidth = document.getElementById('leftQBar').offsetWidth
    let limit = qButtonsWidth + 34 + 393 + 34 + 34
    if (innerWidth > limit) {
        rightQBar.classList.remove('hidden')
        bottomBar.classList.add('hidden')
    } else {
        rightQBar.classList.add('hidden')
        bottomBar.classList.remove('hidden')
    }
})
const quizData = [
    {
        question: "What is an Operating System?",
        options: [
            "A hardware component",
            "System software managing hardware and software resources",
            "Application software",
            "None of the above"
        ],
        answer: "System software managing hardware and software resources"
    },
    {
        question: "Which of the following is NOT a function of an operating system?",
        options: [
            "Memory management",
            "File management",
            "Web browsing",
            "Process scheduling"
        ],
        answer: "Web browsing"
    },
    {
        question: "Which of the following is an example of a real-time operating system?",
        options: [
            "Windows",
            "Linux",
            "RTOS",
            "MS-DOS"
        ],
        answer: "RTOS"
    },
    {
        question: "What does the term 'multiprogramming' mean?",
        options: [
            "Running multiple programs at the same time",
            "Running a program on multiple processors",
            "Running multiple operating systems",
            "Running multiple applications sequentially"
        ],
        answer: "Running multiple programs at the same time"
    },
    {
        question: "Which scheduling algorithm is also called a shortest-job-next algorithm?",
        options: [
            "Round-robin",
            "First-come-first-serve",
            "Shortest Job First",
            "Priority scheduling"
        ],
        answer: "Shortest Job First"
    },
    {
        question: "What is a process control block (PCB)?",
        options: [
            "A data structure that stores information about a process",
            "A system call for process creation",
            "A block that contains process instructions",
            "A file in the file system"
        ],
        answer: "A data structure that stores information about a process"
    },
    {
        question: "Which of the following is a deadlock prevention technique?",
        options: [
            "Hold and wait",
            "Circular wait",
            "Resource allocation graph",
            "Avoidance by Banker’s Algorithm"
        ],
        answer: "Avoidance by Banker’s Algorithm"
    },
    {
        question: "In paging, what is the purpose of the page table?",
        options: [
            "To translate virtual addresses to physical addresses",
            "To store the contents of a page",
            "To manage free and allocated memory",
            "To provide a mapping between processes and resources"
        ],
        answer: "To translate virtual addresses to physical addresses"
    },
    {
        question: "What is the difference between preemptive and non-preemptive scheduling?",
        options: [
            "In preemptive scheduling, a running process can be interrupted.",
            "In non-preemptive scheduling, a running process cannot be interrupted.",
            "Both statements are correct.",
            "None of the above."
        ],
        answer: "Both statements are correct."
    },
    {
        question: "Which of the following is used to handle critical sections in concurrent programming?",
        options: [
            "Mutex",
            "Semaphore",
            "Monitor",
            "All of the above"
        ],
        answer: "All of the above"
    },
    {
        question: "What is thrashing in an operating system?",
        options: [
            "Excessive CPU usage due to I/O interrupts",
            "High disk paging activity causing performance degradation",
            "Simultaneous access to multiple processes",
            "Deadlock occurring in the system"
        ],
        answer: "High disk paging activity causing performance degradation"
    },
    {
        question: "How does the OS manage fragmentation in memory allocation?",
        options: [
            "Compaction",
            "Paging",
            "Segmentation",
            "All of the above"
        ],
        answer: "All of the above"
    },
    {
        question: "What is the primary purpose of the 'inode' in a file system?",
        options: [
            "Stores metadata about a file",
            "Contains the file content",
            "Stores the file path",
            "Allocates disk blocks"
        ],
        answer: "Stores metadata about a file"
    },
    {
        question: "What is the key difference between a process and a thread?",
        options: [
            "A process is lightweight, whereas a thread is heavyweight.",
            "A thread is lightweight, whereas a process is heavyweight.",
            "Both are lightweight.",
            "None of the above."
        ],
        answer: "A thread is lightweight, whereas a process is heavyweight."
    },
    {
        question: "In a distributed operating system, what is transparency?",
        options: [
            "Allowing users to see all resources directly.",
            "Hiding the complexities of distributed resources.",
            " Allowing processes to execute sequentially.",
            "None of the above."
        ],
        answer: "Hiding the complexities of distributed resources."
    }
];


let currentQuestion = 0;
let score = 0;
let timeLeft = 15;
let timer;

function loadQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");
    const nextBtn = document.getElementById("next-btn");

    const currentQuiz = quizData[currentQuestion];
    questionElement.textContent = currentQuiz.question;
    optionsElement.innerHTML = "";

    currentQuiz.options.forEach((option) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => selectAnswer(button, currentQuiz.answer));
        optionsElement.appendChild(button);
    });

    nextBtn.style.display = "none";
    resetTimer();
    startTimer();
}

function selectAnswer(button, correctAnswer) {
    clearInterval(timer); 
    if (button.textContent === correctAnswer) {
        score++;
        button.style.background = "green";
    } else {
        button.style.background = "red";
    }

    Array.from(document.getElementById("options").children).forEach(btn => {
        btn.disabled = true; 
    });

    document.getElementById("next-btn").style.display = "block";
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        clearInterval(timer);
        window.location.href = `results.html?score=${score}`;
    }
}

function startTimer() {
    timeLeft = 15;
    document.getElementById("time").textContent = timeLeft;
    timer = setInterval(() => {
        timeLeft--;
        document.getElementById("time").textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            nextQuestion();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer); 
    timeLeft = 15; 
    document.getElementById("time").textContent = timeLeft;
}

document.addEventListener("DOMContentLoaded", () => {
    loadQuestion();
    document.getElementById("next-btn").addEventListener("click", nextQuestion);
});

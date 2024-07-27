const generateRandomId = (() => {
    let id = 1;
    return () => id++;
})();

const names = ["Alice Johnson", "Bob Smith", "Charlie Brown", "Diana Prince", "Eve Adams", "Frank Harris", "Grace Lee", "Hank Green", "Ivy Taylor", "Jack White", "Karen Black", "Leo Gray", "Mia Blue", "Noah Brown", "Olivia Green", "Paul White", "Quinn Black", "Rachel Blue", "Sam Green", "Tina Brown", "Uma White", "Victor Black", "Wendy Blue", "Xander Green", "Yara Brown", "Zane White", "Amy Black"];

const comments = [
    "I think this is a great idea.",
    "I totally agree with you.",
    "I have some reservations about this.",
    "Why do you think so?",
    "I see where you're coming from.",
    "Let's explore this further.",
    "What aspects do you want to explore?",
    "I have a few suggestions.",
    "We should consider all possibilities.",
    "This is an interesting point.",
    "I have a different perspective.",
    "Can we discuss this in more detail?",
    "This is quite fascinating.",
    "I would like to learn more about this.",
    "This raises some important questions.",
    "I'm not sure I understand.",
    "Can you elaborate on that?",
    "I have some additional thoughts.",
    "What are the next steps?",
    "This needs further discussion.",
    "I have a different idea.",
    "This is very insightful.",
    "I hadn't thought of it that way.",
    "This could be improved.",
    "I appreciate your input.",
    "We should act on this.",
    "Thanks for sharing your thoughts."
];

function getRandomElement(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

export const nestedCommentsData = [
    {
        id: generateRandomId(),
        name: getRandomElement(names),
        comment: getRandomElement(comments),
        replies: [
            {
                id: generateRandomId(),
                name: getRandomElement(names),
                comment: getRandomElement(comments),
                replies: [
                    {
                        id: generateRandomId(),
                        name: getRandomElement(names),
                        comment: getRandomElement(comments),
                        replies: [
                            {
                                id: generateRandomId(),
                                name: getRandomElement(names),
                                comment: getRandomElement(comments),
                                replies: [],
                            },
                        ],
                    },
                    {
                        id: generateRandomId(),
                        name: getRandomElement(names),
                        comment: getRandomElement(comments),
                        replies: [],
                    },
                ],
            },
        ],
    },
    {
        id: generateRandomId(),
        name: getRandomElement(names),
        comment: getRandomElement(comments),
        replies: [
            {
                id: generateRandomId(),
                name: getRandomElement(names),
                comment: getRandomElement(comments),
                replies: [
                    {
                        id: generateRandomId(),
                        name: getRandomElement(names),
                        comment: getRandomElement(comments),
                        replies: [],
                    },
                ],
            },
            {
                id: generateRandomId(),
                name: getRandomElement(names),
                comment: getRandomElement(comments),
                replies: [],
            },
        ],
    },
    {
        id: generateRandomId(),
        name: getRandomElement(names),
        comment: getRandomElement(comments),
        replies: [],
    },
    {
        id: generateRandomId(),
        name: getRandomElement(names),
        comment: getRandomElement(comments),
        replies: [],
    },
    {
        id: generateRandomId(),
        name: getRandomElement(names),
        comment: getRandomElement(comments),
        replies: [],
    },
    {
        id: generateRandomId(),
        name: getRandomElement(names),
        comment: getRandomElement(comments),
        replies: [],
    }
];

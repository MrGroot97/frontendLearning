import { names, comments } from './constants';

const generateRandomId = (() => {
    let id = 1;
    return () => id++;
})();

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

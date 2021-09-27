//A LYCANTHROPE'S LOG
/* A certain individual, let's call him 'Ace' recently discovered that certain activities cause him to turn into a werewolf. To keep track of those actvities that cause him to turn, Ace created the programme to document those events and find out the activities that trigger the werewolf genes in him. */

let log = [];

//Function to make entries into the log
function addEntry(events, werewolf){
    log.push({events, werewolf})
};

addEntry(['anger', 'moonlight', 'stress', 'hunting', 'suya'], true);
addEntry(['rest', 'gardening', 'party', 'swimming', 'cakes' ], false);
addEntry(['anger', 'salad', 'stress', 'roadtrip', 'laundry'], true);
addEntry(['rest', 'hiking', 'party', 'football', 'ice-cream' ], false);
addEntry(['swimming', 'sight-seeing', 'cinema', 'weekend', 'suya' ], false);
addEntry(['rest', 'sight-seeing', 'church', 'badminton', 'spaghetti' ], false);
addEntry(['rest', 'gardening', 'party', 'swimming', 'cakes' ], false);
addEntry(['moonlight', 'stress', 'anger', 'roadtrip', 'steak'], true);
addEntry(['sight-seeing', 'moonlight', 'headache', 'hiking', 'suya'], true);
addEntry(['rest', 'hiking', 'vegetables', 'laundry', 'roadtrip'], false);
addEntry(['swimming', 'gardening', 'concert', 'cinema', 'cocktail'], false);
addEntry(['sight-seeing', 'anger', 'sunlight', 'cinema', 'cocktail'], true);
addEntry(['headache', 'anger', 'moonlight', 'hunting', 'ice-cream'], true);
addEntry(['anger', 'moonlight', 'stress', 'hunting', 'suya'], true);

// console.log(log.length)

//Function to generate a frequency table from each of the events, the output from this function would be used to calculate the correlation of each event with Ace's transformation
function frequencyTable(event, log){
    let tableArr = [0, 0, 0, 0];
    for(let i = 0; i < log.length; i++){
        let entry = log[i];
        let index = 0;
        if(entry.events.includes(event)) {index += 1}
        if(entry.werewolf) {index += 2}
        tableArr[index] += 1;
    }
    return tableArr
}

//Phi Formula for calculating Correlation
function phi(table){
    return (((table[3] * table[0]) - (table[2] * table[1])) / Math.sqrt((table[2] + table[3]) * (table[0] + table[1]) * (table[1] + table[3]) * (table[0] + table[2])))
}

//Function to include the occurrence of all the events into an array
function logEvents(log){
    let events = [];
    for(let entry of log){
        for(let event of entry.events){
            if(!events.includes(event)){
                events.push(event)
            }
        }
    }
    return events
}

let eventsArr = logEvents(log); //Array to contain all the instances of the events
let correlationArr = []; //Array to contain all the corresponding correlations of all the events

/*This for loop function generates a frequency table for each event in the log and solves their correlation with regards to Ace turning into a Werewolf. The closer the value tends to 1, the higher the chance of that corresponding event leading to the werewolf outcome. The closer it is to -1, the farther away it is from being the reason for his werewolf outcome.*/
for(let event of eventsArr){
    correlationArr.push(phi(frequencyTable(event, log)))
}

let eventsCorrelation = {}; //Object to contain all events with their correlations

//Setting the events and their corresponding correlations in an object as a key and value pair
for(let i = 0; i < eventsArr.length; i++){
    eventsCorrelation[eventsArr[i]] = correlationArr[i]
}

console.table(eventsCorrelation)

//Function to find the event with the maximum correlation in the eventsCorrelation object
let getMaxNumber = function(object){
    let maxValue = 0;
    for(let key in object){
        if(maxValue < object[key]){
            maxValue = key
        }
    }
    return `Therefore, the event with the highest chance of causing him to turn into a werewolf is ${maxValue}.`
}

console.log(getMaxNumber(eventsCorrelation))
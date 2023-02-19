// Imports readline and allows us to do input in and out
const readline = require('readline');
const rl = readline.createInterface(process.stdin, process.stdout);

// Ask function that takes in text and returns and resolves a promise
function ask(questionText) {
  return new Promise((resolve, reject) => {
    rl.question(questionText, resolve);
  });
}

// * run file in terminal with: node fileName.js
// ! DO NOT TOUCH CODE ABOVE THIS LINE

// Async start function being invoked
start();

// The function that starts the whole game
async function start() {
  // Intro game text
  console.log("\n-------------------------");
  console.log("Welcome to number picker!");
  console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  console.log("-------------------------");
  let minNum = 1;
  // console.log("Let's play a game where you (human) make up a number and I (computer) try to guess it.")
  // let secretNumber = await ask("What is your secret number?\nI won't peek, I promise...\n");
  // console.log('You entered: ' + secretNumber);
  
  // Now try and complete the program.
  // Example async await function to ask for highest number (max)
  async function pickHighNum() {
    // Asking the user for highest number
    let pickMaxNum = await ask(`\nPlease choose a number greater than ${minNum}: `);
    
    // Grab the value of user input
    let highNum = parseInt(pickMaxNum);
    
    if (highNum != pickMaxNum) {
      // if user does not select something valid
      console.log("\n...\nNo fair! I don't know how to guess things like that!");
      
      // cycle back through to max # selection
      pickHighNum();
      
    } else if (highNum <= minNum) {
      // confirm number is greater than one
      console.log("\nThought you could pull one over on me, eh?");
      
      // cycle back through to max # selection
      pickHighNum();

    } else {
      // Confirmation message print
      console.log(`\nYou set ${highNum} as the highest value possible.`);
      
    };
    
    learnMysteryNum();
    
    async function learnMysteryNum() {
      
      // ask human to pick mystery num
      let pickMysteryNum = await ask(`\nPlease choose a number between ${minNum} and ${highNum}.\nDon't worry, I'll keep my eyes closed!\n`);
      
      pickMysteryNum;
      
      let mysteryNum = parseInt(pickMysteryNum);
      
      mysteryNum;
      
      // Verify that mystery number is valid
      if (mysteryNum > highNum) {
        console.log("Sorry, that's too high!");
        learnMysteryNum();
      } else if (mysteryNum < minNum) {
        console.log("Uhhh, that's a little too low.");
        learnMysteryNum();
      } else if (pickMysteryNum != mysteryNum) {
        console.log("...What is THAT?");
        learnMysteryNum();
      } else {
        console.log("That works great!");
        guessNum();
      };
      async function guessNum() {
        console.log(`\nSo now I'm going to guess a number between ${minNum} and ${highNum}.\nYou'll tell me if it's right or wrong.\nIf I'm wrong, I'll need to know whether it's higher or lower.\n`)
        let pickGuess = Math.floor(Math.random() * (highNum - minNum)) + 1;
        let attempts = 1;
        
        async function analysis() {
          console.log(`Currently on attempt #${attempts} to guess your number.`)
          // ask user if the guess is correct
          let pivotNum = await ask(`\nIs your secret number: ${pickGuess}? Y or N?\n`);
          // ! currently not referencing raiseMin/lowerMax functions!
          // use only first value of pivotNum string
          let chopAnswer = pivotNum[0];
          // capitalize chopAnswer
          let capitalizeChop = chopAnswer.toUpperCase();
          // state formatted answer to user
          console.log(`\nYou entered: ${capitalizeChop}`);

          if (capitalizeChop === "Y") {
            console.log("Processing...");
            if (mysteryNum === pickGuess) {
              async function gameOver() {
                let playAgain = await ask("\nI KNEW it! Thanks for playing. That was fun!\n\nDo you want to play again? Y or N?\n");
                playAgain;
                if (playAgain === "Y" || playAgain === "y") {
                  console.log("\nFantastic! I'll see you in a bit!");
                  start();
                } else {
                  console.log("Okay, no hard feelings. Have a great day! See you next time. :-)");
                  process.exit(); //! EXITS
                };
              };
              gameOver();
            } else {
              console.log("Wait, that seemed too easy. Are you sure that was right?");
              analysis();
            };
          } else if (capitalizeChop === "N") {
            console.log("Processing your response...");
            if (mysteryNum === pickGuess) {
              let question = await ask("Hey, no fair! Let's be honest here.\nDid I get it right or what?");
              question;
              gameOver();
            } else {
              console.log("Hmm, I see...");
              highLow();
            };
          } else {
            console.log("Sorry, I don't understand your response.");
            analysis();
          };  // end of yes/no/else pivot function
        };
        analysis();
        async function highLow() {
          let flipCoin = await ask(`\nIs your secret number higher or lower than ${pickGuess}? H or L?\n`);
          let capsAnswer = flipCoin.toUpperCase();
          console.log(`\nYou entered: ${capsAnswer}`);
          if (capsAnswer === "H") {
            console.log("Processing...");
            if (mysteryNum > pickGuess) {
              console.log("\nThat's good to know!");
              attempts++;
              minNum = pickGuess + 1;
              pickGuess = Math.floor(Math.random() * (highNum - minNum)) + 1;
              console.log(`Raising minimum to ${minNum}.`);
              analysis();
            } else {
              console.log("\n...\nWait, something's off. Are you sure that was right?");
              highLow();
            };
          } else if (capsAnswer === "L") {
            console.log("Processing your response...");
            if (mysteryNum < pickGuess) {
              console.log("Thanks for the info!");
              attempts++;
              highNum = pickGuess - 1;
              pickGuess = Math.floor(Math.random() * (highNum - minNum)) + 1;
              console.log(`Lowering maximum to ${highNum}.`);
              analysis();
            } else {
              console.log("Be honest, now...");
              highLow();
            };
          } else {
            console.log("\nSorry, I can't understand your response. Let's try that again.");
            highLow();
          };
        };
        };
      };
  };
  // Calling the pick high number function
  pickHighNum();
};

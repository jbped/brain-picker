# Brain Picker
## Description
Take a shot at the [<em>Brain</em><strong>Picker</strong>](https://jbped.github.io/brain-picker/) challenge! The quiz is timed, 15 seconds per question. For each correct answer 5 seconds are added to the timer. Opposed to 10 seconds being removed for incorrect answers. 

The question and answers are dynamic. Simply add quiz questions to the quiz by adding them to the the questionArr array using the format below:
```
  {
        question: "Write question out here",
        answer: 0, // provide the object item position that corresponds with the correct answer
        0: "a semi-colon - ';'",
        1: "a comma - ','",
        2: "a space - '  '",
        3: "double or single quotes" // Add or remove object items for extending or removing the potential answers
    },
```

### Enjoy!

![brainpicker homescreen](https://user-images.githubusercontent.com/76881086/119279562-b9911800-bbe9-11eb-8f20-4ecb4cbadf4a.png)

## User Story

AS A coding boot camp student

I WANT to take a timed quiz on JavaScript fundamentals that stores high scores

SO THAT I can gauge my progress compared to my peers

### Acceptance Criteria

GIVEN I am taking a code quiz

WHEN I click the start button

THEN a timer starts and I am presented with a question

WHEN I answer a question

THEN I am presented with another question

WHEN I answer a question incorrectly

THEN time is subtracted from the clock

WHEN all questions are answered or the timer reaches 0

THEN the game is over

WHEN the game is over

THEN I can save my initials and score

## Grading Requirements
This challenge is graded based on the following criteria:

### Technical Acceptance Criteria: 40%
- Satisfies all of the above acceptance criteria.

### Deployment: 32%
- Application deployed at live URL.
- Application loads with no errors.
- Application GitHub URL submitted.
- GitHub repository that contains application code.

### Application Quality: 15%
- Application user experience is intuitive and easy to navigate.
- Application user interface style is clean and polished.
- Application resembles the mock-up functionality provided in the Challenge instructions.

### Repository Quality: 13%
- Repository has a unique name.
- Repository follows best practices for file structure and naming conventions.
- Repository follows best practices for class/id naming conventions, indentation, high-quality comments, etc.
- Repository contains multiple descriptive commit messages.
- Repository contains a high-quality README file with description, screenshot, and link to deployed application.

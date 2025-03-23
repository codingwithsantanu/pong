# Pong Game
I bet you have played the well known game known as *`pong`*. It was originally created by **Atari** by *Allan Alcorn* in 1972. In this repository, you can find the source code of a very similar game created by me :wink:.

This project was made entirely by me, I remember watching some tutorials a long time ago. The *checkCollision(rectrangle, circle)* method was taken from `ChatGPT`. This project is highly scalable with tons of improvements listed below. I made this game as a simple prototype, so it doesn't focus on organisation as much :cry:.

## How To Run
We all know how to run a `HTML` file and have probably heard of the procedure a million times. So I am not going to bore you too much. Just open the [index.html](index.html) file in a web browser, preferably *chrome*. 

This game works fine for most of the devices you can expect like: `mobiles`, `tablets`, and `computers`. Give it a try :heart:!

## Suggestions
If you are willing to learn about this project or upgrade this project, I have listed some areas to checkout below.

### Improvements
- **Sounds**: Adding sounds might be the most crucial improvement for this game, or basically most of the games out there. A cozy background music along with some satisfying sfx never disappoints.

- **Custom Graphics**: You may want to **tweak the color** of the paddles and the ball, or even replace them with **any suitable images** like a football image? All depends on you.

- **Powerups**: Adding some powerups can make the game stand out among other pong game clones. For example, one powerup may allow the paddle to **move quicker**, while another may make **increase it's size**.

- **Title Screen**: You may add a title screen to display when the game is not beging played. For example, you can display some instructions regarding **how to play the game** or the **keybinds**.

### Design Changes
Some parts of the game doesn't need some changes but it depends on the designer. For example, we don't really need to increment the score by 10 instead of 1 but it depends on you.

- **Keyboard Controls**: Currently, for controlling the user paddle through keyboard, we need to use `↑` and `↓` keys. But you can also add support for **W** and **S** keys.

- **Touch Controls**: Currently, tapping above the center of the document moves the paddle upwards and vice versa. You may want to make the center of the paddle try to reach the same y position as the touch position. Choose wisely.

- **Layout**: You can change the shape of the ball as a square or change the font size of the score based on the screen dimensions (better scaling). These changes don't affect the game as much as other design changes but definately are noticable.

### Good Practices
- **OOP**: The current `script.js` uses **SOP** which is like python. It is a good practice to package everything **into different classes** in **separate files**.

- **Game Handler**: Most of the code that handles the game logic such as incrementing score and collision detection between the ball and the paddles are inside of the `Ball` class, it is good to separate some of it inside a `Main` or `Game` class.

> **NOTE**: It is worth mentioning that sometimes when the javascript file importing the canvas element from the document is loaded way too early, it may not be able to find the element and return null. This can cause serious issues. So it's best to use window event listeners like `load` and `DOMContentLoaded`, when they fire, fetch the canvas, and start the main game loop.

### Probable Issues
There are many parts of the code that were not tested thorougly. Some practice sessions may not be able to find those issues. Consider more play-testing to ensure everything works as intened. Some of those key areas are listed below:

- Collision detection.
- Updating score.
- Computer paddle movement.
- Directing ball to a random direction.
- Vertical collision (top & bottom boundaries).

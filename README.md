### How to run the code
1. Clone the repository
2. Add your OpenAI API key to the `API_KEY` variable in `script.js` and `API_KEY2` in game.js
3. Open `/templates/game.html` in your browser e.g. file:///c%3A/Users/.../Memorise/templates/game.html
4. Input a theme and click "Start Game" to begin playing!
5. Wait for the AI to generate descriptions and images for the cards [subject to wifi speeds]
6. Click on cards to flip them over and find matching pairs
7. Keep track of your score and time to improve your memory and cognitive skills!

### Inspiration
We wanted to create a fun and engaging way to boost memory, concentration, and cognitive skills while keeping players entertained. Studies show that memory games can enhance brain plasticity and improve recall abilities, making them a great tool for people of all ages. Inspired by classic card-matching games, we set out to build Memorise, a modern and customizable memory trainer that adapts to different themes and difficulty levels.

### What it does
Memorise is an interactive card-matching memory game where players flip over cards to find matching pairs. The game challenges players to remember card positions, improving short-term memory and cognitive processing speed. Players can customize their experience by selecting different themes, adding an extra layer of engagement.

### How we built it
Frontend: HTML, CSS, and JavaScript for a smooth and responsive UI.
Game Logic: JavaScript to handle card flipping, matching logic, and tracking user performance.
Theming & Customization: Users input a theme, and AI-generated descriptions assign relevant images to cards.
AI Integration: OpenAI's API generates creative descriptions based on user-selected themes.
Styling & Effects: CSS animations and a blurred background effect enhance the user experience.
### Challenges we ran into
Asynchronous Data Handling: Ensuring AI-generated descriptions were fetched before assigning images to cards.
User Experience Enhancements: Making the game visually appealing while maintaining simplicity and usability.
Performance Optimization: Managing API requests efficiently to prevent delays in loading themes and images.
### Accomplishments that we're proud of
Successfully integrating AI-generated themes to make every game session unique.
Creating a visually appealing and smooth UI with engaging animations.
Implementing a dynamic difficulty system to keep users challenged.
Enhancing memory and cognitive training through fun and interactive gameplay.
### What we learned
The importance of async programming and handling API responses properly.
How memory-based games can help improve cognitive function and focus.
Best practices for UI/UX design to make a game feel immersive and enjoyable.
### What's next for Memorise
Multiplayer Mode: Compete with friends and see who has the sharpest memory!
Leaderboards & Achievements: Track progress and unlock rewards.
More Themes & AI Enhancements: Expand theme generation with richer visuals and deeper customization.
Adaptive Difficulty: AI adjusts game complexity based on user performance for a more personalized challenge.

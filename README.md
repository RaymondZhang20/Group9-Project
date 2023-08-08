# Group9-Project
## FINAL PROJECT REPORT

### Project Description: 
Our application will be presented in the form of a website, with the functionality to allow users who share similar interests in video games to connect with other users (like a find “someone you might know” function on social media). It is for users who sit at home while playing games to find friends with similar interests and to promote social activity. It will store location data for users for the “find users near you” functionality, it will also store data for user’s interests (games that the user is interested in). It stores the users' preferences of what other users it would want to be matched to (how far away is still near? timezone? age? gender?) and this could be an additional functionality, to match users taking their preferences into consideration.

### Minimal requirements:
- [x] 1. Implementing an authentication system with Firebase that can let users register or log in and then(if passing the authentication) access their private routes.
- [x] 2. Implementing an account system integrated with Firebase that restores users' information in database, and allows users to send friend requests, accept requests, ignore requests and remove friends.
- [x] 3. Implementing a profile and a game list for every account. Users are able to edit their profile and game list and view others.

### Standard requirements:
- [x] 1. Implementing a query system that computes the match levels of different accounts in the database, which could later be removed or sending matching requests from the user.
- Select from user's locations, games played, gaming platform and gender and filter users from backend with satisfied conditions.
- [x] 2. Be able to communicate with friends by sending direct messages.
- [x] 3. Display the user and this user's friends location on a map.
- [x] 4 .Be able to select games from a list of games provided by the server, stored as part of user information.

### Stretch requirements:
- [ ] 1. Link games to account, display in-game achievement?
- [x] 2. Make messaging system respond in real time using WebSokect.
- [ ] 3. Send an invitation to everyone within an outlined area for people to join a users party/game
- [x] 4. Variable avatars for users to select, and show users avatar on matching, map, friend list and chat.
- [x] 5. Be able to add a new game to the list. Having search functionality to find a game in a large game list.

### Tech from units 1-5

### Above and Beyond

### Next Steps

### List of Contributions
Jasper: Worked on the Map part of the web application which includes setting up the map api, creating the component, managing the redux of the data displayed on the map and calling the backend for everything map needs. Also dealth with all of the deployment and any issues that deployment presented. 

### Task breakdown
1. Choose proper database and implement database connector to the back-end.
2. Implement account system on back-end: store update account info in database.
3. Implement account system on front-end: log and register function and secured html structure with accounts.
4. Implement filtering algorithm on back-end.

### Prototypes 

Log-in page:

![Log-in page](./img/page1.png)

Map page:

![map page](./img/page2.png)

Main page:

![main page](./img/page3.png)

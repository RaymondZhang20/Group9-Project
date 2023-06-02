# Group9-Project
## Project Progress 1

### Project Description: 
Our application will be presented in the form of a website, with the functionality to allow users who share similar interests in video games to connect with other users (like a find “someone you might know” function on social media). It is for users who sit at home while playing games to find friends with similar interests and to promote social activity. It will store location data for users for the “find users near you” functionality, it will also store data for user’s interests (games that the user is interested in?). It could potentially store the users' preferences of what other users it would want to be matched to (how far away is still near? timezone? age? gender?) and this could be an additional functionality, to match users taking their preferences into consideration.

### Minimal requirements:
1. Implementing an account system that can let users register or log in when they access the website, store all their information in a database, and update to the database every time users changed or created accounts.
- Add new user to the database when registering
- Change information of an existing user in the database when editing profile etc.
2. Implementing an algorithm that compute the match levels of different accounts in the database base on their locations, games played, gaming platform and so on. - And push every account it’s best matching accounts once it logged in.
- Algorithm that find similarity of played games for different users
3. Be able to view other users profiles and what games they play and send them friend invitations
- Responsive window/link should be jumped out when clicking profile
- Invitations sent should be and only be visible to that specific user (database should store these 2 users along with invitation)

### Standard requirements:
1. Be able to communicate with other users, maybe by sending direct messages
2. Display users on a map along with filtering by games and whatever other filters
3 .Be able to select games from a list of games, if the list is very large, may need a search functionality.

### Stretch requirements:
1. Link games to account???display in-game achievement?
2. Send an invitation to everyone within an outlined area for people to join a users party/game
3. Online voice call service to ensure better friend making process / gaming experience

### Task breakdown
1. Choose proper database and implement database connector to the back-end.
2. Implement account system on back-end: store update account info in database.
3. Implement account system on front-end: log and register function and secured html structure with accounts.
4. Implement matching algorithm on back-end.

### Prototypes 

Log-in page:

![Log-in page](./img/page1.png)

Map page:

![map page](./img/page2.png)

Main page:

![main page](./img/page3.png)

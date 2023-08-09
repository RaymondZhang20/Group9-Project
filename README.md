## FINAL PROJECT REPORT

# Project Description

An engaging gaming social network platform, with a robust authentication and user account system for profile customization, friend interactions, and game selection. Including real-time communication and gaming requests, and functionalities such as viewing friends on maps, user matching results, and real-time notifications.

## Features & Technical Highlights

### 1. Authentication System
- **Framework/Tools:** Firebase and React-Router
- Allows users to register and log in.
- Provides access to private routes based on authentication context.

### 2. Account Management System
- **Backend:** Express and Mongoose
- Stores user profiles, game lists, requests and friends in MongoDB.
- Enables users to:
  - Modify their profile.
  - Add favorite games.
  - Manage a server-side game list.
- Integration with Firebase for private route access post-authentication.
- Friend management:
  - Sending, accepting, ignoring friend requests.
  - Viewing friends' profiles and activities.
- Query engine for recommending accounts based on user information and matching criteria.

### 3. Real-time Communication
- **Technology:** socket.io
- Provides real-time messaging and notifications.
- Allows direct messaging.
- Stores message histories in MongoDB.

### 4. Client-Side Application
- **Frameworks/Tools:** React, Redux, Bootstrap, Leaflet map
- Manages client-side info with reducers, thunks, and services.
- Features:
  - Displaying friend requests and friends' profiles.
  - Showcasing friends' locations on a map.
  - User input for matching, with server results paginated.
  - Profile and game list viewing/modification.
  - Chat histories and real-time messages.

### Minimal requirements:
- [x] 1. Implementing an authentication system with Firebase that can let users register or log in and then(if passing the authentication) access their private routes.
- [x] 2. Implementing an account system integrated with Firebase that restores users' information in the database, and allows users to send friend requests, accept requests, ignore requests and remove friends.
- [x] 3. Implementing a profile page for every account. Users are able to edit their profile and view others.

### Standard requirements:
- [x] 1. Implementing a query system that computes the match levels of different accounts in the database, which could later be removed or sending matching requests from the user.
  - Select from user's locations, games played, gaming platform and gender and filter users from backend with satisfied conditions.
- [x] 2. Be able to communicate with friends by sending direct messages.
- [x] 3. Display the user and this user's friends location on a map.
- [x] 4. Be able to select games from a list of games provided by the server, stored as part of user information.

### Stretch requirements:
- [ ] 1. Link games to account, display in-game achievement?
- [x] 2. Make messaging system respond in real time using WebSokect.
- [ ] 3. Send an invitation to everyone within an outlined area for people to join a users party/game
- [x] 4. Variable avatars for users to select, and show users avatar on matching, map, friend list and chat.
- [x] 5. Be able to add a new game to the list. Having search functionality to find a game in a large game list.

### Tech from units 1-5
<<<<<<< HEAD
Unit 1 – HTML, CSS, JS
Html mostly are later converted into React. CSS and JS are continued in usage because one is for styling and another is for functionalities. For example, avatars are styled by CSS, JS so that when hover the mouse over the avatar, the image faded and a text “see profile” showed up, navigate to it’s profile page when click the avatar. The chat page also almost entirely relies on CSS, every component uses a background color, and the round-corner effect for bars are achieved using the border-radius attribute in CSS.

Unit 2 – React & Redux
The frontend is heavily dependent on React. Some UI is imported from some React Libraries. Redux is utilized as well to ensure the robust user experience. For example, all user related inoformation on client side is managed in accountReducers, all api calls are managed in services and thunks.

Unit 3 – Node & Express
The backend server is writen by express. There are three major routes: one is for hosting all the images, one is all the endpoints related to accounts, while the other is related to games. Last two routes both interact with MongoDB with mongoose to implement the add, remove, delete, modify, querry functionalities of either accounts or games.

Unit 4 – MongoDB
We store all the user information and game list on an Atlas MongoDB database. Using Mongoose to connect the MongoDB database and the Node.js server. When the server gets a request, it can retrieve data from the database or store new data into the database.

Unit 5 – Builds and Deployment
We use render to deploy our static frontend website, express api backend and web socket for chatting

### Above and Beyond
For the real-time direct message feature, instead of using rest api call to implement the message transmission between client and server, we used web socket(socket.io) to make the transmission update without refreshing, so it respond in real-time.
We host image on our server as the avatar of users, instead using image on internet.
Implemented authentication system with Firebase that can let users register or log in and then(if passing the authentication) access their private routes.

### Next Steps
For next steps: First, we could refine the functionality of our matching and search function, we could also improve the map to take part in the matching process. Second, we could also perhaps make group chats as well and add the option to link your account to a steam account. Third, we can make more real-time notifications using socket.io, for example, showing popup alert when your friend is online, or when they send you gaming invitation.

=======
 <br> Unit 1 – HTML, CSS, JS
 <br> We use this for styling
 <br> Unit 2 – React & Redux
 <br> Used for most of the front end interaction along with using Redux to manage our state
 <br> Unit 3 – Node & Express
 <br> Used facilate our calls to our back end along with installing and running the application
 <br> Unit 4 – MongoDB
 <br> Used to store all of our information
 <br> Unit 5 – Builds and Deployment
 <br> Used render to deploy our front end back end and web socket
### Above and Beyond
Chat system
### Next Steps
Further refine our search function along with enhancing the user interface
>>>>>>> 6074fd3ae326194c82dd913ba556713c985f9fd2
### List of Contributions
- **Jasper:** Worked on the Map part of the web application which includes setting up the map api, creating the component, managing the redux of the data displayed on the map and calling the backend for everything map needs. Also dealt with all of the deployment and any issues that deployment presented.
- **Shawn:** Implemented the details of update page and matching page both on frontend and backend, and made some user friendly designs like one button to retrieve current location, and showing some information for potential matches.
- **Cheryl:** Worked on the layout and implementation for home page, profile page, update profile page and game selection page. Created API endpoints for games on the server side. Utilized React components for profile related pages to refactor the code and enhance its clarity.
- **Xueyong Zhang (Raymond):** Worked on the authetication implementation with Firbase. Create API endpoint for accounts and interact with MongoDB using mongoose on server. Manage user info on client side with redux and api calls with service and thunk. Implemented account system with friend interactions. Implemented real-time direct message feature with socket.io. Designed avatar for users and host images on server.
- **Dorothy:** Designed and implemented a dynamic chat interface, integrated real-time updates through socket listeners, managed state with React hooks, and refined UI/UX elements, such as auto-scroll for the chat history and visual feedback for friend selection. Backend integration, including API calls for message fetching and error handling, was also addressed to ensure seamless user interaction.


const getFriendsLocation = async (uid) => {
  if (uid) {
    const response = await fetch(`https://room9-backend.onrender.com/users/friendslocation/${uid}`, {
      method: 'GET',
    });
    return response.json();
  }
  };

export default {getFriendsLocation}
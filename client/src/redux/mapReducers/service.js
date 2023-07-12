const getFriendsLocation = async (uid) => {
    const response = await fetch(`http://localhost:5000/users/friendslocation/${uid}`, {
      method: 'GET',
    });
    return response.json();
  };

export default {getFriendsLocation}
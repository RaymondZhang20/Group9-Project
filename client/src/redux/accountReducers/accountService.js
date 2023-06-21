const getAccount = async (uid) => {
    const response = await fetch(`http://localhost:3001/users/${uid}`, {
        method: 'GET'
    });

    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    return data;
};

const updateAccount = async (acc) => {
    const response = await fetch(`http://localhost:3001/users/${acc.uid}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(acc)
    });

    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    return data;
};

export default {
    getAccount, updateAccount
};
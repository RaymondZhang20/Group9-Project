const getAccount = async (uid) => {
    const response = await fetch(`https://room9-backend.onrender.com/users/${uid}`, {
        method: 'GET'
    });

    const data = await response.json();
    if (!response.ok) {
        const errorMsg = data?.message;
        throw new Error(errorMsg)
    }
    return data;
};

const createAccount = async (acc) => {
    const response = await fetch(`https://room9-backend.onrender.com/users`, {
        method: 'POST',
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

const updateAccount = async (acc) => {
    const response = await fetch(`https://room9-backend.onrender.com/users/${acc.uid}`, {
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
    getAccount, updateAccount, createAccount
};

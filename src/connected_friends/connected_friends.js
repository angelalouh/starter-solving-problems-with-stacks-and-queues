const Queue = require("../lib/queue");

// G = graph object where the keys are the user's identity and values are an array of users they follow
// s = startUser
// r = endUser

const connected = (G, s, r) => {
    // Return false if graph is empty (has no keys)
    if (!Object.keys(G).length) {
        return false;
    }

    // Return true if startUser is equal to endUser
    if (s === r) {
        return true;
    }

    // Initializing new array, enqueued, that contains startUser
    const enqueued = [s];
    // Initializing a new empty queue named discovered
    const discovered = new Queue();

    // Enqueue startUser
    discovered.enqueue(s);

    // While discovered queue isn't empty, do the following:
    while (discovered.first) {
        // Dequeue a value from discovered and name it user
        const user = discovered.dequeue();
       
        // Iterating over each followedUser of graph[user]
        for (let i = 0; i < G[user].length; i++) {
            // Current followedUser of graph[user]
            const followedUser = G[user][i];

            // If followedUser is equal to endUser, returning true
            if (followedUser === r) {
                return true;
            }

            // If enqueued doesn't already include followedUser:
            if (!enqueued.includes(followedUser)) {
                // Adding followedUser to the enqueued array and the discovered queue
                enqueued.push(followedUser);
                discovered.enqueue(followedUser);
            }
        }
    }

    return false;
};

module.exports = connected;

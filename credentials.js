// @flow

const USER_CREDENTIALS = {
    armistice: {
        email: "armistice.peacemaker@codesignal.com",
        password: "food=love",
    },
    gimli: {
        email: "gimli.gloinovich@erebor.gov",
        password: "n3v3r.trust.4n.3lf",
    },
    adia: {
        email: "adia",
        password: "tatutatu1",
    },
    client123: {
        email: "client123",
        password: "123456",
    },
};

export function getEmail(username: string) {
    return (USER_CREDENTIALS[username] && USER_CREDENTIALS[username].email) || "";
}

export function getPassword(username: string) {
    return (USER_CREDENTIALS[username] && USER_CREDENTIALS[username].password) || "";
}
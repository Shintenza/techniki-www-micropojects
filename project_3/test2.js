class UserProfiler {
    constructor() {
        this.users = new Map();
    }

    addUser(userId, profile) {
        if (!this.users.has(userId)) {
            this.users.set(userId, { ...profile, creationDate: new Date() });
        }
    }

    updateUser(userId, profileUpdates) {
        if (this.users.has(userId)) {
            const currentProfile = this.users.get(userId);
            const updatedProfile = { ...currentProfile, ...profileUpdates };
            this.users.set(userId, updatedProfile);
        }
    }

    getUserProfile(userId) {
        return this.users.get(userId);
    }

    deleteUser(userId) {
        if (this.users.has(userId)) {
            this.users.delete(userId);
        }
    }
}

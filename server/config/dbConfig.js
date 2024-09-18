dbUserAccess = import.meta.env.VITE_DB_USER_ACCESS;
dbPassAccess = import.meta.env.VITE_DB_PASS_ACCESS;

const mongoDBURL = `mongodb+srv://${dbUserAccess}:${dbPassAccess}@cluster0.fscbhvn.mongodb.net/moments?retryWrites=true&w=majority&appName=Cluster0/moments`;

export default mongoDBURL;

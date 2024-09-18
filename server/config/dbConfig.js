dbUserAccess = process.env.DB_USER_ACCESS;
dbPassAccess = process.env.DB_PASS_ACCESS;

const mongoDBURL = `mongodb+srv://${dbUserAccess}:${dbPassAccess}@cluster0.fscbhvn.mongodb.net/moments?retryWrites=true&w=majority&appName=Cluster0/moments`;

export default mongoDBURL;

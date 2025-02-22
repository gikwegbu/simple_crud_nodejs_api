import mg from 'mongoose';

// Building the User Schema
const UserSchema = new mg.Schema({
    // id: {type: mg.Schema.Types.ObjectId, ref: 'User'},
    username: {type: String, required: true },
    email: {type: String, required: true, unique: true },
    auth: {
        password: {type: String, required: true, select: false }, // The false, stops the password from being fetched
        salt: {type: String, required: true, select: false },
        sessionToken: { type: String, select: false },
    }
});


// Building the User Model
export const UserModel = mg.model('User', UserSchema);

export const getUsers = () => UserModel.find();
export const getUserByEmail = (email: String) => UserModel.findOne( {email });
export const getUserByUsername = (username: String) => UserModel.findOne( {username});
export const getUserBySessionToken = (sessionToken: string) => UserModel.findOne({
    'auth.sessionToken': sessionToken,
});
export const getUserById = (id: string) => UserModel.findById(id);
export const createUser = (values: Record<string, any>) => new UserModel(values).save().then((user) => user.toObject()); // Create | Save and return the user object
export const deleteUserById = (id: string) => UserModel.findByIdAndDelete({_id: id});
export const updateUserById = (id: string, values: Record<string, any>) => UserModel.findByIdAndUpdate(id, values);

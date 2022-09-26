interface IUser extends Document {
  email: string;
  password: string;
  verified: boolean;
  firstName: string;
  lastName: string;
  intrests: string[];
}

export default IUser;

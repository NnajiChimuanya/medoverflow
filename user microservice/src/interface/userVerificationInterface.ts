interface IUserVerfication {
  userId: string;
  uniqueString: string;
  createdAt: Date;
  expiresAt: Date;
}

export default IUserVerfication;

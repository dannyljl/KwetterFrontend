import {FollowerDTO} from './FollowerDTO';

export class User {
  userId: number;
  bio: string;
  image: string;
  location: string;
  name: string;
  web: string;
  username: string;
  password: string;
  followers: FollowerDTO[];
  followings: FollowerDTO[];
}


import { ROLE } from "../../constants";

export interface UsersManagementPageProps {}

export interface User {
  avatar: string;
  country: string;
  dob: string;
  email: string;
  id: string;
  name: string;
  role: ROLE;
}

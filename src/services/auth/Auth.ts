import axios from "../ClientAxios"
import { UserHttpService,ParamsLoginService, UserResponse } from "../../interfaces/users/userInterface";

export class UserService implements UserHttpService {

  static instance : UserService | null = null;

  static get getInstance(){
    if(!UserService.instance){
      UserService.instance = new UserService();
    }

    return UserService.instance;
  }

  async login(data: ParamsLoginService) : Promise<UserResponse> {
    try {
      const resServer = await axios.post(data.url, data.data);
      return resServer.data
    } catch (error : any) {
      return { error }
    }
  }
  async logout(): Promise<object>  {
    try {
      return  await axios.post('logout');
    } catch (error : any) {
      return  error;
    }
  }
}

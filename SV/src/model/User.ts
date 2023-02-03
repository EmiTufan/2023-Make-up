export interface BasicUser {
    id: number,
  }
  export interface User extends BasicUser {
    username: string,
    password: string,
    img:string
}
 
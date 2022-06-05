class Credentials
{
  constructor(user: string, password: string)
  {
    this.user = user;
    this.password = password;
  }

  encodeBasicAuth = () =>
  {
    return btoa(this. user + ":" + credentials.password)
  }
  
  user: string;
  password: string;
}


const credentials = new Credentials("admin", "admin");
export default credentials;
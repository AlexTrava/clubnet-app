export enum RoutersPaths {
  MAIN = '/',
  ADMIN = '/admin',
  PROFILE = 'admin/:id',
  USERDETAIL = 'profile/:id',
  LOGIN = '/login',
  NOFOUND = '*'
}
export enum Status {
  LOADING = 'loading',
  SUCCES = 'succes',
  ERROR = 'error'
}
export enum MessagesType {
  NOTIFICATION = 'notification',
  MESSAGES = 'messages'
}

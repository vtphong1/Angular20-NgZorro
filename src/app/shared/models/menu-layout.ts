export interface IMenuLayout {
  key?: string,
  title: string,
  icon?: string,
  htmlIcon?: string,
  path?: string,
  role?: string,
  children?: IMenuLayout[],
}

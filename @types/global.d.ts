declare interface Fn<T = any> {
  (...args: T[]): T
}

// 任意对象
declare interface AnyObj<T = any> {
  [key: string]: T
  [key: number]: T
}

// 可以为空
declare type Nullable<T> = T | null

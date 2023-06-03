import { storageTypes } from "../enums/storage.enums";

interface StorageData {
  [key: string]: string | undefined;
}

interface Factory<T extends BaseStorage, K extends storageTypes> {
  create(namespace: string, type: K): T;
}

/**
 * 抽象存储基类用于复用封装模型以及逻辑
 */
abstract class BaseStorage {
  readonly namespace: string;
  protected constructor(namespace: string) {
    this.namespace = namespace;
  }
  abstract getItem(key: string): string | undefined;
  abstract setItem(
    key: string,
    value: string,
    expires?: number,
    domain?: string
  ): void;
  abstract removeItem(key: string): void;
  abstract clear(): void;
}

/**
 * Local存储类
 */
export class AppLocalStorage extends BaseStorage {
  private ls: Storage = window.localStorage;
  private localData: StorageData = {};
  constructor(namespace: string) {
    super(namespace);
    this.initLocalStorage();
  }

  /** 初始化根据namespace设置当前localStorage data */
  private initLocalStorage(): void {
    this.localData = JSON.parse(this.ls.getItem(this.namespace) || "{}");
    this.ls.setItem(this.namespace, JSON.stringify(this.localData));
  }

  getItem(key: string): string | undefined {
    return this.localData[key];
  }

  setItem(key: string, value: string): void {
    this.localData[key] = value;
    this.ls.setItem(this.namespace, JSON.stringify(this.localData));
  }

  removeItem(key: string): void {
    delete this.localData[key];
    this.ls.setItem(this.namespace, JSON.stringify(this.localData));
  }

  clear(): void {
    this.ls.setItem(this.namespace, JSON.stringify((this.localData = {})));
  }
}

/**
 * Session存储类
 */
export class AppSessionStorage extends BaseStorage {
  private ss: Storage = window.sessionStorage;
  private sessionData: StorageData = {};

  constructor(namespace: string) {
    super(namespace);
    this.initSessionStorage();
  }

  /** 初始化设置当前sessionStorage data */
  private initSessionStorage(): void {
    this.sessionData = JSON.parse(this.ss.getItem(this.namespace) || "{}");
    this.ss.setItem(this.namespace, JSON.stringify(this.sessionData));
  }

  getItem(key: string): string | undefined {
    return this.sessionData[key];
  }

  setItem(key: string, value: string): void {
    this.sessionData[key] = value;
    this.ss.setItem(this.namespace, JSON.stringify(this.sessionData));
  }

  removeItem(key: string): void {
    delete this.sessionData[key];
    this.ss.setItem(this.namespace, JSON.stringify(this.sessionData));
  }

  clear(): void {
    this.ss.setItem(this.namespace, JSON.stringify((this.sessionData = {})));
  }
}

// export const StorageFactory: Factory<AppLocalStorage | AppSessionStorage, storageTypes> = {
//   create(namespace: string, type: storageTypes): AppLocalStorage | AppSessionStorage {
//     switch (type) {
//       case storageTypes.LOCAL:
//         return new AppLocalStorage(namespace);
//       case storageTypes.SESSION:
//         return new AppSessionStorage(namespace);
//       default:
//         throw new Error(`Unsupported storage type: ${type}`);
//     }
//   }
// }


/**
 * 工厂模式创建localstorage 或 sessionStorage存储对象
 */
export class StorageFactory implements Factory<AppLocalStorage | AppSessionStorage, storageTypes> {
  public create(
      namespace: string,
      type: storageTypes
  ): AppLocalStorage | AppSessionStorage {
    switch (type) {
      case storageTypes.LOCAL:
        return new AppLocalStorage(namespace);
      case storageTypes.SESSION:
        return new AppSessionStorage(namespace);
      default:
        throw new Error(`Unsupported storage type: ${type}`);
    }
  }
}


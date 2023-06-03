export class AppCookieStorage {
  private readonly namespace: string;
  private readonly maxLength: number;
  constructor(namespace: string, maxLength: number = 200) {
    this.namespace = namespace;
    this.maxLength = maxLength;
  }

  private getNamespacedKey(key: string): string {
    return `${key}-${this.namespace}`;
  }

  /**
   * 获取cookie
   * @param key
   */
  getCookie(key: string): string | null | undefined {
    const namespacedKey = `${this.getNamespacedKey(key)}=`;
    const cookies = document.cookie;
    const start = cookies.indexOf(namespacedKey);
    if (start == -1) {
      return null;
    }
    let end = cookies.indexOf(";", start + namespacedKey.length);
    if (end == -1) {
      end = cookies.length;
    }
    let value = cookies.substring(start + namespacedKey.length, end);
    return decodeURIComponent(value);
  }

  /**
   * 设置cookie
   * @param key
   * @param value
   * @param maxAge 以秒为单位 e.g. 24 * 60 * 60
   * @param domain
   */
  setCookie = (
    key: string,
    value: string,
    maxAge: number,
    domain: string
  ): void => {
    if (typeof value !== "string") {
      throw new Error("cookie value must be a string!");
    }
    if (value.length > this.maxLength) {
      console.warn(
        `The maximum length of a cookie cannot exceed ${this.maxLength}!`
      );
    }
    const domainHost = domain || location.hostname;
    document.cookie = `${this.getNamespacedKey(
      key
    )}=${value};max-age=${maxAge};path=/;domain=${domainHost};`;
  };

  /**
   * 删除cookie
   * @param key
   * @param domain
   */
  removeCookie(key: string, domain: string): void {
    const domainHost = domain || location.hostname;
    document.cookie = `${this.getNamespacedKey(
      key
    )}=;max-age=0;path=/;domain=${domainHost};`;
  }
}

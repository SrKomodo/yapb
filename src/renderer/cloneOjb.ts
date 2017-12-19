function cloneObj(obj: any): Object {
  if (null == obj || "object" != typeof obj) return obj;

  if (obj instanceof Date) {
    const copy = new Date();
    copy.setTime(obj.getTime());
    return copy;
  }

  if (obj instanceof Array) {
    const copy = [];
    for (let i = 0; i < obj.length; i++) {
      copy[i] = cloneObj(obj[i]);
    }
    return copy;
  }

  if (obj instanceof Object) {
    const copy: any = {};
    for (const attr in obj) {
      if (obj.hasOwnProperty(attr)) {
        copy[attr] = cloneObj(obj[attr])
      };
    }
    return copy;
  }

  throw new Error("Unable to copy obj! Its type isn't supported.");
}

export default cloneObj;
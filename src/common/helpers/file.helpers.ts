import fs = require('fs');
export class FileHelper {
  public static readFileAsync(path: string) {
    return new Promise((resolve, reject) => {
      fs.readFile(path, (err, content) => {
        if (err) {
          reject(err);
        }
        resolve(content);
      });
    });
  }
}

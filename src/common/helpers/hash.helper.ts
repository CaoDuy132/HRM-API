import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

const SALT_ROUNDS = 10;

export class HashHelper {
  public static bcryptGenerateHash(
    data: string,
    saltRounds: number = SALT_ROUNDS,
  ): string {
    return bcrypt.hashSync(data, saltRounds);
  }

  public static bcryptCompareHash(raw: string, hash: string): boolean {
    return bcrypt.compareSync(raw, hash);
  }

  public static generateSHA256Hash(data: any): string {
    const hash = crypto.createHash('sha256');
    hash.update(JSON.stringify(data));
    return hash.digest('hex');
  }
}

import { Model } from 'objection';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {SECRET} from '@env';

class User extends Model {
  static tableName = 'users';

  async $beforeInsert(context) {
    await super.$beforeInsert(context);
    this.password = await bcrypt.hash(this.password, 10);
  }

  checkPassword(password) {
    return bcrypt.compareSync(password, this.password);
  }
 
 
  createToken() {
    return jwt.sign(
        { id: this.id, email: this.email },
        SECRET,
        {
            expiresIn: '3d'
        }
    );
}

  async response() {
    return {
        user: {
            name: this.name,
            email: this.email,
            id: this.id,
            avatar: this.avatar,
            bio: this.bio,
        },
        token: await this.createToken()
    };
  }
}

export default User;

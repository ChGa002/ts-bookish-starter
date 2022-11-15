import { User } from './User';
import { UserCopy } from './UserCopy';
import { Book } from './Book';
import { Copy } from './Copy';

// Copy.Book = Copy.belongsTo(Book);

User.belongsToMany(Copy, { through: UserCopy, foreignKey: 'user_id', otherKey: 'copy_id'});
Copy.belongsToMany(User, { through: UserCopy, foreignKey: 'copy_id', otherKey: 'user_id'});

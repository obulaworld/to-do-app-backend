import { User } from "../models";

const seeder = {

  emptyUserTable(done) {
    User.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true
    }).then(() => done());
  },

}

export default seeder;

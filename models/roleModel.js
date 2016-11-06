var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var RoleSchema = Schema({
  basicInfo: {
    name: String,
    nicknames: [String],
    coverImage: String,
    relatedCouples: [{type:Schema.Types.ObjectId,ref:'Couple'}],
    from: {type:Schema.Types.ObjectId,ref:'Origin'}
  },
  countInfo: {
    likeCount: Number,
    coupleCount: Number
  }
});
RoleSchema.statics.getOrCreate = function(name, fromOrigin, callback) {
  var Role = this;
  var result;
  this.find({'basicInfo.name': name}, function(err, role) {
    if (err) {
      console.log(err);
    }
    if (role.length === 0) {
      var newRole = new Role({
        basicInfo: {
          name: name,
          nicknames: [],
          relatedCouples:[],
          from: fromOrigin
        },
        countInfo: {
          likeCount: 0,
          coupleCount: 0,
        }
      });
      newRole.save();
      result = newRole;
    } else {
      role[0].countInfo.coupleCount += 1;
      result = role[0];
    }
    callback(result);
  });
};
//将Schema发布为Model
module.exports = mongoose.model("Role", RoleSchema);

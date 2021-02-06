const mongoose= require('mongoose');
const Schema = mongoose.Schema;
const TagSchema = new Schema({
    name: {
        type: String
        },
    tag: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ] 

}
);

module.exports = mongoose.model('tag', TagSchema);
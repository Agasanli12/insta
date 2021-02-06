const mongoose= require('mongoose');
const ProfileSchema = new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user'
    },
    username: {
      type: String
    },
    website: {
      type: String
    },
    location: {
      type: String
    },
    status: {
      type: String,
      required: true
    },
    skills: {
      type: [String],
      required: true
    },
    bio: {
      type: String
    },

    posts: [
      {
        post: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
        }
      }
    ],
    followings: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
        }
      }
    ],
    followers: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
        }
      }
    ],

    followrequests: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
        }
      }
    ],

    activities: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user'
        },
        activity_type: String,
        postid: String,
        date: {
          type: Date,
          default: Date.now
        }
      }
    ],

    directs: [
      
        {
          user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'user',
          },
          direct: [
            {
            text: String,
            texttype: String,
            }
          ]
         
          
          
        }
      
    ],

    private: {
      type: Boolean,
      default: false
    },
    



    date: {
        type: Date,
        default: Date.now
    }
}
);

module.exports = mongoose.model('profile', ProfileSchema);
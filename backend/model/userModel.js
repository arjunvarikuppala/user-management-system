import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'product name required'],
    
  },
  email: {
    type: String,
    required: [true, 'email required'],
    unique:true
  },
  //month-day-year
  DOB: {
    type: Date,
    required: [true, 'date of birth is required'],
    
  },
  mobilenumber: {
    type: Number,
    required:[true,'mobile number is required'],
    unique:true
  },
  status:{
    type:Boolean,
    default:true
  }
 
}, {
  timestamps: true,
  versionKey:false,
  strict:"throw"
});

export const UserModel = model('user', UserSchema);

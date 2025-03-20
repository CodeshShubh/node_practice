import mongoose from "mongoose";
import validator from 'validator';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "please Enter name"],
        minlength:[3, "min 3 letter length in name filed section"]
    },
    email:{
        type:String,
        required:[true, "Please Enter your Email"],
        unique:true,
        validate: {
            validator:validator.isEmail,
            message:"Please Enter valid Email"

        }
    },
    password:{
        type:String,
        required:[true, 'please Enter a Strong Password'],
        // minlength:[8, 'password length should be at least 8'],
        validate:{
            validator: (value)=> validator.isStrongPassword(value,{
                minLength:8,
                minLowercase:1,
                minUppercase:1,
                minNumbers:1,
                minSymbols:1
            }),
            message:'Password length min 8 character and an Lowercase an Uppercase an number and a symbol'
        }
    },
    role:{
        type:String,
        enum:["user", "admin"],
        default:"user"
    }
},{ timestamps: true })

userSchema.pre('save', async function(next){
     if(!this.isModified('password')) // here is modified is used for if password change during forget password 
     // only then hashed working other wise it called next()
          return next()
  this.password = await  bcrypt.hash(this.password, 10) // here this.passwored is basically (password)  so before 
  // save we hash it and hashed value return by bcrypt
  next()
})

// create this method and call this during login to match password
userSchema.methods.isCompaire = async function(password){
        const isMatched = await bcrypt.compare(password, this.password)
         return isMatched
}






userSchema.methods.jwtToken = function(){
  const token =   jwt.sign({_id:this._id}, process.env.PrivateKey , {expiresIn:"15d"})
  return token
}



const User = mongoose.model('User', userSchema)

export default User;
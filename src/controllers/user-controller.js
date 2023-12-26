const {UserService}=require('../services/index')

const userService=new UserService();

const  create=async(req,res)=>
{
try {
    const response=await userService.create({
        email:req.body.email,
        password:req.body.password
    });
    return res.status(201).json({
        success:true,
        message:'Succesfully created a new user',
        data:response,
        err:{}
    })

} catch (error) {
    console.log(error);
    return res.status(500).json({
        success:false,
        message:'Something went wrong',
        data:{},
        err:error
    })
}
}
const signIn = async (req, res) => {
    try {
        const response = await userService.signIn(req.body.email, req.body.password);
        return res.status(200).json({
            success: true,
            data: response,
            err: {},
            message: 'Successfully signed in'
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: 'Something went wrong',
            data: {},
            success: false,
            err: error
        });
    }
}

module.exports={
    create,
    signIn
}
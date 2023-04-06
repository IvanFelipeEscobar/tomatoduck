const {User} = require(`../models`)
const { signToken } = require("../utils/auth")

module.exports = {
    async getUser({user = null, params}, res){
        const me = await User.findOne({
            $or: [{_id: user ? user._id : params.id}, {username: params.username}]
        })
        !me
            ? res.status(400).json({message: `user not found`})
            : res.status(200).json(me)
    },
    async createUser ({body}, res){
        const user = await User.create(body)
        if(!user){
            return res.json(400).json({message: `something went wrong!!!`})}
        const token = signToken(user)
        res.json( {token, user})
    },
    async login({body}, res){
         const user = await User.findOne({
            $or: [{username: body.username}, {email: body.email}]
         })
         if(!user){
            return res.status(400).json({message: `user not found`})}
         const validPassword = await user.verifyPassword(body.password)
         if(!validPassword){
            return res.status(400).json({message: `wrong password`})}
         const token = signToken(user)
         res.json( {token, user})

    },
    async saveTodo({user, body}, res){
        try {
            const addTodo = await User.findOneAndUpdate(
                {_id: user._id},
                {$addToSet: {todos: body}},
                {new: true, runValidators: true}
            )
            return res.json(addTodo)
        } catch (error) {
            return res.status(400).json(error)
        }
    },
    async deleteTodo({user, params}, res){
        const rmTodo = await User.findOneAndUpdate(
            {_id: user._id},
            {$pull: {todos: {todoId: params.todoId}}},
            {new: true}
        )
        !rmTodo
            ? res.status(400).json({message: `no item found`})
            : res.json(rmTodo)
    }
}
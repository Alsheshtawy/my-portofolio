import { User } from "../../../database/models/user.model.js";
import bcrypt from "bcrypt"

export const addUser = async (req, res) => {
    req.body.password = bcrypt.hashSync(req.body.password, 8)
    let user = new User(req.body)
    await user.save()
    res.json({ message: "User added successfully", user })

}
export const getAllUsers = async (req, res) => {
    let user = await User.find()
    res.json({ message: "all users", user })
}


export const updateUser = async (req, res) => {
    let user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json({ message: "updated successfully", user })
}


export const deleteUser = async (req, res) => {
    let user = await User.findByIdAndDelete(req.params.id)
    res.json({ message: "deleted successfully", user })
} 
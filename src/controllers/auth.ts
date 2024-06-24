import { Request, Response } from 'express-serve-static-core'
import User from '../models/User'
import { IUserReqDto } from '../dtos/user.dto'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

// Register user
export const register = async (
	req: Request<{}, {}, IUserReqDto>,
	res: Response
) => {
	try {
		const { username, password } = req.body

		const isExist = await User.findOne({ username })

		if (isExist) {
			return res.json({ message: 'Данный username уже занят.' })
		}

		const salt = bcrypt.genSaltSync(10)
		const hash = bcrypt.hashSync(password, salt)

		const newUser = new User({
			username,
			password: hash
		})

		await newUser.save()

		res.json({
			newUser,
			message: 'Регистрация прошла успешно'
		})
	} catch (error) {
		res.json({ message: 'Ошибка при создании пользователя' })
	}
}

// Login user
export const login = async (
	req: Request<{}, {}, IUserReqDto>,
	res: Response
) => {
	try {
		const { username, password } = req.body

		const user = await User.findOne({ username })

		if (!user) {
			return res.json({ message: 'Пользователь не найден.' })
		}

		const isPasswordCorrect = await bcrypt.compare(password, user.password)

		if (!isPasswordCorrect) {
			return res.json({ message: 'Неверный пароль.' })
		}

		const token = jwt.sign(
			{
				id: user._id
			},
			process.env.JWT_SECRET as string,
			{ expiresIn: '30d' }
		)

		res.json({
			token,
			user
		})
	} catch (error) {
		res.json({
			message: 'Ошибка авторизации'
		})
	}
}

// Get Me
export const getMe = async (req: Request, res: Response) => {
	try {
		const user = await User.findById(req.userId)

		if (!user) {
			return res.json({ message: 'Пользователь не найден.' })
		}

		const token = jwt.sign(
			{
				id: user._id
			},
			process.env.JWT_SECRET as string,
			{ expiresIn: '30d' }
		)

		res.json({
			token,
			user
		})

	} catch (error) {
		res.json({
			message: 'Нет доступа'
		})
	}
}

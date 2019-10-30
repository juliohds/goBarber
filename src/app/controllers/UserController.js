import * as Yup from 'yup';
import User from '../models/User';

class UserController {
    async getAll(req, res) {
        const user = await User.findAll();
        return res.json({ user });
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string()
                .email()
                .required(),
            password: Yup.string()
                .required()
                .min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }
        return res.json({ message: 'User has been created' });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(6),
            password: Yup.string()
                .min(6)
                .when('oldPassword', (oldPassword, field) =>
                    oldPassword ? field.required() : field
                ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }
        return res.json({ message: 'User has been updated' });
    }

    async getById(req, res) {
        const user = await User.findOne({ where: { id: req.params.id } });
        return res.json({ user });
    }
}

export default new UserController();

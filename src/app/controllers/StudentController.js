/* eslint-disable class-methods-use-this */
import * as Yup from 'yup';

import User from '../models/User';
import Student from '../models/Student';

class StudentController {
    async store(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string().required(),
            email: Yup.string().email().required(),
        });

        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Validation fails.' });
        }

        const user = await User.findByPk(request.userId);

        if (!user) {
            return response.status(400).json({ error: 'Acess deined.' });
        }

        const studentExists = await Student.findOne({
            where: { email: request.body.email },
        });

        if (studentExists) {
            return response
                .status(400)
                .json({ error: 'Student already exists.' });
        }

        const { id, name, email, age, weight, size } = await Student.create(
            request.body
        );

        return response.json({
            id,
            name,
            email,
            age,
            weight,
            size,
        });
    }

    async update(request, response) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            age: Yup.number(),
            weight: Yup.number(),
            size: Yup.number(),
        });

        if (!(await schema.isValid(request.body))) {
            return response.status(400).json({ error: 'Validation fails.' });
        }

        const user = await User.findByPk(request.userId);

        if (!user) {
            return response.status(400).json({ error: 'Acess deined.' });
        }

        const student = await Student.findOne({
            where: { email: request.body.email },
        });

        if (!student) {
            return response
                .status(400)
                .json({ error: 'Student does not exists.' });
        }

        const { id, name, age, weight, size } = await student.update(
            request.body
        );

        return response.json({
            id,
            name,
            email: request.body.email,
            age,
            weight,
            size,
        });
    }
}

export default new StudentController();

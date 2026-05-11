import { zk, vk } from 'valikit';
import * as z from 'zod';
import * as v from 'valibot';

const data = {
	username: 'test',
	password: '1234XYZ',
};

const userZodSchema = z.object({
	username: zk.username(),
	password: zk.password(),
});

userZodSchema.decode(data);

const userValibotSchema = v.object({
	username: vk.username(),
	password: vk.password(),
});

v.parse(userValibotSchema, data);

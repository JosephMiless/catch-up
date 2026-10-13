import joi from "joi";

export const registerBookSchema = joi.object({
    title: joi.string().required(),
    author: joi.string().required(),
    genre: joi.string().required()
}).strict();
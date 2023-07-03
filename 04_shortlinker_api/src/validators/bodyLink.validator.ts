import Joi from "joi";

export const bodyScheema = Joi.object({
  link: Joi.string().uri().required(),
});

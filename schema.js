const Joi = require('joi');

module.exports.listingSchema = Joi.object({

     listing:Joi.object({   
        title:Joi.string().required(),
        description:Joi.string().required(),
        location:Joi.string().required(),
        country:Joi.string().required(),
        price:Joi.number().required().min(0),
        image:Joi.string().allow("",null),
     }).required()
   
});
 

module.exports.reviewSchema=Joi.object({
   
   review:Joi.object({
      rating:Joi.number().required().min(1).max(5),
      comment:Joi.string().required(),
   }).required()
});

 // username: Joi.string()
    //     .alphanum()
    //     .min(3)
    //     .max(30)
    //     .required(),

    // password: Joi.string()
    //     .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    // repeat_password: Joi.ref('password'),

    // access_token: [
    //     Joi.string(),
    //     Joi.number()
    // ],

    // birth_year: Joi.number()
    //     .integer()
    //     .min(1900)
    //     .max(2013),

    // email: Joi.string()
    //     .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
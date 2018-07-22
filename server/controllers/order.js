const Promise = require('bluebird');
const config = require('config');
const functions = require('functions');
const models = require('models');
const sequelize = models.sequelize;
const order = models.order;

module.exports = {
	create: async function (req, res) {
		try{
			let order = req.body;
			let val = {
				name:order.customer.name,
				order:('salad:'+order.ingredients.salad+' bacon:'+order.ingredients.bacon+' cheese:'+order.ingredients.cheese+' meat:'+order.ingredients.meat),
				address:order.customer.address.street+' '+order.customer.address.region+' '+order.customer.address.state+' '+order.customer.address.country,
				pincode:order.customer.address.zipCode,
				price:order.price
			}
			let data = await sequelize.query("INSERT INTO orders(userId,`order`,address,pincode,price,createdAt) VALUES(1,"+"'"+val.order+"'"+","+"'"+val.address+"'"+","+val.pincode+","+val.price+","+"'"+'2017-02-16 18:22:10.846'+"'"+")", {type: sequelize.QueryTypes.INSERT});
			res.send(data);
		}catch(error) {
			console.log(error);
		}
	}

}


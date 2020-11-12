const { Article } = require('../../model/Article');
const pagination = require('mongoose-sex-page');

module.exports = async (req, res) => {
	const {page} = req.query;
    let result = await pagination(Article).find().page(page).size(4).display(5).populate('author').exec();
    result = JSON.parse(JSON.stringify(result));
    res.render('home/default', {
        result,
    });
    // res.send(result)
};
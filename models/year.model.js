var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var YearSchema = new mongoose.Schema({
    name: { type: Number, required: true },
    expenses: { type: Object },
    revenues: { type: Object },
    propertiesOwned: { type: Array }
});


YearSchema.plugin(mongoosePaginate)
const Year = mongoose.model('Year', YearSchema)

module.exports = Year;
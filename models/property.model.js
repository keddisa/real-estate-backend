var mongoose = require('mongoose')
var mongoosePaginate = require('mongoose-paginate')


var PropertySchema = new mongoose.Schema({
    title: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipCode: { type: String, required: true },
    surfaceArea: { type: Number, required: true },
    bedrooms: { type: Number, required: true },
    bathrooms: { type: Number, required: true },
    garages: { type: Number },
    yearBuilt: { type: Number, required: true },
    lotArea: { type: Number },
    description: { type: String },
    status: { type: String, required: true },
    available: { type: Boolean, required: true },
    acquisitionPrice: { type: Number, required: true },
    acquisitionDate: { type: Number, required: true },
    taxValue: { type: Number, required: true },
    insuranceValue: { type: Number },
    propertyManagementFees: { type: Number },
    price: { type: Number, required: true }   //Sales price or rental rate
});


PropertySchema.plugin(mongoosePaginate)
const Property = mongoose.model('Property', PropertySchema)

module.exports = Property;
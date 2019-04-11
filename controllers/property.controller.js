var PropertyService = require('../services/properties.service.js');

var Property = require('../models/property.model.js')

exports.getProperties = async function(req, res, next){
  var page = req.query.page ? req.query.page : 1;
  var limit = req.query.limit ? req.query.limit : 10; 

  try{
    var properties = await PropertyService.getProperties({}, page, limit);
    return res.status(200).json({status: 200, data: properties, message: "Successfully Retrieved Properties"})
  } catch(e){
    return res.status(400).json({status: 400, message: e.message});
  }
}

exports.createProperty = async function(req, res, next){
  console.log(req.body);
   var property = {
    title: req.body.title,
    streetAddress: req.body.streetAddress,
    city: req.body.city,
    state: req.body.state,
    zipCode: req.body.zipCode,
    surfaceArea: req.body.surfaceArea,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    garages: req.body.garages,
    yearBuilt: req.body.yearBuilt,
    lotArea: req.body.lotArea,
    description: req.body.description,
    status: req.body.status,  //For Sale/ For Rent/ Rented/ Sold/ Other
    available: req.body.available,
    acquisitionPrice: req.body.acquisitionPrice,
    acquisitionDate: req.body.acquisitionDate,
    taxValue: req.body.taxValue,
    insuranceValue: req.body.insuranceValue,
    propertyManagementFees: req.body.propertyManagementFees,
    price: req.body.price //Sale or rental price
  }

  // title: { type: String, required: true },
  // streetAddress: { type: String, required: true },
  // city: { type: String, required: true },
  // state: { type: String, required: true },
  // zipCode: { type: String, required: true },
  // surfaceArea: { type: Number, required: true },
  // bedrooms: { type: Number, required: true },
  // bathrooms: { type: Number, required: true },
  // garage: { type: Number, required: true },
  // yearBuilt: { type: Number, required: true },
  // lotArea: { type: Number },
  // description: { type: String },
  // status: { type: String, required: true },
  // available: { type: Boolean, required: true },
  // name: { type: String, required: true },
  // acquisitionPrice: { type: Number, required: true },
  // acquisitionDate: { type: Number, required: true },
  // taxValue: { type: Number, required: true },
  // insuranceValue: { type: Number, required: true },
  // propertyManagementFees: { type: Number, required: true },
  // price: { type: Number, required: true }   //Sales price or rental rate

  try{
    var output = await property;
    console.log("controller "+output);
    var createdProperty = await PropertyService.createProperty(property);
    return res.status(201).json({status: 201, data: createdProperty, message: "Successfully created Property!"})
  } catch(e){
    return res.status(400).json({status: 400, message: e.message});
  }
  
}

exports.getProperty = async function(req, res, next) {
  const id = req.params.id
  Property.findById(id)
  .then(property => {
    console.log(property);
    return res.status(201).json({status: 201, data: property, message: "This works!"})
  })
  .catch(err => console.log(err));
}


exports.updateProperty = async function(req, res, next){

  if(!req.body._id){
    return res.status(400).json({status: 400, message: "ID must be present."});
  }

  var id = req.body._id;
  console.log(req.body);

  var property = {
    id,
    title: req.body.title ? req.body.title : null,
    streetAddress: req.body.streetAddress ? req.body.streetAddress : null,
    city: req.body.city ? req.body.city : null,
    state: req.body.state ? req.body.state : null,
    zipCode: req.body.zipCode ? req.body.zipCode : null,
    surfaceArea: req.body.surfaceArea ? req.body.surfaceArea : null,
    bedrooms: req.body.bedrooms ? req.body.bedrooms : null,
    bathrooms: req.body.bathrooms ? req.body.bathrooms : null,
    garages: req.body.garages ? req.body.garages : null,
    yearBuilt: req.body.yearBuilt ? req.body.yearBuilt : null,
    lotArea: req.body.lotArea ? req.body.lotArea : null,
    description: req.body.description ? req.body.description : null,
    status: req.body.status ? req.body.status : null,
    status: req.body.status ? req.body.status : null,
    available: req.body.available ? req.body.available : null,
    acquisitionPrice: req.body.acquisitionPrice ? req.body.acquisitionPrice : null,
    acquisitionDate: req.body.acquisitionDate ? req.body.acquisitionDate : null,
    taxValue: req.body.taxValue ? req.body.taxValue : null,
    insuranceValue: req.body.insuranceValue ? req.body.insuranceValue : null,
    propertyManagementFees: req.body.propertyManagementFees ? req.body.propertyManagementFees : null,
    price: req.body.price ? req.body.price : null
  }

  try{
    var updatedProperty = await PropertyService.updateProperty(property);
    return res.status(200).json({status: 200, data: Property, message: "Successfully updated property!"})
  } catch(e){
    return res.status(400).json({status: 400, message: e.message});
  }
}

exports.removeProperty = async function(req, res, next){
  var id = req.params.id;

  try{
    var deleted = await PropertyService.deleteProperty(id);
    return res.status(204).json({status: 204, message: "Successfully removed property."});
  } catch(e){
    return res.status(400).json({status: 400, message: e.message});
  }
}
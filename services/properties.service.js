var Property = require('../models/property.model.js')

exports.getProperties = async function(query, page, limit){
  var options = {
    page,
    limit
  }
  try {
    var properties = await Property.paginate(query, options);
    return properties;
  } catch(e){
    throw Error('Properties cannot be recalled at this stage')
  }
}

exports.createProperty = async function(property){
  
  var newProperty = new Property({
    title: property.title,
    streetAddress: property.streetAddress,
    city: property.city,
    state: property.state,
    zipCode: property.zipCode,
    surfaceArea: property.surfaceArea,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    garages: property.garages,
    yearBuilt: property.yearBuilt,
    lotArea: property.lotArea,
    description: property.description,
    status: property.status,  //For Sale/ For Rent/ Rented/ Sold/ Other
    available: property.available,
    acquisitionPrice: property.acquisitionPrice,
    acquisitionDate: property.acquisitionDate,
    taxValue: property.taxValue,
    insuranceValue: property.insuranceValue,
    propertyManagementFees: property.propertyManagementFees,
    price: property.price //Sale or rental price
  });

  try {
    console.log(newProperty);
    var savedProperty = await newProperty.save();
    return savedProperty;
  } catch(e){
    throw Error("Having difficulty creating a new property")
  }
}

exports.getProperty = async function(property) {
  const id = property.id;
  const showProperty = Property.findById(id);
  console.log(showProperty);
}

exports.updateProperty = async function(property){
  var id = property.id
  try {
    var oldProperty = await Property.findById(id);
  } catch(e){
    throw Error("Unable to find that property");
  }

  if(!oldProperty){
    return false;
  }

  console.log(oldProperty);

  oldProperty.title = property.title;
  oldProperty.streetAddress = property.streetAddress;
  oldProperty.city = property.city;
  oldProperty.state = property.state;
  oldProperty.zipCode = property.zipCode;
  oldProperty.surfaceArea = property.surfaceArea;
  oldProperty.bedrooms = property.bedrooms;
  oldProperty.bathrooms = property.bathrooms;
  oldProperty.garages = property.garages;
  oldProperty.yearBuilt = property.yearBuilt;
  oldProperty.lotArea = property.lotArea;
  oldProperty.description = property.description;
  oldProperty.status = property.status;  //For Sale/ For Rent/ Rented/ Sold/ Other
  oldProperty.available = property.available;
  oldProperty.acquisitionPrice = property.acquisitionPrice;
  oldProperty.acquisitionDate = property.acquisitionDate;
  oldProperty.taxValue = property.taxValue;
  oldProperty.insuranceValue = property.insuranceValue;
  oldProperty.propertyManagementFees = property.propertyManagementFees;
  oldProperty.price = property.price; //Sale or rental price

  console.log(oldProperty);

  try{
    console.log('about to try saving')
    var savedProperty = await oldProperty.save();
    console.log('finished saving')
    return savedProperty;
  }catch(e){
    throw Error("Update unsuccessful");
  }
}

exports.deleteProperty = async function(id){
  try{
    var deleted = await Property.deleteOne({_id: id});
    if(deleted.n === 0){
      throw Error("Property could not be deleted.")
    }
    return deleted
  } catch(e){
    throw Error("Can't delete the Property.")
  }
}
/**
 * A Reusable Crud Operations
 */

import Logger from "./Logger";

/**
 * Removed all Not allowed properties from the object
 * @param {Object} object - object with key value pairs 
 * @param {String[]} filterKeys - array of strings contains property names to allowed
 * @returns Object with only allowed properties
 */
export const filterObject = (object = {}, filterKeys = []) => {
  let filteredObject = {};
  filterKeys.forEach(key => object[key] ? filteredObject[key] = object[key] : null)
  return filteredObject;
}

/**
 * response All the data in the model which satisfy condition
 * @example
 * const inActiveUser: Array = await getByCondition(User, { active: false })
 * @param MODEL - Mongoose model object
 * @param {Object} condition - condition to filter document
 * @param {number} condition.pageNo - 0 based
 * @returns {Array} - All the data of models which satisfy condition
 */
export const getByCondition = async (MODEL, { pageNo = 0, ...query }, filterKeys = []) => {
  const filteredQuery = filterObject(query, filterKeys);
  let populate = [];

  if(filteredQuery.populate) {
    populate = filteredQuery.populate;
    delete filteredQuery.populate 
  }
  try {
    const LIMIT = 10;
    const dataQuery = MODEL.find(filteredQuery)
      .limit(LIMIT)
      .skip(pageNo * LIMIT)
    
    populate.forEach(populationField => {
      dataQuery.populate(populationField);
    })

    const data = await dataQuery.exec();
    

    return {
      data,
      pageNo: pageNo,
    };
  } catch (err) {
    Logger.error(err);
    throw err;
  }
};

/**
 * Create a new Object in the model collection
 * @example
 * const newUser: Object = await create(User, { name: "saikiran", age: 21, desigination: "founder"})
 * @param MODEL - Mongoose model object
 * @param {Object} createData - data of which object is to be created in the collection
 * @returns {Object} - Object created in the collextion
 */
export const create = async (MODEL, createData) => {
  try {
    const data = await MODEL.create(createData);
    return data;
  } catch (err) {
    throw err;
  }
};
/**
 * Find Object by Id and update its content
 * @example
 * const updatedUser: Object = await findByIdAndUpdate(User, "dasd2354dasd3a2sd46asd546asd13", { age: 21 })
 * @param {*} MODEL - Mongoose model Object
 * @param {String} _id - _Id which unique to the mongodb document
 * @param {Object} newData - Data which is to be added to the document
 * @returns {Object} - {n: 'number of document', nModified: 'number of document modified', ok: '1 success 0 failure'}
 */
const findByIdAndUpdate = async (MODEL, _id, newData) => {
  try {
    // do not update password from factory method
    if (newData.password) {
      delete newData.password;
    }
    const data = await MODEL.findByIdAndUpdate(
      _id,
      { $set: newData },
      { runValidators: true, new: true }
    );
    return data;
  } catch (err) {
    throw err;
  }
};

/**
 * Find Object by Id and delete Object
 * @example
 * const isUserDeleted: boolean = await findByIdAndDelete(User, "dasd5+6dsada565d4asd6a")
 * @param {*} MODEL - Mongoose model Object
 * @param {String} id  - Id which unique to the document
 * @returns {Boolean} - returns nothing throws error if something went work
 */
export const findByIdAndDelete = async (MODEL, id) => {
  try {
    await MODEL.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
};

/**
 * Find Object by Id
 * @example
 * const user = await findById(User, "dsd54a4sd654asd5a4d")
 * @param {*} Model - Mongoose Model Object
 * @param {*} id 
 * @returns {Object} - User Object
 */
const findById = async (Model, id) => {
  try {
    const document = await Model.findById(id);
    return document;
  } catch(err) {
    throw err;
  }
}

module.exports = {
  findById,
  findByIdAndDelete,
  findByIdAndUpdate,
  create,
  getByCondition
}

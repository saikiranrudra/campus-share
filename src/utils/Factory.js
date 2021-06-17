/**
 * A Reusable Crud Operations 
 */

/**
 * response All the data in the model which satisfy condition
 * @example
 * const inActiveUser: Array = await getByCondition(User, { active: false })
 * @param MODEL - Mongoose model object
 * @param {Object} condition - condition to filter document
 * @returns {Array} - All the data of models which satisfy condition
 */
const getByCondition = async (MODEL, condition = {}) => {
  const data = await MODEL.find(condition);
  return data;
}

/**
 * Create a new Object in the model collection
 * @example
 * const newUser: Object = await create(User, { name: "saikiran", age: 21, desigination: "founder"})
 * @param MODEL - Mongoose model object
 * @param {Object} createData - data of which object is to be created in the collection
 * @returns {Object} - Object created in the collextion
 */
const create = async (MODEL, createData) => {
  const data = await MODEL.create(createData);
  res.status(201).json(data);
}
/**
 * Find Object by Id and update its content
 * @example
 * const updatedUser: Object = await findByIdAndUpdate(User, "dasd2354dasd3a2sd46asd546asd13", { age: 21 })
 * @param {*} MODEL - Mongoose model Object
 * @param {String} id - Id which unique to the document
 * @param {Object} - Data which is to be added to the document
 */
const findByIdAndUpdate = async (MODEL, id, newData) => {
  const data = await MODEL.findByIdAndUpdate(id, newData, { new: true });
  return data
}

/**
 * Find Object by Id and delete Object
 * @example
 * const isUserDeleted: boolean = await findByIdAndDelete(User, "dasd5+6dsada565d4asd6a")
 * @param {*} MODEL - Mongoose model Object
 * @param {String} id  - Id which unique to the document
 * @returns {boolean} - True if object is successfully deleted
 */
const findByIdAndDelete = async (MODEL, id) => {
  await MODEL.findByIdAndDelete(id);
  return true;
}

module.exports = {
  getByCondition,
  findByIdAndUpdate,
  findByIdAndDelete,
  create
}
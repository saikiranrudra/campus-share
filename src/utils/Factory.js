/**
 * A Reusable Crud Operations
 */

/**
 * response All the data in the model which satisfy condition
 * @example
 * const inActiveUser: Array = await getByCondition(User, { active: false })
 * @param MODEL - Mongoose model object
 * @param {Object} condition - condition to filter document
 * @param {number} condition.pageNo - 0 based
 * @returns {Array} - All the data of models which satisfy condition
 */
const getByCondition = async (MODEL, { pageNo = 0, ...query }) => {
  try {
    const LIMIT = 10;
    const data = await MODEL.find(query)
      .limit(LIMIT)
      .skip(pageNo * LIMIT)
      .exec();

    return {
      data,
      count: data.length,
      pageNo: pageNo,
    };
  } catch (err) {
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
const create = async (MODEL, createData) => {
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
 * @returns {Boolean} - True if object is successfully deleted
 */
const findByIdAndDelete = async (MODEL, id) => {
  try {
    await MODEL.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getByCondition,
  findByIdAndUpdate,
  findByIdAndDelete,
  create,
};

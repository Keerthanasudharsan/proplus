exports.paginateResults = (model, limit, page) => {
    return model.find().limit(limit).skip((page - 1) * limit);
  };
  
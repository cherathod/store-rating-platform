
//Send success response

function success(res, message = "Success", data = null, status = 200) {
  return res.status(status).json({
    success: true,
    message,
    data,
  });
}


// Send error response
function error(res, message = "Something went wrong", status = 500, errors = null) {
  return res.status(status).json({
    success: false,
    message,
    errors,
  });
}

module.exports = {
  success,
  error,
};

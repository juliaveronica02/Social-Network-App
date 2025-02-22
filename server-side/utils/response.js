/**
 * Helper function to standardize the response structure.
 * 
 * @param {Object} res - The response object from Express.
 * @param {Object} data - The data to be returned in the response.
 * @param {String} msg - A message to describe the response.
 * @param {Boolean} isSuccess - Whether the request was successful or not.
 * @param {String} debug - Any debug info or error message.
 */
function sendResponse(res, data = null, msg = "", isSuccess = true, debug = null) {
    res.json({
        data,
        msg,
        isSuccess,
        debug
    });
}

module.exports = sendResponse;
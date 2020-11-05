const config = require("../config/config");
const AWS = require("aws-sdk");

AWS.config.update({
  accessKeyId: config.amazon.KEY,
  secretAccessKey: config.amazon.SECRET,
});

const s3 = new AWS.S3();

module.exports.uploadFile = async (buffer, name, type) => {
  const params = {
    ACL: "public-read",
    Body: buffer,
    Bucket: config.amazon.BUCKET_NAME,
    ContentType: type.mime,
    Key: `${name}.${type.ext}`,
  };
  return s3.upload(params).promise();
};

module.exports.deleteFile = async (key) => {
  const params = {
    Bucket: config.amazon.BUCKET_NAME,
    Key: key,
  };
  return s3.deleteObject(params).promise();
};

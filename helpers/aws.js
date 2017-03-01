const getOptions = () => ({
  s3Url     : process.env.S3_URL || 'https://s3-us-west-2.amazonaws.com',
  bucketName: process.env.BUCKET_NAME || 'timecards-dev',
});

const generateScreenshotUrl = (date, userId, entryId) => {
  const { s3Url, bucketName } = getOptions();
  return `${s3Url}/${bucketName}/${date}/${userId}/${entryId}`;
};

module.exports = {
  generateScreenshotUrl
};
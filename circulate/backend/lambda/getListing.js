const AWS = require('aws-sdk');
const dynamodb = new AWS.DynamoDB.DocumentClient();
const s3 = new AWS.S3();

exports.handler = async (event) => {
  const dynamoParams = {
    TableName: 'CustomerListing',
  };

  try {
    const data = await dynamodb.scan(dynamoParams).promise();
    const listings = data.Items;

    const listingsWithImages = await Promise.all(
      listings.map(async (listing) => {
        if (listing.imageKey) {
          const s3Params = {
            Bucket: 'circulateproductdata', 
            Key: listing.imageKey,
            Expires: 3600 // URL valid for 1 hour
          };

          try {
            // Generate a pre-signed URL
            const imageUrl = s3.getSignedUrl('getObject', s3Params);
            listing.imageUrl = imageUrl;
          } catch (s3Error) {
            console.error(`Error generating signed URL for listing ${listing.listingId}:`, s3Error);
            listing.imageUrl = null;
          }
        } else {
          listing.imageUrl = null;
        }
        return listing;
      })
    );

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "Content-Type,X-Amz-Date,Authorization,X-Api-Key,X-Amz-Security-Token",
        "Access-Control-Allow-Methods": "OPTIONS,GET,POST",
      },
      body: JSON.stringify(listingsWithImages),
    };
  } catch (err) {
    console.error("Error retrieving listings:", err);
    return {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({ error: 'Could not retrieve listings' }),
    };
  }
};

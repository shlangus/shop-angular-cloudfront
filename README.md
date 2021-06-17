## Task 2

### Manually created hosting using S3 and CloudFront:

S3 bucket (should return 403):
https://node-cloud-demo.s3-eu-west-1.amazonaws.com

S3 static hosting (should return 403):
http://node-cloud-demo.s3-website-eu-west-1.amazonaws.com/

CloudFront (should work):
https://d326p4e2s4s6it.cloudfront.net/

### Automated, made as a second bucket and CloudFront distribution:

#### Usage

If CloudFront is not created yet (first time usage)

`npm run cloudfront:setup`

after that build & deploy can be done by

`npm run build_and_deploy`

#### Links

S3 bucket (should return 403):
https://node-cloud-demo-2.s3-eu-west-1.amazonaws.com

S3 static hosting (should return 403):
http://node-cloud-demo-2.s3-website-eu-west-1.amazonaws.com/

CloudFront (should work):
https://d3uu5xarltty69.cloudfront.net

#Task 3
Deployed as a new project:
https://d3efqt27tbkk5.cloudfront.net/
(See /products request sent to api gw url)

#Task 4
Deployed as a new project because it needs a separate service connected to DB
https://d2ymm5l6rcwor7.cloudfront.net/

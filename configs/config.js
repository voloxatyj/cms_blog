const config = {};

config.next_public_graphcms_endpoint = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT || 'https://api-eu-central-1.graphcms.com/v2/ckxxfmv901aga01yuhp2ff3cv/master';
const dev = process.env.NODE_ENV !== 'production';

config.server = 'http://localhost:3000' || 'https://your_deployment.server.com';

module.exports.config = config;
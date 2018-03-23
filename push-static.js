const ghpages = require(`gh-pages`);

ghpages.publish(`static-out`, err => console.error(err));

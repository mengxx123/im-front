let apiDomain
if (process.env.NODE_ENV === 'production') {
    apiDomain = 'http://api.font.yunser.com'
} else {
    apiDomain = 'http://localhost:3000'
}

module.exports = {
    apiDomain
}

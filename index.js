const app = require('./app');

app.listen(process.env.PORT, () => {
    console.log(`Database connecting, please wait...`);
});

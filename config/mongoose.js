const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/codeial_dev')

main().catch((err) => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/codeial_dev');
}
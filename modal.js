// import modules
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

//create an schema
const StoreSchema = new mongoose.Schema({
        title: {
            type: String,
            trim: true,
            required: true,
            maxLength: 120
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
        },
        discount: {
            type: Number,
        }
    },

    { timestamps : true }
);

module.exports = mongoose.model("stores", StoreSchema);
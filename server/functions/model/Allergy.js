const mongoose = require('mongoose');

const allergySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    ingredients: {
        type: Array,
    },
});

const Allergy = mongoose.model('Allergy', allergySchema);

module.exports = Allergy;
const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true
    },
    employeeType: {
        type: String,
        required: true,
        enum: ['Full-time', 'Part-time', 'Contract', 'Intern']
    },
    department: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: 'default-profile.png'
    },
    joiningDate: {
        type: Date,
        required: true
    },
    salary: {
        type: Number,
        required: true
    },
    address: {
        street: String,
        city: String,
        state: String,
        zipCode: String,
        country: String
    },
    status: {
        type: String,
        enum: ['Active', 'Inactive', 'On Leave'],
        default: 'Active'
    }
}, {
    timestamps: true
});

// Create index for search functionality
employeeSchema.index({ 
    firstName: 'text', 
    lastName: 'text', 
    email: 'text', 
    department: 'text', 
    position: 'text' 
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee; 
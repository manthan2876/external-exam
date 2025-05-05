const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Employee = require('../models/employee.model');
const { auth, adminAuth } = require('../middleware/auth.middleware');

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (extname && mimetype) {
            return cb(null, true);
        }
        cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
    }
});

// Get all employees
router.get('/', auth, async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employees', error: error.message });
    }
});

// Search employees
router.get('/search', auth, async (req, res) => {
    try {
        const { query } = req.query;
        const employees = await Employee.find({
            $text: { $search: query }
        });
        res.json(employees);
    } catch (error) {
        res.status(500).json({ message: 'Error searching employees', error: error.message });
    }
});

// Get single employee
router.get('/:id', auth, async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching employee', error: error.message });
    }
});

// Create new employee
router.post('/', [auth, adminAuth, upload.single('profilePicture')], async (req, res) => {
    try {
        const employeeData = {
            ...req.body,
            profilePicture: req.file ? req.file.filename : 'default-profile.png'
        };
        
        const employee = new Employee(employeeData);
        await employee.save();
        
        res.status(201).json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Error creating employee', error: error.message });
    }
});

// Update employee
router.put('/:id', [auth, adminAuth, upload.single('profilePicture')], async (req, res) => {
    try {
        const updateData = { ...req.body };
        if (req.file) {
            updateData.profilePicture = req.file.filename;
        }

        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json(employee);
    } catch (error) {
        res.status(500).json({ message: 'Error updating employee', error: error.message });
    }
});

// Delete employee
router.delete('/:id', [auth, adminAuth], async (req, res) => {
    try {
        const employee = await Employee.findByIdAndDelete(req.params.id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ message: 'Employee deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting employee', error: error.message });
    }
});

module.exports = router; 
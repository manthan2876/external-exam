import { useState, useEffect } from 'react';
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    TextField,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Typography,
    Avatar
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Visibility as ViewIcon,
    Add as AddIcon
} from '@mui/icons-material';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';

const EmployeeList = () => {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const [openView, setOpenView] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/employees');
            setEmployees(response.data);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    useEffect(() => {
        fetchEmployees();
    }, []);

    const handleSearch = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/employees/search?query=${searchQuery}`);
            setEmployees(response.data);
        } catch (error) {
            console.error('Error searching employees:', error);
        }
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/employees/${selectedEmployee._id}`);
            setOpenDelete(false);
            fetchEmployees();
        } catch (error) {
            console.error('Error deleting employee:', error);
        }
    };

    const handleSubmit = async (formData) => {
        try {
            if (selectedEmployee) {
                await axios.put(`http://localhost:5000/api/employees/${selectedEmployee._id}`, formData);
            } else {
                await axios.post('http://localhost:5000/api/employees', formData);
            }
            setOpenForm(false);
            fetchEmployees();
        } catch (error) {
            console.error('Error saving employee:', error);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
                <TextField
                    label="Search Employees"
                    variant="outlined"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    sx={{ width: '300px' }}
                />
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                        setSelectedEmployee(null);
                        setOpenForm(true);
                    }}
                >
                    Add Employee
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Profile</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Department</TableCell>
                            <TableCell>Position</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {employees.map((employee) => (
                            <TableRow key={employee._id}>
                                <TableCell>
                                    <Avatar
                                        src={`http://localhost:5000/uploads/${employee.profilePicture}`}
                                        alt={`${employee.firstName} ${employee.lastName}`}
                                    />
                                </TableCell>
                                <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                                <TableCell>{employee.email}</TableCell>
                                <TableCell>{employee.department}</TableCell>
                                <TableCell>{employee.position}</TableCell>
                                <TableCell>{employee.employeeType}</TableCell>
                                <TableCell>
                                    <IconButton
                                        onClick={() => {
                                            setSelectedEmployee(employee);
                                            setOpenView(true);
                                        }}
                                    >
                                        <ViewIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            setSelectedEmployee(employee);
                                            setOpenForm(true);
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => {
                                            setSelectedEmployee(employee);
                                            setOpenDelete(true);
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {/* Employee Form Dialog */}
            <Dialog open={openForm} onClose={() => setOpenForm(false)} maxWidth="md" fullWidth>
                <DialogTitle>
                    {selectedEmployee ? 'Edit Employee' : 'Add New Employee'}
                </DialogTitle>
                <DialogContent>
                    <EmployeeForm
                        employee={selectedEmployee}
                        onSubmit={handleSubmit}
                        onCancel={() => setOpenForm(false)}
                    />
                </DialogContent>
            </Dialog>

            {/* View Employee Dialog */}
            <Dialog open={openView} onClose={() => setOpenView(false)}>
                <DialogTitle>Employee Details</DialogTitle>
                <DialogContent>
                    {selectedEmployee && (
                        <Box sx={{ p: 2 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                                <Avatar
                                    src={`http://localhost:5000/uploads/${selectedEmployee.profilePicture}`}
                                    alt={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
                                    sx={{ width: 100, height: 100 }}
                                />
                            </Box>
                            <Typography variant="h6" gutterBottom>
                                {`${selectedEmployee.firstName} ${selectedEmployee.lastName}`}
                            </Typography>
                            <Typography>Email: {selectedEmployee.email}</Typography>
                            <Typography>Phone: {selectedEmployee.phone}</Typography>
                            <Typography>Department: {selectedEmployee.department}</Typography>
                            <Typography>Position: {selectedEmployee.position}</Typography>
                            <Typography>Employee Type: {selectedEmployee.employeeType}</Typography>
                            <Typography>Joining Date: {new Date(selectedEmployee.joiningDate).toLocaleDateString()}</Typography>
                            <Typography>Status: {selectedEmployee.status}</Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenView(false)}>Close</Button>
                </DialogActions>
            </Dialog>

            {/* Delete Confirmation Dialog */}
            <Dialog open={openDelete} onClose={() => setOpenDelete(false)}>
                <DialogTitle>Confirm Delete</DialogTitle>
                <DialogContent>
                    <Typography>
                        Are you sure you want to delete {selectedEmployee?.firstName} {selectedEmployee?.lastName}?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDelete(false)}>Cancel</Button>
                    <Button onClick={handleDelete} color="error">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default EmployeeList; 
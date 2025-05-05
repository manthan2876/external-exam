import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
    Box,
    Grid,
    TextField,
    Button,
    MenuItem,
    FormControl,
    InputLabel,
    Select
} from '@mui/material';

const validationSchema = Yup.object({
    firstName: Yup.string().required('First name is required'),
    lastName: Yup.string().required('Last name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    phone: Yup.string().required('Phone number is required'),
    employeeType: Yup.string().required('Employee type is required'),
    department: Yup.string().required('Department is required'),
    position: Yup.string().required('Position is required'),
    joiningDate: Yup.date().required('Joining date is required'),
    salary: Yup.number().required('Salary is required').min(0, 'Salary must be positive'),
    address: Yup.object({
        street: Yup.string().required('Street is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        zipCode: Yup.string().required('Zip code is required'),
        country: Yup.string().required('Country is required')
    })
});

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
    const formik = useFormik({
        initialValues: {
            firstName: employee?.firstName || '',
            lastName: employee?.lastName || '',
            email: employee?.email || '',
            phone: employee?.phone || '',
            employeeType: employee?.employeeType || '',
            department: employee?.department || '',
            position: employee?.position || '',
            joiningDate: employee?.joiningDate ? new Date(employee.joiningDate).toISOString().split('T')[0] : '',
            salary: employee?.salary || '',
            address: {
                street: employee?.address?.street || '',
                city: employee?.address?.city || '',
                state: employee?.address?.state || '',
                zipCode: employee?.address?.zipCode || '',
                country: employee?.address?.country || ''
            }
        },
        validationSchema,
        onSubmit: (values) => {
            onSubmit(values);
        }
    });

    return (
        <Box component="form" onSubmit={formik.handleSubmit} sx={{ mt: 2 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        name="firstName"
                        label="First Name"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        name="lastName"
                        label="Last Name"
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
                        helperText={formik.touched.lastName && formik.errors.lastName}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        name="email"
                        label="Email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        name="phone"
                        label="Phone"
                        value={formik.values.phone}
                        onChange={formik.handleChange}
                        error={formik.touched.phone && Boolean(formik.errors.phone)}
                        helperText={formik.touched.phone && formik.errors.phone}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControl fullWidth>
                        <InputLabel>Employee Type</InputLabel>
                        <Select
                            name="employeeType"
                            value={formik.values.employeeType}
                            onChange={formik.handleChange}
                            error={formik.touched.employeeType && Boolean(formik.errors.employeeType)}
                        >
                            <MenuItem value="Full-time">Full-time</MenuItem>
                            <MenuItem value="Part-time">Part-time</MenuItem>
                            <MenuItem value="Contract">Contract</MenuItem>
                            <MenuItem value="Intern">Intern</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        name="department"
                        label="Department"
                        value={formik.values.department}
                        onChange={formik.handleChange}
                        error={formik.touched.department && Boolean(formik.errors.department)}
                        helperText={formik.touched.department && formik.errors.department}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        name="position"
                        label="Position"
                        value={formik.values.position}
                        onChange={formik.handleChange}
                        error={formik.touched.position && Boolean(formik.errors.position)}
                        helperText={formik.touched.position && formik.errors.position}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        name="joiningDate"
                        label="Joining Date"
                        type="date"
                        value={formik.values.joiningDate}
                        onChange={formik.handleChange}
                        error={formik.touched.joiningDate && Boolean(formik.errors.joiningDate)}
                        helperText={formik.touched.joiningDate && formik.errors.joiningDate}
                        InputLabelProps={{ shrink: true }}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        name="salary"
                        label="Salary"
                        type="number"
                        value={formik.values.salary}
                        onChange={formik.handleChange}
                        error={formik.touched.salary && Boolean(formik.errors.salary)}
                        helperText={formik.touched.salary && formik.errors.salary}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        name="address.street"
                        label="Street"
                        value={formik.values.address.street}
                        onChange={formik.handleChange}
                        error={formik.touched.address?.street && Boolean(formik.errors.address?.street)}
                        helperText={formik.touched.address?.street && formik.errors.address?.street}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        name="address.city"
                        label="City"
                        value={formik.values.address.city}
                        onChange={formik.handleChange}
                        error={formik.touched.address?.city && Boolean(formik.errors.address?.city)}
                        helperText={formik.touched.address?.city && formik.errors.address?.city}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        name="address.state"
                        label="State"
                        value={formik.values.address.state}
                        onChange={formik.handleChange}
                        error={formik.touched.address?.state && Boolean(formik.errors.address?.state)}
                        helperText={formik.touched.address?.state && formik.errors.address?.state}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        name="address.zipCode"
                        label="Zip Code"
                        value={formik.values.address.zipCode}
                        onChange={formik.handleChange}
                        error={formik.touched.address?.zipCode && Boolean(formik.errors.address?.zipCode)}
                        helperText={formik.touched.address?.zipCode && formik.errors.address?.zipCode}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        name="address.country"
                        label="Country"
                        value={formik.values.address.country}
                        onChange={formik.handleChange}
                        error={formik.touched.address?.country && Boolean(formik.errors.address?.country)}
                        helperText={formik.touched.address?.country && formik.errors.address?.country}
                    />
                </Grid>
            </Grid>
            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                <Button variant="outlined" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit" variant="contained">
                    {employee ? 'Update' : 'Create'}
                </Button>
            </Box>
        </Box>
    );
};

export default EmployeeForm; 
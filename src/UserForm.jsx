import React, { useEffect, useState } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';

function UserForm({ user, onSave, onCancel }) {
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.name) tempErrors.name = "Name is required.";
    if (!formData.email) tempErrors.email = "Email is required.";
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSave(formData);
    }
  };

  return (
    <Dialog open onClose={onCancel}>
      <DialogTitle>{user._id ? 'Edit User' : 'Add User'}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin='dense'
          name='name'
          label='Name'
          type='text'
          fullWidth
          value={formData.name}
          onChange={handleChange}
          error={!!errors.name}
          helperText={errors.name}
        />
        <TextField
          margin='dense'
          name='email'
          label='Email'
          type='email'
          fullWidth
          value={formData.email}
          onChange={handleChange}
          error={!!errors.email}
          helperText={errors.email}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel} color='primary'>Cancel</Button>
        <Button onClick={handleSubmit} color='primary'>Save</Button>
      </DialogActions>
    </Dialog>
  );
}

export default UserForm;

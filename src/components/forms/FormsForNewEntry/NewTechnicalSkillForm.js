import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

export default function NewTechnicalSkillForm({
  open,
  setOpen,
  addNewTechnicalSkill,
}) {
  const [skill, setSkill] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const response = await addNewTechnicalSkill({
      skill: skill,
    });
    setSkill('');
  };

  return (
    <Box
      sx={{
        display: open ? 'flex' : 'none',
        width: 'inherit',
        flexDirection: {
          xs: 'column',
          sm: 'row',
        },
        width: '100%',
        gap: 1,
      }}
      component="form"
      onSubmit={handleSubmit}
    >
      <TextField
        autoComplete="off"
        name="tech-skill"
        required
        fullWidth
        id="tech-skill"
        label="Type your skill here"
        size="small"
        value={skill}
        autoFocus
        onChange={(e) => setSkill(e.target.value)}
      />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          gap: 1,
        }}
      >
        <Button
          fullWidth
          size="small"
          color="error"
          variant="contained"
          onClick={() => setOpen(false)}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          fullWidth
          size="small"
          color="success"
          variant="contained"
        >
          Add
        </Button>
      </Box>
    </Box>
  );
}

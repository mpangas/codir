import { useState } from 'react';
import { Button, FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface FilterButtonProps {
    label: string;
    options: string[];
    value: string | undefined;
    onChange: (value: string) => void;
}

function FilterButton({ label, options, value, onChange }: FilterButtonProps) {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as string);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                <Select
                    value={value ?? ''}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {options.map((option) => (
                        <MenuItem key={option} value={option}>
                            {option}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
}

export default FilterButton;

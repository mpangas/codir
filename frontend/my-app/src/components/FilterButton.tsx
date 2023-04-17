import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface FilterButtonProps {
    defaultOption: string;
    options: string[];
    value: string | undefined;
    onChange: (value: string) => void;
    sx?: object;
    size?: 'small' | 'medium';
    defaultDisabled ?: boolean;
}

function FilterButton({ defaultOption, options, value, onChange, sx, size = 'small', defaultDisabled = false}: FilterButtonProps) {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as string);
    };

    return (
        <div>
            <FormControl sx={{...sx}} size={size}>
                <Select
                    value={value ?? defaultOption}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem key={defaultOption} value={defaultOption} disabled={defaultDisabled}>
                        {defaultOption}
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

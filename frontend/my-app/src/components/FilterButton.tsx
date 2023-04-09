import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material';

interface FilterButtonProps {
    defaultOption: string;
    options: string[];
    value: string | undefined;
    onChange: (value: string) => void;
}

function FilterButton({ defaultOption, options, value, onChange }: FilterButtonProps) {
    const handleChange = (event: SelectChangeEvent) => {
        onChange(event.target.value as string);
    };

    return (
        <div>
            <FormControl sx={{ m: 1, width: 180}} size="small">
                <Select
                    value={value ?? ''}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="">
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

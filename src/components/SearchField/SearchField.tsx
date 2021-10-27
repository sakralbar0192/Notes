import React, { FC } from 'react';
import { FormGroup, Input, Label } from 'reactstrap';

interface ISearchFieldProps {
    searchQuery: string
    setSearchQuery: (s:string)=>void
}

const SearchField:FC<ISearchFieldProps> = ({searchQuery,setSearchQuery}) => {
    const searchHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchQuery(value)
    }

    return (
        <FormGroup>
            <Label for="note-description">Enter your query</Label>
            <Input type="text" id="note-description" placeholder="search query..."  value={searchQuery} onChange={searchHandler} />
        </FormGroup>
    );
};

export default SearchField;
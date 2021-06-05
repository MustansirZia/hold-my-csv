/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react';
import { Country } from '../../../src/domains/repository/types';
import Table, { TableColumn } from '../../../src/ui/components/Table';

const countries: Array<Country> = [
    {
        id: '1',
        name: 'USA',
        president: 'Joe Biden',
        capital: 'Washinton DC',
        nationalLanguage: 'English',
        population: 12321312,
    },
    {
        id: '2',
        name: 'UK',
        president: 'Chuck Norris',
        capital: 'London',
        nationalLanguage: 'English',
        population: 1212,
    },
    {
        id: '3',
        name: 'France',
        president: 'Macaroni',
        capital: 'Paris',
        nationalLanguage: 'French',
        population: 12123,
    },
    {
        id: '4',
        name: 'France 4',
        president: 'Macaroni 4',
        capital: 'Paris 4',
        nationalLanguage: 'French',
        population: 12123,
    },
    {
        id: '5',
        name: 'France 5',
        president: 'Macaroni 5',
        capital: 'Paris 5',
        nationalLanguage: 'French',
        population: 12123,
    },
    {
        id: '6',
        name: 'France 6',
        president: 'Macaroni 6',
        capital: 'Paris 6',
        nationalLanguage: 'French',
        population: 12123,
    },
    {
        id: '7',
        name: 'France 7',
        president: 'Macaroni 7',
        capital: 'Paris 7',
        nationalLanguage: 'French',
        population: 12123,
    },
    {
        id: '8',
        name: 'France 8',
        president: 'Macaroni 8',
        capital: 'Paris 8',
        nationalLanguage: 'French',
        population: 12123,
    },
    {
        id: '9',
        name: 'France 9',
        president: 'Macaroni 9',
        capital: 'Paris 9',
        nationalLanguage: 'French',
        population: 12123,
    },
    {
        id: '10',
        name: 'France 10',
        president: 'Macaroni 10',
        capital: 'Paris',
        nationalLanguage: 'French',
        population: 12123,
    },
    {
        id: '11',
        name: 'France 11',
        president: 'Macaroni 11',
        capital: 'Paris 11',
        nationalLanguage: 'French',
        population: 12123,
    },
];

const columns: Array<TableColumn<Country>> = [
    {
        label: 'Name',
        key: 'name',
        sortable: true,
        searchable: true,
    },
    {
        label: 'Capital',
        key: 'capital',
        sortable: true,
        searchable: true,
    },
    {
        label: 'President',
        key: 'president',
        sortable: true,
        searchable: true,
    },
    {
        label: 'National Language',
        key: 'nationalLanguage',
        sortable: true,
        searchable: true,
    },
    {
        label: 'Population',
        key: 'population',
        sortable: true,
        searchable: false,
    },
];

describe('Table', () => {
    it('renders all rows', () => {
        render(
            <Table<Country>
                columns={columns}
                result={{ items: countries.slice(0, 5), totalPages: 3 }}
                loading={false}
                defaultItemsInPage={5}
                itemsInPageOptions={[5, 10, 20]}
                keyExtractor={(country) => country.id}
                onRefetch={() => {
                    // pass
                }}
            />,
        );
        expect(document.querySelectorAll('tr')).toHaveLength(6);
    });
});

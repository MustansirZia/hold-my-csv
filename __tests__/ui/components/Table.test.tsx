/**
 * @jest-environment jsdom
 */

import { render, fireEvent } from '@testing-library/react';
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

const itemsInPage = 5;

describe('Table', () => {
    const setup = (onRefetch = jest.fn()) =>
        render(
            <Table<Country>
                columns={columns}
                result={{ items: countries.slice(0, itemsInPage), totalPages: 3 }}
                loading={false}
                defaultItemsInPage={itemsInPage}
                itemsInPageOptions={[itemsInPage, itemsInPage * 2, itemsInPage * 4]}
                keyExtractor={(country) => country.id}
                onRefetch={onRefetch}
            />,
        );

    it('Renders all rows and columns', () => {
        setup();

        expect(document.querySelectorAll('th')).toHaveLength(columns.length);
        // +1 for the head.
        expect(document.querySelectorAll('tr')).toHaveLength(itemsInPage + 1);
        expect(document.querySelectorAll('td')).toHaveLength(itemsInPage * columns.length);

        const cells = document.querySelectorAll('td');

        // Checking each cell.
        for (const index in countries.slice(0, itemsInPage)) {
            const { name, president, capital, nationalLanguage, population } = countries[index];
            // Checking if the value is rendered correctly and at the correct place.
            expect(cells[+index * itemsInPage]).toHaveTextContent(name);
            expect(cells[+index * itemsInPage + 1]).toHaveTextContent(capital);
            expect(cells[+index * itemsInPage + 2]).toHaveTextContent(president);
            expect(cells[+index * itemsInPage + 3]).toHaveTextContent(nationalLanguage);
            expect(cells[+index * itemsInPage + 4]).toHaveTextContent(population.toString());
        }
    });

    it('Renders search controls properly', () => {
        const { queryAllByLabelText } = setup();
        // +1 for the global search.
        expect(queryAllByLabelText('search')).toHaveLength(columns.filter((column) => column.searchable).length + 1);
    });

    it('Renders sort controls properly', () => {
        const { queryAllByLabelText } = setup();
        expect(queryAllByLabelText('caret-up')).toHaveLength(columns.filter((column) => column.sortable).length);
        expect(queryAllByLabelText('caret-down')).toHaveLength(columns.filter((column) => column.sortable).length);
    });

    it('Works with global search', () => {
        const placeholderText = 'Search across table';
        const searchString = 'UK';
        const onRefetch = jest.fn();
        const { queryByPlaceholderText, getByPlaceholderText } = setup(onRefetch);
        expect(queryByPlaceholderText(placeholderText)).toBeInTheDocument();
        fireEvent.change(getByPlaceholderText(placeholderText), { target: { value: searchString } });
        // Waiting for debounce to end.
        jest.runAllTimers();
        expect(onRefetch).toHaveBeenCalledTimes(1);
        expect(onRefetch).toHaveBeenCalledWith({ itemsInPage, currentPage: 0, searchString, filters: [] });
    });

    it('Works with sorting', () => {
        const onRefetch = jest.fn();
        setup(onRefetch);
        const heads = document.querySelectorAll('th');
        // Sort ascending for 2nd column.
        fireEvent.click(heads[1]);
        // Now sort descending for 3rd column.
        fireEvent.click(heads[2]);
        fireEvent.click(heads[2]);
        // Waiting for debounce to end.
        jest.runAllTimers();
        expect(onRefetch).toHaveBeenCalledTimes(1);
        expect(onRefetch).toHaveBeenCalledWith({
            itemsInPage,
            currentPage: 0,
            searchString: '',
            sortedVia: 'president',
            sortOrder: 'desc',
            filters: [],
        });
    });

    it('Works with column search', async () => {
        const itemsInPage = 5;
        const onRefetch = jest.fn();
        const { getAllByLabelText, getByPlaceholderText, getByText, getAllByText } = setup(onRefetch);
        const searchIcons = getAllByLabelText('search');
        // Search using 2nd column.
        fireEvent.click(searchIcons[2]);
        fireEvent.change(getByPlaceholderText('Search for Capital'), { target: { value: 'London' } });
        fireEvent.click(getByText('Search'));
        // Search using 3rd column as well.
        fireEvent.click(searchIcons[3]);
        fireEvent.change(getByPlaceholderText('Search for President'), { target: { value: 'Boris' } });
        fireEvent.click(getAllByText('Search')[1]);
        // Search using 3rd column as well but cancel midway.
        fireEvent.click(searchIcons[4]);
        fireEvent.change(getByPlaceholderText('Search for National Language'), { target: { value: 'English' } });
        fireEvent.click(getAllByText('Reset')[2]);
        // Waiting for debounce to end.
        jest.runAllTimers();
        expect(onRefetch).toHaveBeenCalledTimes(1);
        expect(onRefetch).toHaveBeenCalledWith({
            itemsInPage,
            currentPage: 0,
            searchString: '',
            filters: [
                {
                    name: 'capital',
                    searchString: 'London',
                },
                {
                    name: 'president',
                    searchString: 'Boris',
                },
            ],
        });
    });
});

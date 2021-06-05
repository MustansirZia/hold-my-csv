/* eslint-disable react/display-name */
import { memo, ReactElement, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Input, Table as AntTable, Button, Space, TablePaginationConfig } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import { Data, FetchRequest, FetchRequestFilter, FetchResult, SortOrder } from '../../domains/repository/types';
import { ColumnsType, FilterValue, SorterResult } from 'antd/lib/table/interface';
import useDebouce from '../../domains/utils/useDebounce';

type TableColumn<T extends Data> = {
    key: keyof T;
    label: string;
    sortable: boolean;
    searchable: boolean;
};

type TableProps<T extends Data> = {
    columns: Array<TableColumn<T>>;
    result: FetchResult<T>;
    defaultItemsInPage: number;
    itemsInPageOptions: Array<number>;
    loading: boolean;
    keyExtractor: (item: T) => string;
    onRefetch: (request: FetchRequest<T>) => void;
};

const Table = <T extends Data>({
    columns,
    result,
    loading,
    defaultItemsInPage,
    itemsInPageOptions,
    keyExtractor,
    onRefetch,
}: TableProps<T>): ReactElement => {
    const [itemsInPage, setItemsInPage] = useState(defaultItemsInPage);
    const [currentPage, setCurrentPage] = useState(0);
    const [filters, setFilters] = useState<Array<FetchRequestFilter<T>>>([]);
    const [globalSearchString, setGlobalSearchString] = useState('');
    const [sortedVia, setSortedVia] = useState<keyof T>();
    const [sortOrder, setSortOrder] = useState<SortOrder>();
    const searchInput = useRef<Input | null>();

    const onRefetch_ = useDebouce((request: FetchRequest<T>) => onRefetch(request), 300);

    useEffect(() => {
        onRefetch_({
            itemsInPage: itemsInPage,
            currentPage: currentPage,
            filters,
            sortedVia,
            sortOrder,
            searchString: globalSearchString.trim(),
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [itemsInPage, currentPage, filters, sortedVia, sortOrder, globalSearchString]);

    const handleTableChange = useCallback(
        (
            pagination: TablePaginationConfig,
            _: Record<string, FilterValue | null>,
            sorter: SorterResult<T> | Array<SorterResult<T>>,
        ) => {
            setCurrentPage((pagination.current as number) - 1);
            if (!(sorter instanceof Array) && sorter.column) {
                setSortedVia(sorter.field as keyof T);
                setSortOrder(sorter.order === 'descend' ? 'desc' : 'asc');
            } else {
                setSortedVia(undefined);
                setSortOrder(undefined);
            }
        },
        [],
    );

    const handleFilterChange = useCallback(
        (key: keyof T, value: string) => {
            setFilters([...filters.filter((filter) => filter.name !== key), { name: key, searchString: value.trim() }]);
        },
        [filters],
    );

    const handleFilterReset = useCallback(
        (key: keyof T) => setFilters(filters.filter((filter) => filter.name !== key)),
        [filters],
    );

    const getColumnSearchProps = useCallback(
        (key: keyof T, name: string) => ({
            filterDropdown: ({
                selectedKeys,
                setSelectedKeys,
                clearFilters,
            }: {
                setSelectedKeys: (values: Array<string>) => void;
                selectedKeys: Array<string>;
                clearFilters: () => void;
            }) => (
                <div style={{ padding: 8 }}>
                    <Input
                        ref={(ref) => {
                            searchInput.current = ref;
                        }}
                        placeholder={`Search for ${name}`}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleFilterChange(key, selectedKeys[0])}
                        style={{ marginBottom: 8, display: 'block' }}
                    />
                    <Space>
                        <Button
                            type="primary"
                            onClick={() => {
                                handleFilterChange(key, selectedKeys[0]);
                            }}
                            icon={<SearchOutlined />}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Search
                        </Button>
                        <Button
                            onClick={() => {
                                handleFilterReset(key);
                                clearFilters();
                            }}
                            size="small"
                            style={{ width: 90 }}
                        >
                            Reset
                        </Button>
                    </Space>
                </div>
            ),
            filterIcon: (filtered: boolean) => (
                <SearchOutlined
                    style={{ color: filtered || filters.some((filter) => filter.name === key) ? '#1890ff' : undefined }}
                />
            ),
            onFilterDropdownVisibleChange: (visible: boolean) => {
                if (visible) {
                    setTimeout(() => searchInput.current?.select(), 100);
                }
            },
            render: (text: string | number) =>
                filters.some((filter) => filter.name === key) || !!globalSearchString.trim() ? (
                    <Highlighter
                        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
                        searchWords={[...filters.map((filter) => filter.searchString), globalSearchString.trim()]}
                        autoEscape
                        textToHighlight={text.toString()}
                    />
                ) : (
                    text
                ),
        }),
        [filters, handleFilterChange, handleFilterReset, globalSearchString],
    );

    const columnsForTable = useMemo(
        () =>
            columns.map((column) => ({
                title: column.label,
                dataIndex: column.key,
                sorter: column.sortable,
                width: '20%',
                ...(column.searchable ? getColumnSearchProps(column.key, column.label) : {}),
            })) as ColumnsType<T>,
        [columns, getColumnSearchProps],
    );
    return (
        <div>
            <SearchOutlined />
            <Input
                ref={(ref) => {
                    searchInput.current = ref;
                }}
                placeholder={'Search across table'}
                value={globalSearchString}
                onChange={(e) => setGlobalSearchString(e.target.value)}
                style={{ marginBottom: 12, width: 200, marginLeft: 8 }}
            />
            <AntTable<T>
                columns={columnsForTable}
                rowKey={keyExtractor}
                dataSource={result.items}
                pagination={{
                    current: currentPage + 1,
                    total: result.totalPages * itemsInPage,
                    pageSize: itemsInPage,
                    showSizeChanger: true,
                    onShowSizeChange: (_, size) => setItemsInPage(size),
                    pageSizeOptions: itemsInPageOptions.map((option) => `${option}`),
                }}
                loading={loading}
                onChange={handleTableChange}
            />
        </div>
    );
};

export default memo(Table) as typeof Table;

export type { TableColumn };

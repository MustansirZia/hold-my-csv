import { FC, useCallback, useMemo, useState } from 'react';
import { Button, Upload, message, Typography } from 'antd';
import { DeleteFilled, DownloadOutlined, UploadOutlined } from '@ant-design/icons';
import Breadcrumbs from '../src/ui/components/Breadcrumbs';
import Footer from '../src/ui/components/Footer';
import Layout from '../src/ui/components/Layout';
import RepositoryProvider from '../src/domains/repository/RepositoryProvider';
import { Country, FetchRequest, FetchResult } from '../src/domains/repository/types';
import Table, { TableColumn } from '../src/ui/components/Table';
import Head from '../src/ui/components/Head';
import { UploadChangeParam } from 'antd/lib/upload/interface';

const { Title } = Typography;

const INITIAL_DATA = { items: [], totalPages: 0 };

const App: FC = () => {
    const [response, setResponse] = useState<FetchResult<Country>>({ ...INITIAL_DATA });
    const [loading, setLoading] = useState(false);

    const columns: Array<TableColumn<Country>> = useMemo(
        () => [
            {
                label: 'Name',
                key: 'name',
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
        ],
        [],
    );

    const uploadProps = {
        name: 'file',
        action: '/api/countries/upload',
        accept: '.csv',
        async onChange(info: UploadChangeParam) {
            if (info.file.status === 'done') {
                await message.success(`${info.file.name} file uploaded successfully`, 2);
                window.location.reload();
            } else if (info.file.status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
    };

    const onRefetch = useCallback(async (request: FetchRequest<Country>) => {
        setLoading(true);
        try {
            const response = await RepositoryProvider.provide().fetchData(request);
            setResponse(response);
        } catch (err) {
            message.error(`Failed to query data. More info - ${err}`);
        } finally {
            setLoading(false);
        }
    }, []);

    const onReset = useCallback(async () => {
        setLoading(true);
        try {
            await RepositoryProvider.provide().resetData();
            setResponse({ ...INITIAL_DATA });
            message.success('Successfully nuked all data.');
        } catch (err) {
            message.error(`Failed to reset data. More info - ${err}`);
        } finally {
            setLoading(false);
        }
    }, []);

    return (
        <>
            <Head title="Hold My CSV" description="CSV parsing and table operations." />
            <Layout>
                <Breadcrumbs />
                <Title level={3}>Countries. (Bulk Upload via CSV)</Title>
                <Button onClick={onReset} style={{ marginBottom: 10 }} icon={<DeleteFilled />}>
                    Nuke Data
                </Button>
                <Button style={{ marginBottom: 10, marginLeft: 10 }} icon={<DownloadOutlined />}>
                    <a href="/api/countries/upload" style={{ marginLeft: 10 }}>
                        Download CSV Format
                    </a>
                </Button>
                <Upload {...uploadProps}>
                    <Button icon={<UploadOutlined />} style={{ marginBottom: 10, marginLeft: 10 }}>
                        Click to Upload Data
                    </Button>
                </Upload>

                <Table<Country>
                    columns={columns}
                    keyExtractor={(country) => country.id}
                    result={response}
                    defaultItemsInPage={10}
                    itemsInPageOptions={[10, 20, 30, 50, 100]}
                    loading={loading}
                    onRefetch={onRefetch}
                />
                <Footer>Hold My CSV @2021 Mustansir Zia 😎</Footer>
            </Layout>
        </>
    );
};

export default App;

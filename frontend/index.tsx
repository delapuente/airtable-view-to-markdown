import Field from '@airtable/blocks/dist/types/src/models/field';
import Record from '@airtable/blocks/dist/types/src/models/record';
import Table from '@airtable/blocks/dist/types/src/models/table';
import View from '@airtable/blocks/dist/types/src/models/view';
import ViewMetadataQueryResult from '@airtable/blocks/dist/types/src/models/view_metadata_query_result';
import {initializeBlock, useBase, useViewMetadata, useRecords, useGlobalConfig, useCursor, ViewPicker} from '@airtable/blocks/ui';
import {TablePicker} from "@airtable/blocks/ui";
import React from 'react';

function ViewToMDConverter() {
    const cursor = useCursor();
    const globalConfig = useGlobalConfig();
    const base = useBase();

    const isEnabled =
        globalConfig.hasPermissionToSet('tableId') &&
        globalConfig.hasPermissionToSet('viewId');

    const tableId =
        globalConfig.get('tableId') as string | undefined ??
        cursor.activeTableId!;
    const table = base.getTableById(tableId);

    const viewId =
        globalConfig.get('viewId') as string | undefined ??
        cursor.activeViewId!;
    const view =
        table.views.find(view => view.id === viewId) ??
        table.views[0];

    const setTable =
        (table: Table) => globalConfig.setAsync('tableId', table.id);

    const setView =
        (view: View) => globalConfig.setAsync('viewId', view.id);

    const viewMetadata = useViewMetadata(view);
    const records = useRecords(view);
    const mdRepresentation = convertToMD(viewMetadata, records);
    return (
        <section>
            <TablePicker
                disabled={!isEnabled}
                table={table}
                onChange={newTable => setTable(newTable)}
            />
            <ViewPicker
                disabled={!isEnabled}
                table={table}
                view={view}
                onChange={newView => setView(newView)}
            />
            <pre>{mdRepresentation}</pre>
        </section>
    );
}

function convertToMD(
    viewMetadata: ViewMetadataQueryResult,
    records: Record[]
): string {
    const {visibleFields} = viewMetadata;
    const fieldIds = visibleFields.map(header => header.id);
    const header = buildHeader(visibleFields);
    const rows = buildRows(records, fieldIds);
    return `${header}\n${rows}`;
}

function buildHeader(headerFields: Field[]): string {
    const names = headerFields.map(header => header.name);
    const lengths = names.map(name => name.length);
    const separators = lengths.map(length => '-'.repeat(length));
    return `| ${names.join(' | ')} |\n| ${separators.join(' | ')} |`;
}

function buildRows(
    records: Record[],
    fieldIds: string[]
): string {
    const rows = records.map(record => buildOneRow(record, fieldIds));
    return rows.join('\n');
}

function buildOneRow(record: Record, fieldIds: string[]): string {
    const values = fieldIds.map(
        fieldId => record.getCellValueAsString(fieldId)
    );
    return `| ${values.join(' | ')} |`;
}

initializeBlock(() => <ViewToMDConverter />);

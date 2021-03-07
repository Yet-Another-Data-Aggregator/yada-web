import { GridColDef, DataGrid } from '@material-ui/data-grid';
import { ToggleSwitch } from 'components/ToggleSwitch';
import { ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Label } from 'reactstrap';
import { addLoggerToEquipment } from 'scripts/Implementation';
import { LoggerCollection, LoggerObject } from 'store/FirestoreInterfaces';
import { RootState } from 'store/rootReducer';

export interface LoggerTabProps {
    logger: LoggerObject;
}

export function LoggerTab({ logger }: LoggerTabProps): ReactElement {
    const columns: GridColDef[] = [
        { field: 'timestamp', headerName: 'timestamp', flex: 1 },
    ];

    let rows: any[] = [];

    logger.data.forEach((dataPoint, index) => {
        rows.push({
            id: index,
            timestamp: dataPoint.timestamp,
        });
    });

    return (
        <div className="loggerTab">
            <h1>Logger Data</h1>
            <LoggerInfo logger={logger} />
            <DataGrid className="dataGrid" rows={rows} columns={columns} />
        </div>
    );
}

export interface LoggerSelectorProps {
    //ID of the site the equipment is a part of
    siteId: string;

    // The name of the equipment
    unitName: string;
}

export function LoggerSelector({ siteId, unitName }: LoggerSelectorProps) {
    const loggers: LoggerCollection = useSelector(
        (state: RootState) => state.loggers
    );

    var loggerCard: any = [];

    for (const [id, loggerData] of Object.entries(loggers)) {
        const data = loggerData as LoggerObject;

        //check that the logger does not have an equipment specified
        if (!data.equipment) {
            loggerCard.push(
                <div
                    className="loggerCard"
                    onClick={() => handleLoggerCardClick(id)}
                >
                    <h2>{data.name || '<logger.name>'}</h2>
                    {id}
                </div>
            );
        }
    }

    function handleLoggerCardClick(logger_id: string) {
        addLoggerToEquipment(siteId, unitName, logger_id);
    }

    return (
        <div className="loggerSelector">
            <h1>Select Logger</h1>

            {loggerCard}
        </div>
    );
}

export interface LoggerInfoProps {
    logger: LoggerObject;
}

export function LoggerInfo({ logger }: LoggerInfoProps) {
    return (
        <div className="loggerInfo">
            <div>
                <LoggerInfoItem
                    label="Status"
                    value={logger.status ? 'active' : 'inactive'}
                />
                <LoggerInfoItem label="IP" value={logger.ip || '<unknown>'} />
                <LoggerInfoItem label="MAC" value={logger.mac || '<unknown>'} />
                <LoggerInfoItem label="Notes" value={logger.notes} />
            </div>
            <div className="loggerControls">
                <div className="loggerControl">
                    <h2>Collecting Data</h2>
                    <ToggleSwitch enabledDefault={false} />
                </div>
            </div>
        </div>
    );
}

export interface LoggerInfoItemProps {
    label: string;
    value: string;
}

export function LoggerInfoItem({ label, value }: LoggerInfoItemProps) {
    return (
        <div className="loggerInfoItem">
            <h2>{label}</h2>
            <div className="loggerInfoValue">{value}</div>
        </div>
    );
}

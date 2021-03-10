/**
 * Dashboard component
 * author: Shaun Jorstad
 *
 * route: '/app/sites'
 * purpose: page that will provide access to manage sites
 */

import { createNewEquipment, createNewSite } from '../../scripts/Datastore';
import React, { ReactElement, useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { SiteObject } from 'store/FirestoreInterfaces';
import { RootState } from 'store/rootReducer';
import DynamicNavbar, { DynamicNavLink } from '../DynamicNavbar';
import SiteEquipment from './SiteEquipment';
import TabView, { TabViewItem } from '../TabView';
import { DataGrid, GridColDef, GridToolbar } from '@material-ui/data-grid';
import Button, { ButtonType } from 'components/Button';
import SiteFaultsTab from './SiteFaultsTab';

export default function Sites() {
    const sites = useSelector((state: RootState) => state.sites);
    let navLinks: any = [];

    for (const [id, siteData] of Object.entries(sites)) {
        const data = siteData as SiteObject;
        navLinks.push(
            <DynamicNavLink route={id} key={id} name={data.name}>
                <SiteContent site={sites[id]} />
            </DynamicNavLink>
        );
    }

    return (
        <Switch>
            <Route path={'/app/sites/:siteId/equipment'}>
                <SiteEquipment />
            </Route>
            <Route path={'/app/sites'}>
                <DynamicNavbar title={'Sites'} buttonAction={createNewSite}>
                    {navLinks}
                    <DynamicNavLink
                        route={''}
                        key={'default'}
                        name={'default route'}
                        blockLinkRender={true}
                    >
                        <div className={'message'}>Please select a site</div>
                    </DynamicNavLink>
                </DynamicNavbar>
            </Route>
        </Switch>
    );
}

interface SiteContentProps {
    site: SiteObject;
}

function SiteContent({ site }: SiteContentProps): ReactElement {
    return (
        <div className={'sites'}>
            <h1>{site.name}</h1>
            <TabView>
                <TabViewItem label={'Equipment'} exact default>
                    <EquipmentTab />
                </TabViewItem>
                <TabViewItem label={'Faults'} route={'faults'}>
                    <SiteFaultsTab site={site} />
                </TabViewItem>
                <TabViewItem label={'Config'} route={'config'}>
                    <ConfigTab />
                </TabViewItem>
            </TabView>
        </div>
    );
}

function EquipmentTab(): ReactElement {
    const [filter, updateFilter] = useState('');
    const location = useLocation();
    const siteID = location.pathname.split('/')[3];
    const sites = useSelector((state: RootState) => state.sites);
    const [redirect, changeRedirect] = useState('');

    function filterSearch(unit: any) {
        return unit.name.includes(filter);
    }

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'name', flex: 1 },
        { field: 'health', headerName: 'health', flex: 1 },
        { field: 'type', headerName: 'type', flex: 1 },
    ];

    let rows: any[] = [];

    // creates rows
    sites[siteID]['equipmentUnits']
        .filter((unit) => filterSearch(unit))
        .forEach((unit) => {
            rows.push({
                name: unit.name,
                health: unit.health,
                type: unit.type,
                id: unit.name,
            });
        });

    function handleRowClick(row: any) {
        // alert(`navigating to ${row.row.name} unit`);
        let equipmentName = row.row.name.replace(' ', '-');
        changeRedirect(`/app/sites/${siteID}/equipment/${equipmentName}`);
    }

    function handleNewEquipmentClick() {
        let baseName = 'New Equipment ';
        let nameNum = 0;

        while (
            sites[siteID]['equipmentUnits'].find(
                (element) => element.name === baseName + String(nameNum)
            ) !== undefined
        ) {
            nameNum++;
        }

        createNewEquipment(siteID, baseName + String(nameNum));
    }

    if (redirect !== '') {
        return <Redirect to={redirect} />;
    }
    //TODO Make site equipment tab
    return (
        <div className="table">
            <div className="tableControls">
                <input
                    className="input"
                    type={'text'}
                    value={filter}
                    placeholder={'filter'}
                    onChange={(event) => {
                        updateFilter(event.target.value);
                    }}
                />
                <Button
                    type={ButtonType.tableControl}
                    text={'create equipment'}
                    onClick={() => {
                        handleNewEquipmentClick();
                    }}
                />
            </div>
            <div className="dataGrid">
                <DataGrid
                    rows={rows}
                    columns={columns}
                    onRowClick={(row) => handleRowClick(row)}
                    // pageSize={5}
                    components={{
                        Toolbar: GridToolbar,
                    }}
                    // autoHeight={true}
                />
            </div>
        </div>
    );
}

function ConfigTab(): ReactElement {
    //TODO: Make site config tab
    return <h1>Config</h1>;
}

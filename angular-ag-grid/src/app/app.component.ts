import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridNg2 } from 'ag-grid-angular';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    @ViewChild('agGrid') agGrid: AgGridNg2;

    title = 'app';

    columnDefs = [
        {headerName: 'Make', field: 'make', rowGroup: true },
        {headerName: 'Price', field: 'price'}
    ];

    autoGroupColumnDef = {
        headerName: 'Model',
        field: 'model',
        cellRenderer: 'agGroupCellRenderer',
        cellRendererParams: {
            checkbox: true
        }
    };

    rowData: any;
    rowModelType: string;
    cacheBlockSize: any;
    maxBlocksInCache: any;

    constructor(private http: HttpClient) {

        this.rowModelType = "serverSide";
        this.cacheBlockSize = 100;
        this.maxBlocksInCache = 100;

    }

    ngOnInit() {

        this.rowData = this.http.get('https://api.myjson.com/bins/ly7d1');

        // register Server-side Datasource with the grid
        var server = getServer();
        var datasource = new ServerSideDatasource(server);
        gridOptions.api.setServerSideDatasource(datasource);

    }

    getSelectedRows() {
        const selectedNodes = this.agGrid.api.getSelectedNodes();
        const selectedData = selectedNodes.map( node => node.data );
        const selectedDataStringPresentation = selectedData.map( node => node.make + ' ' + node.model).join(', ');
        alert(`Selected nodes: ${selectedDataStringPresentation}`);
    }

    // create ServerSideDatasource with a reference to your server
    ServerSideDatasource(server) {
        this.server = server;
    }

    ServerSideDatasource.prototype.getRows = function(params) {
        // invoke your server with request params supplied by grid
        var response = server.getResponse(params.request);

        if (response.success) {
            // call the success callback
            params.successCallback(response.rows, response.lastRow);
        } else {
            // inform the grid the request failed
            params.failCallback();
        }
    };

}
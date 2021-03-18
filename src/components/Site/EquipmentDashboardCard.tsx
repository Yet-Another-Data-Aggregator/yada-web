import React, { ReactElement } from "react";
import { ResponsiveLine } from "@nivo/line";

export interface EquipmentDashboardCardProps{
  channel: string,
  graphData: any[]
}

export default function DashboardCard({ channel, graphData }: EquipmentDashboardCardProps): ReactElement {

  return (
    <div className="card">
      <h1>{channel}</h1>
      <div className="responsiveLine">
        <ResponsiveLine
          data={graphData}
          margin={{ top: 50, right: 150, bottom: 50, left: 60 }}
          xScale={{ type: 'time', format: '%m-%d-%g-%H:%M:%S', useUTC: false, precision: 'second' }}
          yScale={{ type: 'linear', min: 'auto', max: 'auto', reverse: false }}
          axisTop={null}
          axisRight={null}
          axisBottom={{
              format: '%H:M',
              tickValues: 'every 2 minutes',
              legend: 'time',
              // orient: 'bottom',
              // tickSize: 5,
              // tickPadding: 5,
              // tickRotation: 0,
              // legend: 'timestamp',
              // legendOffset: 36,
              // legendPosition: 'middle'
          }}
          axisLeft={{
              orient: 'left',
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: channel,
              legendOffset: -40,
              legendPosition: 'middle'
          }}
          pointSize={10}
          pointColor={{ theme: 'background' }}
          pointBorderWidth={2}
          pointBorderColor={{ from: 'serieColor' }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: 'bottom-right',
              direction: 'column',
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: 'left-to-right',
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: 'circle',
              symbolBorderColor: 'rgba(0, 0, 0, .5)',
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemBackground: 'rgba(0, 0, 0, .03)',
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
        />
      </div>
    </div>
  );
}
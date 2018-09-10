import { ICalendarData, IMeeting } from "./types/CalendarData";
import * as React from "react";
import logo from "./logo.svg";
import "./App.css";

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Testar lite bös</h1>
        </header>
        Serier
        <ul>
          {this.getSeries().map((item, index) => (
            <li key={"ser-" + index}>
              {item.id} - {item.name}
            </li>
          ))}
        </ul>
        Avvikelser
        <ul>
          {this.getDevSeries("cff6428a-6895-4905-8f51-83d4f8593ac5").map(
            (item, index) => (
              <li key={"dev-" + index}>
                {item.id} - {item.name}
              </li>
            )
          )}
        </ul>
      </div>
    );
  }

  private getSeries(): IMeeting[] {
    const data = this.getData();
    return data.meetings.filter(item => item.series !== undefined);
  }

  private getSingleMeetings(): IMeeting[] {
    const data = this.getData();
    return data.meetings.filter(item => item.series === undefined);
  }

  private getDevSeries(seriesId: string): IMeeting[] {
    const data = this.getData();
    const series = data.meetings.filter(
      meeting => meeting.series !== undefined
    );

    var myDevs: IMeeting[] = [];

    series.forEach(meeting => {
      const d = data.deviations.filter(
        dev =>
          meeting.series !== undefined &&
          dev.devFrom !== undefined &&
          dev.devFrom === meeting.series.id
      );
      myDevs = d.map(item => {
        const i = Object.assign({}, meeting, item);
        console.log("meeting", meeting);
        console.log("item", item);
        console.log("i", i);
        return i;
      });
    });

    console.log("myDevs", myDevs);

    return myDevs;
  }

  private getData(): ICalendarData {
    return {
      meetings: [
        {
          id: "7c335289-7aef-447b-9994-e9daaf309688",
          series: {
            id: "cff6428a-6895-4905-8f51-83d4f8593ac5",
            lastDate: new Date("2018-10-30"),
            frequency: 7
          },
          from: new Date("2018-10-01 14:00"),
          to: new Date("2018-10-01 15:00"),
          name: "Weekly",
          attendees: [
            "fbce1503-b913-433e-95d0-8157ef25b032",
            "c087b738-908b-4ec5-bed7-683fd2e87207"
          ]
        },
        {
          id: "364a4185-59a2-4afb-ac20-6a42476a88f0",
          series: undefined,
          from: new Date("2018-10-04 09:00"),
          to: new Date("2018-10-04 11:00"),
          name: "A meeting",
          attendees: ["fbce1503-b913-433e-95d0-8157ef25b032"]
        }
      ],
      deviations: [
        {
          id: "fb721dce-d298-485e-87c0-dd432cf50882",
          from: new Date("2018-10-15 16:00"),
          to: new Date("2018-10-15 17:00"),
          devFrom: "cff6428a-6895-4905-8f51-83d4f8593ac5"
        }
      ]
    };
  }
}

export default App;
